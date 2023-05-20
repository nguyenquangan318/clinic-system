import express, { Request, Response } from "express";
import { Doctor } from "../models/doctor";
import { requireAuth } from "@clinicare/common";

const router = express.Router();

router.get(
  "/api/doctor/search",
  requireAuth,
  async (req: Request, res: Response) => {
    const doctor = await Doctor.find({
      name: { $regex: req.query.name, $options: "i" },
      userId: req.currentUser!.id,
    });
    res.send({ doctor });
  }
);

export { router as searchDoctorRouter };
