import { validateRequest, BadRequestError } from "@clinicare/common";
import express from "express";
import { body } from "express-validator";
import { User } from "../models/user";
// import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/user/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("clinicName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please provide a clinic name"),
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
    const { email, password, clinicName, address, phone, role, id } = req.body;

    const existingEmail = await User.findOne({ email });
    const existingClinicName = await User.findOne({ clinicName });
    const existingPhone = await User.findOne({ phone });

    if (existingEmail) {
      // console.log("email in use");
      throw new BadRequestError("Email already in use");
    }
    if (existingClinicName) {
      // console.log("email in use");
      throw new BadRequestError("Name already in use");
    }
    if (existingPhone) {
      // console.log("email in use");
      throw new BadRequestError("Phone number already in use");
    }

    if (id) {
      const user = User.build({
        email,
        password,
        clinicName,
        address,
        phone,
        role,
      });
      user._id = id;
      await user.save();
      res.status(201).send(user);
    } else {
      const user = User.build({
        email,
        password,
        clinicName,
        address,
        phone,
        role,
      });
      await user.save();
      res.status(201).send(user);
    }

    //gen jsonwebtoken
    // const userJwt = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //     clinicName: user.clinicName,
    //     address: user.address,
    //     phone: user.phone,
    //     role: user.role,
    //   },
    //   process.env.JWT_KEY!
    // );

    //save jwt to session obj
    // req.session = {
    //   jwt: userJwt,
    // };
  }
);
export { router as signupRouter };
