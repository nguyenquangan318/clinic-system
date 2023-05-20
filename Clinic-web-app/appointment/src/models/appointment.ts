import { PatientDoc } from "./patient";
import { DoctorDoc } from "./doctor";
import mongoose, { ObjectId, PopulatedDoc, Document } from "mongoose";

// An interface that describes the properties
// that are requried to create a new Appointment
interface AppointmentAttrs {
  date: Date;
  patient: PopulatedDoc<Document<ObjectId> & PatientDoc>;
  doctor: PopulatedDoc<Document<ObjectId> & DoctorDoc>;
  userId: string;
}

// An interface that describes the properties
// that a Appointment Model has
interface AppointmentModel extends mongoose.Model<AppointmentDoc> {
  build(attrs: AppointmentAttrs): AppointmentDoc;
}

// An interface that describes the properties
// that a Appointment Document has
interface AppointmentDoc extends mongoose.Document {
  date: Date;
  patient: PopulatedDoc<Document<ObjectId> & PatientDoc>;
  doctor: PopulatedDoc<Document<ObjectId> & DoctorDoc>;
  userId: string;
}

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

appointmentSchema.statics.build = (attrs: AppointmentAttrs) => {
  return new Appointment(attrs);
};

const Appointment = mongoose.model<AppointmentDoc, AppointmentModel>(
  "Appointment",
  appointmentSchema
);

export { Appointment };
