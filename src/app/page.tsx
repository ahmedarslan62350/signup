"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/schemas/signupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCookie } from "@/lib/cookiesHandler";

export default function SignupPage() {
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const [bussinessSelectValue, setBussinessSelectValue] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isNextButton, setIsNextButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      additionalInfo: "",
      agentsNumber: "",
      title: "",
      state: "",
      zipCode: "",
      country: "",

      businessType: "",
      campaign: "",
      companyName: "",
      contactAddress: "",
      contactEmail: "",
      firstName: "",
      lastName: "",

      contactPhone: "",
      ipAddress: "",
      physicalAddress: "",
      portsNumber: "",
      website: "",
      file: undefined,
    },
  });

  const watchPhysicalAddress = form.watch("physicalAddress");
  const watchCompanyName = form.watch("companyName");

  useEffect(() => {
    if (watchPhysicalAddress !== "" && watchCompanyName !== "") {
      setIsNextButton(true);
    } else {
      setIsNextButton(false);
    }
  }, [form, watchCompanyName, watchPhysicalAddress]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const f = new FormData();

    f.append("additionalInfo", values.additionalInfo || "");
    f.append("agentsNumber", values.agentsNumber || "");
    f.append("businessType", bussinessSelectValue || "");
    f.append("campaign", values.campaign || "");
    f.append("companyName", values.companyName || "");
    f.append("contactAddress", values.contactAddress || "");
    f.append("contactEmail", values.contactEmail || "");
    f.append("firstName", values.firstName || "");
    f.append("lastName", values.lastName || "");
    f.append("title", values.title || "");
    f.append("state", values.state || "");
    f.append("zipCode", values.zipCode || "");
    f.append("country", values.country || "");
    f.append("contactPhone", values.contactPhone || "");
    f.append("ipAddress", values.ipAddress || "");
    f.append("physicalAddress", values.physicalAddress || "");
    f.append("portsNumber", values.portsNumber || "");
    f.append("website", values.website || "");

    if (file) {
      f.append("file", file);
    }

    for (const pair of f.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const { data } = await axios.post("/api/v1/register", f);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      await setCookie("email", form.getValues("contactEmail"));
      form.reset();
      router.replace("/verify");
    } catch (error) {
      console.log(error);
      toast.error("Error while submiting");
    } finally {
      setFormSubmitted(true);
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-yellow-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {formSubmitted ? null : (
          <Form {...form}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg bg-white p-6 shadow-xl md:p-8"
            >
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-yellow-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
              >
                Know Your Customer
              </motion.h1>

              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="relative mb-8 h-[1vh]">
                  <div className="absolute left-0 top-0 flex w-full z-10 justify-between">
                    {[0, 1, 2].map((step) => (
                      <motion.div
                        key={step}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: step * 0.2 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          formStep >= step
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "border-2 border-gray-300 bg-white text-gray-500"
                        }`}
                        onClick={() => setFormStep(step)}
                      >
                        {step + 1}
                      </motion.div>
                    ))}
                  </div>
                  <div className="absolute left-0 top-5 h-1 w-full bg-gray-200">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${formStep * 50}%` }}
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                    />
                  </div>
                </div>

                <div className="mt-16">
                  {formStep === 0 && (
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
                                  {
                                    form.formState.errors.physicalAddress
                                      .message
                                  }
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
                              <FormLabel className="text-purple-800">
                                Website
                              </FormLabel>
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
                  )}

                  {formStep === 1 && (
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
                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-purple-800">
                                  Title
                                </FormLabel>
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

                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-purple-800">
                                  First Name
                                </FormLabel>
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

                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-purple-800">
                                  Last Name
                                </FormLabel>
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
                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <FormField
                            control={form.control}
                            name="contactEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-purple-800">
                                  Email
                                </FormLabel>
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
                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <FormField
                            control={form.control}
                            name="contactPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-purple-800">
                                  Phone
                                </FormLabel>
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

                      <motion.div variants={itemVariants} className="space-y-2">
                        <FormField
                          control={form.control}
                          name="contactAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-purple-800">
                                Address
                              </FormLabel>
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
                      </motion.div>

                      <div className="grid w-full gap-2 grid-cols-3">
                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-purple-800">
                                  State
                                </FormLabel>
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

                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-purple-800">
                                  Zip Code
                                </FormLabel>
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
                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-purple-800">
                                  Country
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="border-blue-200 focus:border-purple-500 focus:ring-purple-500"
                                    required
                                    {...field}
                                  />
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
                  )}

                  {formStep === 2 && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      <motion.div variants={itemVariants} className="space-y-2">
                        <FormField
                          control={form.control}
                          name="businessType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-purple-800">
                                Type of Business
                              </FormLabel>
                              <FormControl>
                                <Select
                                  required
                                  value={bussinessSelectValue}
                                  onValueChange={setBussinessSelectValue}
                                >
                                  <SelectTrigger className="border-blue-200 focus:border-purple-500 focus:ring-purple-500">
                                    <SelectValue placeholder="Select business type" />
                                  </SelectTrigger>
                                  <SelectContent {...field}>
                                    <SelectItem value="contact_center">
                                      Contact Center
                                    </SelectItem>
                                    <SelectItem value="reseller">
                                      Reseller
                                    </SelectItem>
                                    <SelectItem value="wholesale">
                                      Wholesale
                                    </SelectItem>
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
                      </motion.div>

                      {bussinessSelectValue === "contact_center" ? (
                        <motion.div
                          variants={itemVariants}
                          className="space-y-2"
                        >
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
                          <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                          >
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
                                      {
                                        form.formState.errors.portsNumber
                                          .message
                                      }
                                    </FormDescription>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                          >
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
                              <FormLabel className="text-purple-800">
                                Campaign
                              </FormLabel>
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
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            {isLoading ? "Loading..." : "Complete Signup"}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
          </Form>
        )}
      </div>
    </div>
  );
}
