import express, { Request, Response } from "express";
import { Patient } from "../models/patient";
import { requireAuth } from "@clinicare/common";

const router = express.Router();

router.get("/api/patient", requireAuth, async (req: Request, res: Response) => {
  const totalPatient = await Patient.find({
    userId: req.currentUser!.id,
  }).count();
  if (req.query.page && req.query.size) {
    try {
      const page = parseInt(req.query.page as string);
      const pageSize = parseInt(req.query.size as string);
      const skippedAmount = (page - 1) * pageSize;
      const listPagePatient = await Patient.find({
        userId: req.currentUser!.id,
      })
        .skip(skippedAmount)
        .limit(pageSize);
      res.status(200).json({ patient: listPagePatient, total: totalPatient });
    } catch (error) {
      res.status(500).json({ message: "server error", error });
    }
  } else {
    const patient = await Patient.find({ userId: req.currentUser!.id });

    res.send({ patient, total: totalPatient });
  }
});

export { router as indexPatientRouter };
