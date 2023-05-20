import { Publisher, Subjects, DoctorCreatedEvent } from "@clinicare/common";

export class DoctorCreatedPublisher extends Publisher<DoctorCreatedEvent> {
  readonly subject = Subjects.DoctorCreated;
}
