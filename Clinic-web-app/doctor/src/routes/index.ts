import express, { Request, Response } from "express";
import { Doctor } from "../models/doctor";
import { requireAuth } from "@clinicare/common";

const router = express.Router();

router.get("/api/doctor", requireAuth, async (req: Request, res: Response) => {
  const totalDoctor = await Doctor.find({
    userId: req.currentUser!.id,
  }).count();
  if (req.query.page && req.query.size) {
    try {
      const page = parseInt(req.query.page as string);
      const pageSize = parseInt(req.query.size as string);
      const skippedAmount = (page - 1) * pageSize;
      const listPageDoctor = await Doctor.find({ userId: req.currentUser!.id })
        .skip(skippedAmount)
        .limit(pageSize);
      res.status(200).json({ doctor: listPageDoctor, total: totalDoctor });
    } catch (error) {
      res.status(500).json({ message: "server error", error });
    }
  } else {
    const doctor = await Doctor.find({ userId: req.currentUser!.id });

    res.send({ doctor, total: totalDoctor });
  }
});

export { router as indexDoctorRouter };
