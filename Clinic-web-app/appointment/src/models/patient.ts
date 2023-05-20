import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties
// that are requried to create a new patient
interface PatientAttrs {
  id: string;
  email: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  userId: string;
}

// An interface that describes the properties
// that a Patient Model has
interface PatientModel extends mongoose.Model<PatientDoc> {
  build(attrs: PatientAttrs): PatientDoc;
}

// An interface that describes the properties
// that a Patient Document has
export interface PatientDoc extends mongoose.Document {
  email: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  userId: string;
  version: number;
}

const patientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
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

patientSchema.statics.build = (attrs: PatientAttrs) => {
  return new Patient({
    _id: attrs.id,
    email: attrs.email,
    name: attrs.name,
    age: attrs.age,
    address: attrs.address,
    phone: attrs.phone,
    userId: attrs.userId,
  });
};

patientSchema.set("versionKey", "version");
patientSchema.plugin(updateIfCurrentPlugin);

const Patient = mongoose.model<PatientDoc, PatientModel>(
  "Patient",
  patientSchema
);

export { Patient };
