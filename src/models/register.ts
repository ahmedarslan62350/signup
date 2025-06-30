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
  country: string;
  ipAddress?: string;
  otp: string;
  campaign: string;
  frontSideUrl?: string;
  backSideUrl?: string;
  fileUrl?: string;
  additionalInfo?: string;
  file: {
    path: string;
    filename: string;
    size: number;
    mimetype: string;
  };
  frontSide: {
    path: string;
    filename: string;
    size: number;
    mimetype: string;
  };
  backSide: {
    path: string;
    filename: string;
    size: number;
    mimetype: string;
  };
  role: string;
  nationalId: string;
  bussinessCountry: string;
  createdAt: Date;
  updatedAt: Date;
}

const formSchema = new Schema<IRegisterSchema>(
  {
    companyName: { type: String, required: true },
    physicalAddress: { type: String, required: true },
    contactAddress: { type: String, required: true },
    website: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    title: { type: String, required: true, minlength: 2 },
    state: { type: String, required: true, minlength: 2 },
    zipCode: { type: String, required: true },
    businessType: { type: String, required: true },
    agentsNumber: { type: String, required: false },
    portsNumber: { type: String, required: false },
    ipAddress: { type: String, required: false },
    campaign: { type: String, required: true },
    additionalInfo: { type: String, required: false },
    nationalId: { type: String },
    country: { type: String },
    bussinessCountry: {
      type: String,
    },
    frontSideUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
    },
    backSideUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
    },
    fileUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
    },
    role: { type: String, default: "user" },
    otp: { type: String, default: "" },
    file: {
      path: { type: String, required: false },
      filename: { type: String, required: false },
      size: { type: Number, required: false },
      mimetype: { type: String, required: false },
    },
    frontSide: {
      path: { type: String, required: false },
      filename: { type: String, required: false },
      size: { type: Number, required: false },
      mimetype: { type: String, required: false },
    },
    backSide: {
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
