import { Publisher, Subjects, ClinicCreatedEvent } from "@clinicare/common";

export class clinicCreatedPublisher extends Publisher<ClinicCreatedEvent> {
  readonly subject = Subjects.ClinicCreated;
}
