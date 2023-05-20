import express, { Request, Response } from "express";
import { Patient } from "../models/patient";
import { requireAuth } from "@clinicare/common";

const router = express.Router();

router.get(
  "/api/patient/search",
  requireAuth,
  async (req: Request, res: Response) => {
    const patient = await Patient.find({
      name: { $regex: req.query.name, $options: "i" },
      userId: req.currentUser!.id,
    });
    res.send({patient});
  }
);

export { router as searchPatientRouter };
