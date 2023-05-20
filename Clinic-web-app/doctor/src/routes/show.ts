import { NotFoundError } from "@clinicare/common";
import express, { Request, Response } from "express";
import { Doctor } from "../models/doctor";

const router = express.Router();

router.get("/api/doctor/:id", async (req: Request, res: Response) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    throw new NotFoundError();
  }
  res.send(doctor);
});

export { router as showDoctorRouter };
