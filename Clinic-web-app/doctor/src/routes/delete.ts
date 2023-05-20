import express, { Request, Response } from "express";
import { Doctor } from "../models/doctor";
import { requireAuth, NotFoundError } from "@clinicare/common";
import { DoctorDeletedPublisher } from "../events/doctor-deleted-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/doctor/:doctorId",
  requireAuth,
  async (req: Request, res: Response) => {
    const doctor = await Doctor.findOne({ _id: req.params.doctorId });
    if (!doctor) {
      throw new NotFoundError();
    }
    Doctor.deleteOne({ _id: req.params.doctorId }).then(() => {
      res.status(200).json({ message: "Remove doctor success" });
    });
    new DoctorDeletedPublisher(natsWrapper.client).publish({
      id: doctor.id,
    });
  }
);

export { router as deleteDoctorRouter };
