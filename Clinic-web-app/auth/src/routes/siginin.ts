import jwt from "jsonwebtoken";
import { Password } from "./../services/password";
import { BadRequestError, validateRequest } from "@clinicare/common";
import express from "express";
import { body } from "express-validator";
import { User } from "../models/user";
const router = express.Router();

router.post(
  "/api/user/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("please provide password"),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    //gen jsonwebtoken
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        clinicName: existingUser.clinicName,
        address: existingUser.address,
        phone: existingUser.phone,
      },
      process.env.JWT_KEY!
    );

    //save jwt to session obj
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);
export { router as signinRouter };
