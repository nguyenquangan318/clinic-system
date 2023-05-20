import { Publisher, Subjects, DoctorUpdatedEvent } from "@clinicare/common";

export class DoctorUpdatedPublisher extends Publisher<DoctorUpdatedEvent> {
  readonly subject = Subjects.DoctorUpdated;
}
