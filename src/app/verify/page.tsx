"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof verifySchema>) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/v1/verify", values, {
        withCredentials: true,
      });

      if (!data || !data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      router.replace("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wromg");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-yellow-50 p-4 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800">
                  OTP (One Time Password)
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                    required
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.otp && (
                  <FormDescription>
                    {form.formState.errors.otp.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isLoading ? "Loading..." : "Complete Signup"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Verify;
