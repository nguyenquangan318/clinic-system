import { Message } from "node-nats-streaming";
import { Subjects, Listener, DoctorCreatedEvent } from "@clinicare/common";
import { Doctor } from "../models/doctor";

export class DoctorCreatedListener extends Listener<DoctorCreatedEvent> {
  readonly subject = Subjects.DoctorCreated;
  queueGroupName = "appoinment-service";

  async onMessage(data: DoctorCreatedEvent["data"], msg: Message) {
    const { id, name, phone, department, avatar, userId } = data;
    const doctor = Doctor.build({
      id,
      name,
      phone,
      department,
      avatar,
      userId,
    });
    await doctor.save();

    msg.ack();
  }
}
