"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/verifyPassword";
import { useRouter } from "next/navigation";

export default function AdminLayout(
  props: Readonly<{
    children: Readonly<React.ReactNode>;
  }>,
) {
  const { children } = props;
  const router = useRouter();

  const logout = async () => {
    const res = await logoutUser();
    if (res.success) router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>

          <Button onClick={logout}>Logout</Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
