import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, NotFoundError, requireAuth } from "@clinicare/common";
import { Patient } from "../models/patient";
import { PatientUpdatedPublisher } from "../events/patient-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/patient/:id",
  requireAuth,
  [
    body("name").trim().not().isEmpty().withMessage("Please provide a name"),
    body("age")
      .trim()
      .isInt({ min: 0, max: 120 })
      .withMessage("age must be between 0 and 120"),
    body("address")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please provide an address"),
    body("phone")
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("Please provide a valid phone number"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const patient = await Patient.findById(req.params.id);
    const { email, name, age, address, phone } = req.body;
    if (!patient) {
      throw new NotFoundError();
    }
    patient.set({
      email: email,
      name: name,
      age: age,
      address: address,
      phone: phone,
    });
    patient.save();
    new PatientUpdatedPublisher(natsWrapper.client).publish({
      id: patient.id,
      email: patient.email,
      name: patient.name,
      age: patient.age,
      address: patient.address,
      phone: patient.phone,
      version: patient.version,
    });
    res.send(patient);
  }
);

export { router as updatePatientRouter };
