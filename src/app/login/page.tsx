"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verify } from "@/lib/verifyPassword";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyPassword = () => {
    const res = verify(email, password);
    if (!res) return toast.error("Wrong Credentials");
    redirect("/admin");
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="grid grid-cols-2 gap-2 px-5 py-2 border-[1px] border-gray-600">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          id="email"
          placeholder="email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="password"
          id="password"
          placeholder="password"
        />
        <Button onClick={verifyPassword}>Verify</Button>
      </div>
    </div>
  );
};

export default Page;
