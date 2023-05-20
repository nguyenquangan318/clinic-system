import { Message } from "node-nats-streaming";
import { Subjects, Listener, PatientUpdatedEvent } from "@clinicare/common";
import { Patient } from "../models/patient";

export class PatientUpdatedListener extends Listener<PatientUpdatedEvent> {
  readonly subject = Subjects.PatientUpdated;
  queueGroupName = "appoinment-service";

  async onMessage(data: PatientUpdatedEvent["data"], msg: Message) {
    const { id, email, name, age, address, phone, version } = data;
    const patient = await Patient.findOne({
      _id: id,
      version: version,
    });
    console.log(id, version);

    if (!patient) {
      throw new Error("Patient not found");
    }

    patient.set({
      email,
      name,
      age,
      address,
      phone,
    });
    await patient.save();

    msg.ack();
  }
}
