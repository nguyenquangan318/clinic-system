import express, { Request, Response } from "express";
import { Appointment } from "../models/appointment";
import { requireAuth, NotFoundError } from "@clinicare/common";

const router = express.Router();

router.delete(
  "/api/appointment/:appointmentId",
  requireAuth,
  async (req: Request, res: Response) => {
    const appointment = await Appointment.findOne({
      _id: req.params.appointmentId,
    });
    if (!appointment) {
      throw new NotFoundError();
    }
    Appointment.deleteOne({ _id: req.params.appointmentId }).then(() => {
      res.status(200).json({ message: "Remove appointment success" });
    });
  }
);

export { router as deleteAppointmentRouter };
