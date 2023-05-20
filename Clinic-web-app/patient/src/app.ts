import { errorHandler, NotFoundError, currentUser } from "@clinicare/common";
import express from "express";
import "express-async-errors";
import { json, urlencoded } from "body-parser";
import cookieSession from "cookie-session";
import { createPatientRouter } from "./routes/new";
import { showPatientRouter } from "./routes/show";
import { indexPatientRouter } from "./routes";
import { updatePatientRouter } from "./routes/update";
import { deletePatientRouter } from "./routes/delete";
import path from "path";
import { searchPatientRouter } from "./routes/search";

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
app.use(searchPatientRouter);
app.use(createPatientRouter);
app.use(showPatientRouter);
app.use(indexPatientRouter);
app.use(updatePatientRouter);
app.use(deletePatientRouter);
app.use("/public", express.static(path.join(__dirname, "/app")));

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
