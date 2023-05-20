import { Message } from "node-nats-streaming";
import { Subjects, Listener, PatientCreatedEvent } from "@clinicare/common";
import { Patient } from "../models/patient";

export class PatientCreatedListener extends Listener<PatientCreatedEvent> {
  readonly subject = Subjects.PatientCreated;
  queueGroupName = "appoinment-service";

  async onMessage(data: PatientCreatedEvent["data"], msg: Message) {
    const { id, email, name, age, address, phone, userId } = data;
    const patient = Patient.build({
      id,
      email,
      name,
      age,
      address,
      phone,
      userId,
    });
    await patient.save();

    msg.ack();
  }
}
