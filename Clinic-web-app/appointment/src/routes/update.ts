import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, NotFoundError, requireAuth } from "@clinicare/common";
import { Appointment } from "../models/appointment";

const router = express.Router();

router.put(
  "/api/appointment/:id",
  requireAuth,
  [
    body("date").not().isEmpty().withMessage("Please provide date and time"),
    body("patientId").not().isEmpty().withMessage("Please provide a patient"),
    body("doctorId").not().isEmpty().withMessage("Please provide a doctor"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const appointment = await Appointment.findById(req.params.id);
    const { date, doctorId, patientId } = req.body;
    if (!appointment) {
      throw new NotFoundError();
    }
    appointment.set({
      date,
      patient: patientId,
      doctor: doctorId,
    });
    appointment.save();
    res.send(appointment);
  }
);

export { router as updateAppointmentRouter };
