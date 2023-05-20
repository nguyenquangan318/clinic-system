import { DoctorCreatedEvent } from "./doctor-created-event";
import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";

export class DoctorCreatedListener extends Listener<DoctorCreatedEvent> {
  readonly subject = Subjects.DoctorCreated;
  queueGroupName = "schedule-service";

  onMessage(data: DoctorCreatedEvent["data"], msg: Message) {
    console.log("Event data:", data);
    msg.ack();
  }
}
