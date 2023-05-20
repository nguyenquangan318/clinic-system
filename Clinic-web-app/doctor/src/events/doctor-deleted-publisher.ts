import { Publisher, Subjects, DoctorDeletedEvent } from "@clinicare/common";

export class DoctorDeletedPublisher extends Publisher<DoctorDeletedEvent> {
  readonly subject = Subjects.DoctorDeleted;
}
