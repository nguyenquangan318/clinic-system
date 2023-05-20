import { Password } from "./../services/password";
import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new patient
interface PatientAttrs {
  email: string;
  password: string;
  name: string;
  age: number;
  address: String;
  phone: String;
}

// An interface that describes the properties
// that a Patient Model has
interface PatientModel extends mongoose.Model<PatientDoc> {
  build(attrs: PatientAttrs): PatientDoc;
}

// An interface that describes the properties
// that a Patient Document has
interface PatientDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  age: number;
  address: String;
  phone: String;
}

const patientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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

patientSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

patientSchema.statics.build = (attrs: PatientAttrs) => {
  return new Patient(attrs);
};

const Patient = mongoose.model<PatientDoc, PatientModel>(
  "Patient",
  patientSchema
);

export { Patient };
