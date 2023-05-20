import { NotFoundError } from "@clinicare/common";
import express, { Request, Response } from "express";
import { Patient } from "../models/patient";

const router = express.Router();

router.get("/api/patient/:id", async (req: Request, res: Response) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    throw new NotFoundError();
  }
  res.send(patient);
});

export { router as showPatientRouter };
