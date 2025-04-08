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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Link from "next/link";
import { Button } from "./ui/button";

import { FormStepArgs } from "@/types";

const FormStepThree = ({
  form,
  bussinessSelectValue,
  setBussinessSelectValue,
  handleBackSideChange,
  handleFrontSideChange,
  getCountryIdentityRecognitionMethod,
  handleFileChange,
  isLoading,
  setRadio,
  radio,
  setFormStep,
}: FormStepArgs) => {
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
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3"
        >
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800 leading-tight">
                  Type of Business
                </FormLabel>
                <FormControl>
                  <Select
                    required
                    value={bussinessSelectValue}
                    onValueChange={setBussinessSelectValue}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-purple-500 focus:ring-purple-500 w-full">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent {...field}>
                      <SelectItem value="contact_center">
                        Contact Center
                      </SelectItem>
                      <SelectItem value="reseller">Reseller</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {form.formState.errors.businessType && (
                  <FormDescription>
                    {form.formState.errors.businessType.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frontSide"
            render={() => (
              <FormItem>
                <FormLabel className="text-purple-800 leading-tight">
                  Front side ({getCountryIdentityRecognitionMethod()})
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFrontSideChange}
                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </FormControl>
                {form.formState.errors.frontSide && (
                  <FormDescription>
                    {form.formState.errors.frontSide.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="backSide"
            render={() => (
              <FormItem>
                <FormLabel className="text-purple-800 leading-tight">
                  Back side ({getCountryIdentityRecognitionMethod()})
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleBackSideChange}
                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </FormControl>
                {form.formState.errors.backSide && (
                  <FormDescription>
                    {form.formState.errors.backSide.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {bussinessSelectValue === "contact_center" ? (
          <motion.div variants={itemVariants} className="space-y-2">
            <FormField
              control={form.control}
              name="agentsNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">
                    Number Of Agents
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                      placeholder="No of agents"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.agentsNumber && (
                    <FormDescription>
                      {form.formState.errors.agentsNumber.message}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        ) : null}

        {bussinessSelectValue === "reseller" ||
        bussinessSelectValue === "wholesale" ? (
          <>
            <motion.div variants={itemVariants} className="space-y-2">
              <FormField
                control={form.control}
                name="portsNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-800">
                      Number Of Ports
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                        required
                        placeholder="No of ports"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.portsNumber && (
                      <FormDescription>
                        {form.formState.errors.portsNumber.message}
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
                name="ipAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-800">
                      IP Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                        required
                        placeholder="IP address"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.ipAddress && (
                      <FormDescription>
                        {form.formState.errors.ipAddress.message}
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </>
        ) : null}

        <motion.div variants={itemVariants} className="space-y-2">
          <FormField
            control={form.control}
            name="campaign"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800">Campaign</FormLabel>
                <FormControl>
                  <Input
                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                    required
                    placeholder="Campaign here"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.campaign && (
                  <FormDescription>
                    {form.formState.errors.campaign.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="file" className="text-purple-800">
            File
          </Label>
          <Input
            id="file"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
            required
          />
          <FormDescription>
            Upload your Business registeration certificate or driving license.{" "}
            <span className="font-bold">
              (Format Should be jpg, png, jpeg, pdf or Max File size 10MB)
            </span>
          </FormDescription>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800">
                  Additional Information
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                    required
                    placeholder="Tell us more about your business (optional)"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.additionalInfo && (
                  <FormDescription>
                    {form.formState.errors.additionalInfo.message}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div className="flex h-fit m-0 p-0 w-full items-center gap-2">
          <Input
            type="radio"
            className="w-fit"
            value={"termsAndConditions"}
            name="termsAndConditions"
            onChange={(e) => setRadio(e.target.value)}
          />
          <FormDescription>
            Check this box to confirm you are agree to our &nbsp;
            <Link href={"#"} className="font-bold underline">
              terms and conditions
            </Link>
            .
          </FormDescription>
        </motion.div>

        <motion.div className="flex space-x-4 pt-4">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="w-1/2"
          >
            <Button
              type="button"
              onClick={() => setFormStep(1)}
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
              disabled={!radio}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLoading ? "Loading..." : "Complete Signup"}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FormStepThree;
