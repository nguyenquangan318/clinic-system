import { Publisher } from "./base-publisher";
import { DoctorCreatedEvent } from "./doctor-created-event";
import { Subjects } from "./subjects";

export class DoctorCreatedPublisher extends Publisher<DoctorCreatedEvent> {
  readonly subject = Subjects.DoctorCreated;
}
