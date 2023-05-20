import { NotFoundError } from "@clinicare/common";
import express, { Request, Response } from "express";
import { Appointment } from "../models/appointment";

const router = express.Router();

router.get("/api/appointment/:id", async (req: Request, res: Response) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    throw new NotFoundError();
  }
  res.send(appointment);
});

export { router as showAppointmentRouter };
