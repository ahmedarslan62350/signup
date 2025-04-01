import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - User & File Management",
  description: "Admin panel for managing users and files",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
