import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, NotFoundError, requireAuth } from "@clinicare/common";
import { Doctor } from "../models/doctor";
import { DoctorUpdatedPublisher } from "../events/doctor-updated-publisher";
import { natsWrapper } from "../nats-wrapper";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/avatar");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.includes("image")) return cb(null, true);

    cb(new Error("only accept image"));
  },
});

router.put(
  "/api/doctor/:id",
  requireAuth,
  upload.single("avatar"),
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("phone")
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("Please provide a valid phone number"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const doctor = await Doctor.findById(req.params.id);
    const { name, phone, department, avatar } = req.body;
    if (!doctor) {
      throw new NotFoundError();
    }
    doctor.set({
      name: name,
      phone: phone,
      department: department,
      avatar: {
        data: avatar.data,
        contentType: avatar.contenType,
      },
    });
    doctor.save();
    new DoctorUpdatedPublisher(natsWrapper.client).publish({
      id: doctor.id,
      name: doctor.name,
      phone: doctor.phone,
      department: doctor.department,
      avatar: doctor.avatar,
      version: doctor.version,
    });
    res.send(doctor);
  }
);

export { router as updateDoctorRouter };
