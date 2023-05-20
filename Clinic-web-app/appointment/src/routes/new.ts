import { body } from "express-validator";
import { NotFoundError, requireAuth, validateRequest } from "@clinicare/common";
import express, { Request, Response } from "express";
import { Appointment } from "../models/appointment";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";

const router = express.Router();

router.post(
  "/api/appointment",
  requireAuth,
  [
    body("date").not().isEmpty().withMessage("Please provide date and time"),
    body("patientId").not().isEmpty().withMessage("Please provide a patient"),
    body("doctorId").not().isEmpty().withMessage("Please provide a doctor"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { date, patientId, doctorId } = req.body;

    const patient = Patient.findById(patientId);
    const doctor = Doctor.findById(doctorId);
    if (!patient || !doctor) {
      throw new NotFoundError();
    }

    const appointment = Appointment.build({
      date,
      patient: patientId,
      doctor: doctorId,
      userId: req.currentUser!.id,
    });
    await appointment.save();
    res.status(201).send(appointment);
  }
);

export { router as createAppointmentRouter };
