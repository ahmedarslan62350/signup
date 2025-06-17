import connectMongo from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import jwt from "jsonwebtoken";
import RegisterModel, { IRegisterSchema } from "@/models/register";

export async function GET(req: NextRequest) {
  await connectMongo();
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const data = (await jwt.verify(token.value, process.env.JWT_SECRET as string)) as IRegisterSchema;

    if (!data || data.role !== "admin") {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const users = await RegisterModel.find();

    return NextResponse.json({
      success: true,
      message: "User created successfully.",
      users: users || [],
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      message: "Failed to create user. Please try again later.",
      error: (error as ApiError).message,
    });
  }
}
