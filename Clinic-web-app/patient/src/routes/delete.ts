import express, { Request, Response } from "express";
import { Patient } from "../models/patient";
import { requireAuth, NotFoundError } from "@clinicare/common";
import { PatientDeletedPublisher } from "../events/patient-deleted-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/patient/:patientId",
  requireAuth,
  async (req: Request, res: Response) => {
    const patient = await Patient.findOne({ _id: req.params.patientId });
    if (!patient){
        throw new NotFoundError();
    }
    Patient.deleteOne({ _id: req.params.patientId }).then(() => {
      res.status(200).json({ message: "Remove patient success" });
    });
    new PatientDeletedPublisher(natsWrapper.client).publish({
      id: patient.id,
    });
  }
);

export { router as deletePatientRouter };
