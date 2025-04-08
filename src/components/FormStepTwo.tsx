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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { FormStepArgs } from "@/types";
import { useCountries } from "use-react-countries";

const FormStepTwo = ({
  form,
  getCountryIdentityRecognitionMethod,
  setFormStep,
  watchCountry,
}: FormStepArgs) => {
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
        <motion.h2
          variants={itemVariants}
          className="text-xl font-semibold text-purple-800"
        >
          Billing Contact
        </motion.h2>

        <div className="grid w-full gap-2 grid-cols-3">
          <motion.div variants={itemVariants} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.title && (
                    <FormDescription>
                      {form.formState.errors.title.message}
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.firstName && (
                    <FormDescription>
                      {form.formState.errors.firstName.message}
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.lastName && (
                    <FormDescription>
                      {form.formState.errors.lastName.message}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </div>

        <div className="grid w-full gap-2 grid-cols-2">
          <motion.div variants={itemVariants} className="space-y-2">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.contactEmail && (
                    <FormDescription>
                      {form.formState.errors.contactEmail.message}
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
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.contactPhone && (
                    <FormDescription>
                      {form.formState.errors.contactPhone.message}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>{" "}
        </div>

        <div className="grid w-full gap-2 grid-cols-3">
          <motion.div variants={itemVariants} className="space-y-2">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">State</FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.state && (
                    <FormDescription>
                      {form.formState.errors.state.message}
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
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.zipCode && (
                    <FormDescription>
                      {form.formState.errors.zipCode.message}
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">Country</FormLabel>
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
                              <SelectItem
                                key={country.name}
                                value={country.name}
                              >
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
        </div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 items-center gap-2"
        >
          <FormField
            control={form.control}
            name="contactAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800">Address</FormLabel>
                <FormControl>
                  <Input
                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                    required
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.contactAddress && (
                  <FormDescription>
                    {form.formState.errors.contactAddress.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          {watchCountry !== "" ? (
            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">
                    {getCountryIdentityRecognitionMethod()}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.nationalId && (
                    <FormDescription>
                      {form.formState.errors.nationalId.message}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </motion.div>

        <motion.div className="flex space-x-4 pt-4">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="w-1/2"
          >
            <Button
              type="button"
              onClick={() => setFormStep(0)}
              variant="outline"
              className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Previous
            </Button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="w-1/2"
          >
            <Button
              type="button"
              onClick={() => setFormStep(2)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Next Step
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FormStepTwo;
