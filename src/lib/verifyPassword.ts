"use server";

import { loginSchema } from "@/schemas/loginSchema";
import { cookies, headers } from "next/headers";

const IP_STRING = process.env.IPS || "";
const allowedIps = new Set(IP_STRING.split(",").map((s) => s.trim()));

export async function verify(email: string, password: string) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "unknown";
  console.log(ip);

  if (!allowedIps.has(ip)) {
    return { success: false, message: "Access denied from this IP" };
  }

  const { data } = loginSchema.safeParse({ email, password });
  const isAdmin =
    data?.email === process.env.ADMIN_EMAIL &&
    data?.password === process.env.ADMIN_PASSWORD;

  if (isAdmin) {
    const cookieStore = await cookies();
    cookieStore.set("token", process.env.TOKEN || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });
    return { success: true };
  }

  return { success: false, message: "Wrong Credentials" };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return { success: true, message: "Logout Successful" };
}
