import z from "zod";

export const formSchema = z.object({
  companyName: z.string().min(8, "Too short"),
  physicalAddress: z.string().min(8, "Too short"),
  title: z.string().min(3, "Too short"),
  website: z.string().min(8, "Too short"),
  firstName: z.string().min(3, "Too short"),
  state: z.string().min(4, "Too short"),
  zipCode: z.string().min(3, "Too short"),
  country: z.string(),
  lastName: z.string().min(3, "Too short"),
  contactEmail: z.string().min(8, "Too short"),
  contactPhone: z.string().min(8, "Too short"),
  contactAddress: z.string().min(8, "Too short"),
  businessType: z.string(),
  agentsNumber: z.string(),
  portsNumber: z.string(),
  ipAddress: z.string(),
  campaign: z.string().min(8, "Too short"),
  additionalInfo: z.string().optional(),
  file: z.instanceof(File).optional(),
  frontSide: z.instanceof(File).optional(),
  backSide: z.instanceof(File).optional(),
  nationalId: z.string().min(8, "Too short"),
  bussinessCountry: z.string(),
  frontSideUrl: z.string().optional(),
  backSideUrl: z.string().optional(),
  fileUrl: z.string().optional(),
});
