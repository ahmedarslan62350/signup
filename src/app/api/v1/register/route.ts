import registerModel, { IRegisterSchema } from "@/models/register";
import connectMongo from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { formSchema } from "@/schemas/signupForm";
import { ApiError } from "next/dist/server/api-utils";
import path from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { verifyEmail } from "@/config/emailService";

export async function POST(req: NextRequest) {
  await connectMongo();

  try {
    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Extract fields from formData
    const extractedData = {
      additionalInfo: formData.get("additionalInfo") as string,
      agentsNumber: formData.get("agentsNumber") as string,
      businessType: formData.get("businessType") as string,
      campaign: formData.get("campaign") as string,
      companyName: formData.get("companyName") as string,
      contactAddress: formData.get("contactAddress") as string,
      contactEmail: formData.get("contactEmail") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      title: formData.get("title") as string,
      country: formData.get("country") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
      contactPhone: formData.get("contactPhone") as string,
      ipAddress: formData.get("ipAddress") as string,
      physicalAddress: formData.get("physicalAddress") as string,
      portsNumber: formData.get("portsNumber") as string,
      website: formData.get("website") as string,
      nationalId: formData.get("nationalId"),
    };

    // Validate extracted data using Zod schema
    const validation = formSchema.safeParse(extractedData);
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid form data",
        errors: validation.error.errors,
      });
    }

    const data = validation.data;

    // Check if user already exists
    const existingUser = await registerModel.findOne({
      contactEmail: data.contactEmail,
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User with the provided email already exists.",
      });
    }

    let fileInfo = null;
    const file = formData.get("file") as File | null;

    if (file) {
      const uploadDir = path.join(process.cwd(), "uploads");
      const uploadDir1 = path.join(process.cwd(), "public");
      const fileExtension = path.extname(file.name); // Extracts the file extension
      const fileNameWithoutExt = path.basename(file.name, fileExtension);
      const uniqueFileName = `${fileNameWithoutExt}_${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadDir, uniqueFileName);
      const filePath1 = path.join(uploadDir1, uniqueFileName);

      await Promise.all([
        writeFile(filePath, Buffer.from(await file.arrayBuffer())),
        writeFile(filePath1, Buffer.from(await file.arrayBuffer())),
      ]);

      fileInfo = {
        filename: file.name,
        mimetype: file.type,
        size: file.size,
        path: filePath,
      };
    }

    // Save user to database
    const user = new registerModel({
      ...data,
      file: fileInfo,
    }) as IRegisterSchema;

    user.otp = Math.floor(100000 + Math.random() * 900000).toString();

    await user.save();
    await verifyEmail({
      to: user.contactEmail,
      data: user,
      subject: "hello",
      text: "OTP",
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully.",
      user,
    });
  } catch (error: unknown) {
    console.error("Error in POST /api/create-user:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create user. Please try again later.",
      error: (error as ApiError).message,
    });
  }
}
