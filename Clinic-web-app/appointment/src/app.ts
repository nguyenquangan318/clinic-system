import { errorHandler, NotFoundError, currentUser } from "@clinicare/common";
import express from "express";
import "express-async-errors";
import { json, urlencoded } from "body-parser";
import cookieSession from "cookie-session";
import { createAppointmentRouter } from "./routes/new";
import { showAppointmentRouter } from "./routes/show";
import { indexAppointmentRouter } from "./routes";
import { updateAppointmentRouter } from "./routes/update";
import { deleteAppointmentRouter } from "./routes/delete";
import path from "path";
import { doctorAppointmentRouter } from "./routes/doctorAppointment";

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
app.use(doctorAppointmentRouter);
app.use(createAppointmentRouter);
app.use(showAppointmentRouter);
app.use(indexAppointmentRouter);
app.use(updateAppointmentRouter);
app.use(deleteAppointmentRouter);
app.use("/public", express.static(path.join(__dirname, "/app")));

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
