import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
} from "@clinicare/common";
import express, { Request, Response } from "express";
import { Patient } from "../models/patient";
import { PatientCreatedPublisher } from "../events/patient-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/patient",
  requireAuth,
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please provide a clinic name"),
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
    const { email, name, age, address, phone, id } = req.body;
    if (email != "None") {
      const existingEmail = await Patient.findOne({ email });
      if (existingEmail) {
        // console.log("email in use");
        throw new BadRequestError("Email already in use");
      }
    }
    const patient = Patient.build({
      email,
      name,
      age,
      address,
      phone,
      userId: req.currentUser!.id,
    });
    if (id) {
      patient._id = id;
    }
    await patient.save();
    new PatientCreatedPublisher(natsWrapper.client).publish({
      id: patient.id,
      email: patient.email,
      name: patient.name,
      age: patient.age,
      address: patient.address,
      phone: patient.phone,
      userId: patient.userId,
      version: patient.version,
    });
    res.status(201).send(patient);
  }
);

export { router as createPatientRouter };
