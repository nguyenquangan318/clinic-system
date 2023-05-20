import { errorHandler, NotFoundError, currentUser } from "@clinicare/common";
import express from "express";
import "express-async-errors";
import { json, urlencoded } from "body-parser";
import cookieSession from "cookie-session";
import { createDoctorRouter } from "./routes/new";
import { showDoctorRouter } from "./routes/show";
import { indexDoctorRouter } from "./routes";
import { updateDoctorRouter } from "./routes/update";
import { deleteDoctorRouter } from "./routes/delete";
import path from "path";
import { searchDoctorRouter } from "./routes/search";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(createDoctorRouter);
app.use(searchDoctorRouter);
app.use(showDoctorRouter);
app.use(indexDoctorRouter);
app.use(updateDoctorRouter);
app.use(deleteDoctorRouter);
app.use("/public", express.static(path.join(__dirname, "/app")));

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
