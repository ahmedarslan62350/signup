import connectMongo from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import jwt from "jsonwebtoken";
import { IRegisterSchema } from "@/models/register";
import { readFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  await connectMongo();
  try {
    const { filePath } = await req.json();

    if (!filePath) {
      return NextResponse.json({
        success: false,
        message: "Data in the fields not found",
      });
    }

    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const privateKey = fs.readFileSync(
      path.join(process.cwd(), "private.key"),
      "utf8"
    );

    const data = (await jwt.verify(token.value, privateKey, {
      algorithms: ["ES256"],
    })) as IRegisterSchema;

    if (!data || data.role !== "admin") {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const buffer = await readFile(filePath);
    const string = buffer.toString("base64");
    return NextResponse.json({
      success: true,
      message: "User created successfully.",
      fileBuffer: string,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      message: "Failed to create user. Please try again later.",
      error: (error as ApiError).message,
    });
  }
}
