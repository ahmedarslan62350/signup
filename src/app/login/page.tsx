"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verify } from "@/lib/verifyPassword";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const verifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await verify(email, password);
    if (!res.success) return toast.error("Wrong Credentials");

    router.push("/admin");
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      {/* Use a form element and onSubmit */}
      <form
        onSubmit={verifyPassword}
        className="grid grid-cols-2 gap-2 px-5 py-2 border-[1px] border-gray-600"
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          autoComplete="username"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="current-password"
        />
        <Button type="submit">Verify</Button>{" "}
      </form>
    </div>
  );
};

export default Page;
