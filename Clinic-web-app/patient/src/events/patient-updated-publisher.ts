import { Publisher, Subjects, PatientUpdatedEvent } from "@clinicare/common";

export class PatientUpdatedPublisher extends Publisher<PatientUpdatedEvent> {
  readonly subject = Subjects.PatientUpdated;
}
