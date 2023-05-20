import { currentUser } from "@clinicare/common";
import express from "express";
const router = express.Router();

router.get(
  "/api/user/currentUser",
  currentUser,
  (req: express.Request, res: express.Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);
export { router as currentUserRouter };
