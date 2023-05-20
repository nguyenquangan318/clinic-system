import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { DoctorCreatedListener } from "./events/doctor-created-listener";
import { DoctorUpdatedListener } from "./events/doctor-updated-listener";
import { PatientCreatedListener } from "./events/patient-created-listener";
import { PatientUpdatedListener } from "./events/patient-updated-listener";
import { PatientDeletedListener } from "./events/patient-deleted-listener";
import { DoctorDeletedListener } from "./events/doctor-deleted-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error(" MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error(" NATS_CLUSTER_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error(" NATS_URL must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error(" NATS_CLIENT_ID must be defined");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => {
      natsWrapper.client.close();
    });
    process.on("SIGTERM", () => {
      natsWrapper.client.close();
    });

    new DoctorCreatedListener(natsWrapper.client).listen();
    new DoctorUpdatedListener(natsWrapper.client).listen();
    new DoctorDeletedListener(natsWrapper.client).listen();
    new PatientCreatedListener(natsWrapper.client).listen();
    new PatientUpdatedListener(natsWrapper.client).listen();
    new PatientDeletedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => console.log(`App listening on port 3000`));
};

start();
