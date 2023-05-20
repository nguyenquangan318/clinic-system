import { errorHandler, NotFoundError } from "@clinicare/common";
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/siginin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import cookieSession from "cookie-session";
import { patientSignupRouter } from "./routes/patientSignup";
import { patientSigninRouter } from "./routes/patientSignin";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
const port = 3000;

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//patient route
app.use(patientSignupRouter);
app.use(patientSigninRouter);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
