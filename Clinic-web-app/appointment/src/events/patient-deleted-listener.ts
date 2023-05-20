import { Message } from "node-nats-streaming";
import { Subjects, Listener, PatientDeletedEvent } from "@clinicare/common";
import { Patient } from "../models/patient";
import { Appointment } from "../models/appointment";

export class PatientDeletedListener extends Listener<PatientDeletedEvent> {
  readonly subject = Subjects.PatientDeleted;
  queueGroupName = "appoinment-service";

  async onMessage(data: PatientDeletedEvent["data"], msg: Message) {
    const { id } = data;
    const patient = await Patient.findById(id);

    if (!patient) {
      throw new Error("Patient not found");
    }

    Appointment.deleteMany({ patient: id }).then(() => {
      Patient.deleteOne({ _id: id }).then(() => {
        msg.ack();
      });
    });
  }
}
