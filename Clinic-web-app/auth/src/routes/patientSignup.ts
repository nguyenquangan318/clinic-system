import { validateRequest, BadRequestError } from "@clinicare/common";
import express from "express";
import { body } from "express-validator";
import { Patient } from "../models/patient";

const router = express.Router();

router.post(
  "/api/user/patientSignup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
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
  async (req: express.Request, res: express.Response) => {
    const { email, password, name, age, address, phone } = req.body;

    const existingEmail = await Patient.findOne({ email });
    const existingPhone = await Patient.findOne({ phone });

    if (existingEmail) {
      // console.log("email in use");
      throw new BadRequestError("Email already in use");
    }
    if (existingPhone) {
      // console.log("email in use");
      throw new BadRequestError("Phone number already in use");
    }

    const patient = Patient.build({
      email,
      password,
      name,
      age,
      address,
      phone,
    });
    await patient.save();

    res.status(201).send(patient);
  }
);
export { router as patientSignupRouter };
