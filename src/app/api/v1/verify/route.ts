import registerModel, { IRegisterSchema } from "@/models/register";
import connectMongo from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import { sendEmail } from "@/config/emailService";

export async function POST(req: NextRequest) {
  await connectMongo();

  try {
    const { otp } = await req.json();

    if (!otp) {
      return NextResponse.json({
        success: false,
        message: "OTP not provided",
      });
    }

    const email = await req.cookies.get("email");
    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Unaothorized",
      });
    }

    const existingUser = (await registerModel.findOne({
      contactEmail: email.value,
    })) as IRegisterSchema;

    if (!existingUser) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    if (existingUser.otp !== otp) {
      return NextResponse.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    existingUser.otp = "";

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

    await Promise.all([
      existingUser.save(),
      sendEmail({
        to: existingUser.contactEmail,
        subject: "Welcome",
        text: "Hey",
        data: existingUser,
      }),
      sendEmail({
        to: ADMIN_EMAIL,
        subject: "Welcome",
        text: "Hey",
        data: existingUser,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "User verified successfully.",
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
