"use client"

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const Success = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-8 shadow-lg"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle size={80} className="text-purple-600" />
      </motion.div>
      <h2 className="text-2xl font-bold text-purple-800">
        Registration Complete!
      </h2>
      <p className="text-center text-gray-600">
        Thank you for signing up. We&apos;ll be in touch shortly.
      </p>
      <Button
        onClick={() => redirect("/")}
        className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        Return to Form
      </Button>
    </motion.div>
  );
};

export default Success;
