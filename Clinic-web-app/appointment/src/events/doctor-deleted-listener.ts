import { Message } from "node-nats-streaming";
import { Subjects, Listener, DoctorDeletedEvent } from "@clinicare/common";
import { Doctor } from "../models/doctor";
import { Appointment } from "../models/appointment";

export class DoctorDeletedListener extends Listener<DoctorDeletedEvent> {
  readonly subject = Subjects.DoctorDeleted;
  queueGroupName = "appoinment-service";

  async onMessage(data: DoctorDeletedEvent["data"], msg: Message) {
    const { id } = data;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    Appointment.deleteMany({ doctor: id }).then(() => {
      Doctor.deleteOne({ _id: id }).then(() => {
        msg.ack();
      });
    });
  }
}
