import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties
// that are requried to create a new Doctor
interface DoctorAttrs {
  name: string;
  phone: String;
  department: string;
  avatar: object;
  userId: string;
}

// An interface that describes the properties
// that a Doctor Model has
interface DoctorModel extends mongoose.Model<DoctorDoc> {
  build(attrs: DoctorAttrs): DoctorDoc;
}

// An interface that describes the properties
// that a Doctor Document has
interface DoctorDoc extends mongoose.Document {
  name: string;
  phone: string;
  department: string;
  avatar: object;
  userId: string;
  version: number;
}

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    avatar: {
      data: String,
      contentType: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

doctorSchema.set("versionKey", "version");
doctorSchema.plugin(updateIfCurrentPlugin);

doctorSchema.statics.build = (attrs: DoctorAttrs) => {
  return new Doctor(attrs);
};

const Doctor = mongoose.model<DoctorDoc, DoctorModel>("Doctor", doctorSchema);

export { Doctor };
