import mongoose, { Document, Schema } from "mongoose";

export interface IRegisterSchema extends Document {
  companyName: string;
  physicalAddress: string;
  contactAddress: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  firstName: string;
  lastName: string;
  title: string;
  state: string;
  zipCode: string;
  businessType: string;
  agentsNumber?: string;
  portsNumber?: string;
  ipAddress?: string;
  otp: string;
  campaign: string;
  additionalInfo?: string;
  file: {
    path: string;
    filename: string;
    size: number;
    mimetype: string;
  };
  role: string;
  nationalId: string;
  createdAt: Date;
  updatedAt: Date;
}

const formSchema = new Schema<IRegisterSchema>(
  {
    companyName: { type: String, required: true, minlength: 8 },
    physicalAddress: { type: String, required: true, minlength: 8 },
    contactAddress: { type: String, required: true, minlength: 8 },
    website: { type: String, required: true, minlength: 8 },
    contactEmail: { type: String, required: true, minlength: 8 },
    contactPhone: { type: String, required: true, minlength: 8 },
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    title: { type: String, required: true, minlength: 2 },
    state: { type: String, required: true, minlength: 2 },
    zipCode: { type: String, required: true, minlength: 5 },
    businessType: { type: String, required: true },
    agentsNumber: { type: String, required: false },
    portsNumber: { type: String, required: false },
    ipAddress: { type: String, required: false },
    campaign: { type: String, required: true, minlength: 8 },
    additionalInfo: { type: String, required: false },
    nationalId: { type: String },
    role: { type: String, default: "user" },
    otp: { type: String, default: "" },
    file: {
      path: { type: String, required: false },
      filename: { type: String, required: false },
      size: { type: Number, required: false },
      mimetype: { type: String, required: false },
    },
  },
  { timestamps: true }
);

const RegisterModel =
  mongoose.models.Register ||
  mongoose.model<IRegisterSchema>("Register", formSchema);

export default RegisterModel;
