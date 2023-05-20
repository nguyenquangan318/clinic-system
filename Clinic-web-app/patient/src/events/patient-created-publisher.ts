import { Publisher, Subjects, PatientCreatedEvent } from "@clinicare/common";

export class PatientCreatedPublisher extends Publisher<PatientCreatedEvent> {
  readonly subject = Subjects.PatientCreated;
}
