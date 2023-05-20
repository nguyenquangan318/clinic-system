import { Subjects } from "./subjects";

export interface DoctorCreatedEvent {
  subject: Subjects.DoctorCreated;
  data: {
    id: string;
    name: string;
    phone: string;
    department: string;
    avatar: string;
  };
}
