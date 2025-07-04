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
import { Button } from "./ui/button";

import { FormStepArgs } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCountries } from "use-react-countries";

const FormStepOne = ({ form, setFormStep, isNextButton }: FormStepArgs) => {
  const { countries } = useCountries();

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
                  <Input
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
            name="bussinessCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800">
                  Bussiness Country
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Countries</SelectLabel>
                        {countries
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((country) => (
                            <SelectItem key={country.name} value={country.name}>
                              <div className="flex items-center gap-3">
                                {country.emoji ? (
                                  <div className="w-fit h-full font-bold px-2 pb-1 rounded bg-gray-100">
                                    {country.emoji}
                                  </div>
                                ) : (
                                  <div className="w-fit h-full font-extrabold text-[10px] px-2 pb-1 rounded bg-gray-100">
                                    {country.name
                                      .split(" ")
                                      .map((e) =>
                                        e[0] === e[0].toUpperCase()
                                          ? e[0]
                                          : null
                                      )}
                                  </div>
                                )}
                                <div>{country.name}</div>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                {form.formState.errors.country && (
                  <FormDescription>
                    {form.formState.errors.country.message}
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
