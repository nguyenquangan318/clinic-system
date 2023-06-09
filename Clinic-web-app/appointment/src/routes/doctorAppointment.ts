import express, { Request, Response } from "express";
import { Appointment } from "../models/appointment";
import { requireAuth } from "@clinicare/common";

const router = express.Router();

router.get(
  "/api/appointment/doctorAppointment",
  requireAuth,
  async (req: Request, res: Response) => {
    const totalAppointment = await Appointment.find({
      doctor: req.currentUser!.id,
    }).count();
    if (req.query.page && req.query.size) {
      try {
        const page = parseInt(req.query.page as string);
        const pageSize = parseInt(req.query.size as string);
        const skippedAmount = (page - 1) * pageSize;
        const appointment = await Appointment.find({
          doctor: req.currentUser!.id,
        })
          .sort({ date: -1 })
          .populate("doctor")
          .populate("patient")
          .skip(skippedAmount)
          .limit(pageSize);
        res.status(200).json({ appointment, total: totalAppointment });
      } catch (error) {
        res.status(500).json({ message: "server error", error });
      }
    } else {
      const appointment = await Appointment.find({
        doctor: req.currentUser!.id,
      })
        .sort({ date: -1 })
        .populate("doctor")
        .populate("patient");

      res.send({ appointment, total: totalAppointment });
    }
  }
);

export { router as doctorAppointmentRouter };
