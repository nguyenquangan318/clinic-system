import { Message } from "node-nats-streaming";
import { Subjects, Listener, DoctorUpdatedEvent } from "@clinicare/common";
import { Doctor } from "../models/doctor";

export class DoctorUpdatedListener extends Listener<DoctorUpdatedEvent> {
  readonly subject = Subjects.DoctorUpdated;
  queueGroupName = "appoinment-service";

  async onMessage(data: DoctorUpdatedEvent["data"], msg: Message) {
    const { id, name, phone, department, avatar, version } = data;
    const doctor = await Doctor.findOne({
      _id: id,
      version: version,
    });
    console.log(id, version);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    doctor.set({
      name,
      phone,
      department,
      avatar,
    });
    await doctor.save();

    msg.ack();
  }
}
