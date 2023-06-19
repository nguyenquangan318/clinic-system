import { Message } from "node-nats-streaming";
import { Subjects, Listener, DoctorDeletedEvent } from "@clinicare/common";
import { User } from "../models/user";

export class DoctorDeletedListener extends Listener<DoctorDeletedEvent> {
  readonly subject = Subjects.DoctorDeleted;
  queueGroupName = "doctor-service";

  async onMessage(data: DoctorDeletedEvent["data"], msg: Message) {
    const { id } = data;
    const doctor = await User.findById(id);

    if (!doctor) {
      msg.ack();
      return;
    }
    User.deleteOne({ _id: id }).then(() => {
      msg.ack();
    });
  }
}
