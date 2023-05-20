import { Password } from "./../services/password";
import { BadRequestError, validateRequest } from "@clinicare/common";
import express from "express";
import { body } from "express-validator";
import { Patient } from "../models/patient";
const router = express.Router();

router.post(
  "/api/user/patientSignin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("please provide password"),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    const existingPatient = await Patient.findOne({ email });
    if (!existingPatient) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await Password.compare(
      existingPatient.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    res.status(200).send(existingPatient);
  }
);
export { router as patientSigninRouter };
