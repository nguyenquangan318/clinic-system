import { body } from "express-validator";
import multer from "multer";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
} from "@clinicare/common";
import express, { Request, Response } from "express";
import { Doctor } from "../models/doctor";
import { DoctorCreatedPublisher } from "../events/doctor-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import path from "path";
import fs from "fs";
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

router.post(
  "/api/doctor",
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
    // if (!req.file?.path) {
    //   throw new BadRequestError("Bad request");
    // }
    const { name, phone, department, avatar } = req.body;

    const existingPhone = await Doctor.findOne({ phone });
    if (existingPhone) {
      // console.log("email in use");
      throw new BadRequestError("Phone number already in use");
    }

    const doctor = Doctor.build({
      name,
      phone,
      department,
      avatar: {
        data: avatar.data,
        contentType: avatar.contenType,
      },
      userId: req.currentUser!.id,
    });
    await doctor.save();
    new DoctorCreatedPublisher(natsWrapper.client).publish({
      id: doctor.id,
      name: doctor.name,
      phone: doctor.phone,
      department: doctor.department,
      avatar: doctor.avatar,
      userId: doctor.userId,
      version: doctor.version,
    });
    res.status(201).send(doctor);
  }
);

export { router as createDoctorRouter };
