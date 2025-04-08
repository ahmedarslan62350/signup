"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import { FormStepArgs } from "@/types";

const FormStepOne = ({ form, setFormStep, isNextButton }: FormStepArgs) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800">
                  Bussiness Legal Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="companyName"
                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                    required
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.companyName && (
                  <FormDescription>
                    {form.formState.errors.companyName.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <FormField
            control={form.control}
            name="physicalAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800">
                  Bussiness Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                    required
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.physicalAddress && (
                  <FormDescription>
                    {form.formState.errors.physicalAddress.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800">Website</FormLabel>
                <FormControl>
                  <Input
                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                    required
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.website && (
                  <FormDescription>
                    {form.formState.errors.website.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="pt-4"
        >
          <Button
            disabled={!isNextButton}
            type="button"
            onClick={() => setFormStep(1)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Next Step
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FormStepOne;
