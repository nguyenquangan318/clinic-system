import { Publisher, Subjects, PatientDeletedEvent } from "@clinicare/common";

export class PatientDeletedPublisher extends Publisher<PatientDeletedEvent> {
  readonly subject = Subjects.PatientDeleted;
}
