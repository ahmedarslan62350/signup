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

    const validation = formSchema.safeParse(extractedData);
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid form data",
        errors: validation.error.errors,
      });
    }

    const data = validation.data;

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
    let frontInfo = null;
    let backInfo = null;

    const file = formData.get("file") as File | null;
    const front = formData.get("frontSide") as File | null;
    const back = formData.get("backSide") as File | null;

    if (file && front && back) {
      const uploadDir = path.join(process.cwd(), "uploads");

      const fileExtension = path.extname(file.name);
      const fileNameWithoutExt = path.basename(file.name, fileExtension);
      const uniqueFileName = `${fileNameWithoutExt}_${uuidv4()}${fileExtension}`;

      const frontExtension = path.extname(front.name);
      const frontNameWithoutExt = path.basename(front.name, frontExtension);
      const uniqueFrontName = `Front_${frontNameWithoutExt}_${uuidv4()}${frontExtension}`;

      const backExtension = path.extname(back.name);
      const backNameWithoutExt = path.basename(back.name, backExtension);
      const uniqueBackName = `Back_${backNameWithoutExt}_${uuidv4()}${backExtension}`;

      const filePath = path.join(uploadDir, uniqueFileName);
      const frontPath = path.join(uploadDir, uniqueFrontName);
      const backPath = path.join(uploadDir, uniqueBackName);

      await Promise.all([
        writeFile(filePath, Buffer.from(await file.arrayBuffer())),
        writeFile(frontPath, Buffer.from(await front.arrayBuffer())),
        writeFile(backPath, Buffer.from(await back.arrayBuffer())),
      ]);

      fileInfo = {
        filename: file.name,
        mimetype: file.type,
        size: file.size,
        path: filePath,
      };

      frontInfo = {
        filename: front.name,
        mimetype: front.type,
        size: front.size,
        path: frontPath,
      };

      backInfo = {
        filename: back.name,
        mimetype: back.type,
        size: back.size,
        path: backPath,
      };
    }

    const user = new registerModel({
      ...data,
      file: fileInfo,
      frontSide: frontInfo,
      backSide: backInfo,
    }) as IRegisterSchema;

    user.otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log(user)
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
