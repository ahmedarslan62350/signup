"use server"

import { loginSchema } from "@/schemas/loginSchema";
import { cookies } from "next/headers";

export async function verify(email: string, password: string) {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  const { data } = loginSchema.safeParse({ email, password });

  if (data?.email == ADMIN_EMAIL && data?.password == ADMIN_PASSWORD) {
    console.log("RUN")
    const cookie = await cookies();
    cookie.set("token", process.env.TOKEN || "");
    return true;
  }

  return false;
}
