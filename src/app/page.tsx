"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/schemas/signupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCookie } from "@/lib/cookiesHandler";
import FormStepOne from "@/components/FormStepOne";
import FormStepTwo from "@/components/FormStepTwo";
import FormStepThree from "@/components/FormStepThree";
import { upload } from "@imagekit/next";
import { getUserIPDetails } from "@/lib/utils";

const uploadToImageKit = async (file: File) => {
  const res = await fetch("/api/upload-auth");
  const { signature, token, expire, publicKey } = await res.json();

  const response = await upload({
    file,
    fileName: file.name,
    signature,
    expire,
    token,
    publicKey,
  });

  return response.url; // or .thumbnailUrl or .fileId
};

export default function SignupPage() {
  const router = useRouter();

  const [formStep, setFormStep] = useState(0);
  const [bussinessSelectValue, setBussinessSelectValue] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [frontSide, setFrontSide] = useState<File | null>(null);
  const [backSide, setBackSide] = useState<File | null>(null);
  const [radio, setRadio] = useState("");
  const [isNextButton, setIsNextButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFrontSideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFrontSide(file);
  };

  const handleBackSideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBackSide(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
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
      nationalId: "",

      businessType: "",
      campaign: "",
      companyName: "",
      contactAddress: "",
      contactEmail: "",
      firstName: "",
      lastName: "",
      bussinessCountry: "",

      contactPhone: "",
      ipAddress: "",
      physicalAddress: "",
      portsNumber: "",
      website: "",
      file: undefined,
      backSide: undefined,
      frontSide: undefined,
      fileUrl: "",
      backSideUrl: "",
      frontSideUrl: "",
    },
  });

  const watchPhysicalAddress = form.watch("physicalAddress");
  const watchCompanyName = form.watch("companyName");
  const website = form.watch("website");
  const bussinessCountry = form.watch("bussinessCountry");
  const watchCountry = form.watch("country");
  const firstName = form.watch("firstName");
  const lastName = form.watch("lastName");
  const title = form.watch("title");
  const contactEmail = form.watch("contactEmail");
  const contactPhone = form.watch("contactPhone");
  const state = form.watch("state");
  const zipCode = form.watch("zipCode");
  const contactAddress = form.watch("contactAddress");
  const nationalId = form.watch("nationalId");

  useEffect(() => {
    getUserIPDetails()
      .then((country) => {
        form.setValue("country", country);
      })
      .catch((err) => console.log(err));
  },[form]);

  useEffect(() => {
    setIsNextButton(false);
    const isStepValid = () => {
      if (formStep === 0) {
        return [
          watchPhysicalAddress,
          watchCompanyName,
          website,
          bussinessCountry,
        ].every((field) => field.trim() !== "");
      } else if (formStep === 1) {
        return [
          firstName,
          lastName,
          title,
          contactEmail,
          contactPhone,
          contactAddress,
          state,
          zipCode,
          nationalId,
        ].every((field) => field.trim() !== "");
      }
      return false;
    };

    setIsNextButton(isStepValid());
  }, [
    form,
    formStep,
    bussinessCountry,
    watchCompanyName,
    watchPhysicalAddress,
    website,
    contactAddress,
    contactEmail,
    firstName,
    lastName,
    state,
    nationalId,
    zipCode,
    contactPhone,
    title,
  ]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Prepare FormData
      const f = new FormData();
      const fieldMap: Record<string, string | undefined> = {
        additionalInfo: values.additionalInfo,
        agentsNumber: values.agentsNumber,
        businessType: bussinessSelectValue,
        campaign: values.campaign,
        companyName: values.companyName,
        contactAddress: values.contactAddress,
        contactEmail: values.contactEmail,
        firstName: values.firstName,
        lastName: values.lastName,
        title: values.title,
        state: values.state,
        zipCode: values.zipCode,
        country: values.country,
        contactPhone: values.contactPhone,
        ipAddress: values.ipAddress,
        physicalAddress: values.physicalAddress,
        portsNumber: values.portsNumber,
        website: values.website,
        nationalId: values.nationalId,
        bussinessCountry: values.bussinessCountry,
      };

      // Append fields
      Object.entries(fieldMap).forEach(([key, value]) => {
        f.append(key, value ?? "");
      });

      // Upload files concurrently
      const [frontSideUrl, backSideUrl, fileUrl] = await Promise.all([
        frontSide && uploadToImageKit(frontSide),
        backSide && uploadToImageKit(backSide),
        file && uploadToImageKit(file),
      ]);

      // Append file URLs
      if (frontSideUrl) f.append("frontSideUrl", frontSideUrl);
      if (backSideUrl) f.append("backSideUrl", backSideUrl);
      if (fileUrl) f.append("fileUrl", fileUrl);

      // Submit data
      const { data } = await axios.post("/api/v1/register", f);

      if (!data.success) {
        toast.error(data.message || "Submission failed.");
        return;
      }

      await setCookie("email", values.contactEmail);
      form.reset();
      router.replace("/success");
    } catch (error) {
      console.error(error);
      toast.error("Error while submitting");
    } finally {
      setFormSubmitted(true);
      setIsLoading(false);
    }
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
                    <FormStepOne
                      bussinessSelectValue={bussinessSelectValue}
                      form={form}
                      handleBackSideChange={handleBackSideChange}
                      handleFileChange={handleFileChange}
                      handleFrontSideChange={handleFrontSideChange}
                      isLoading={isLoading}
                      isNextButton={isNextButton}
                      radio={radio}
                      setBussinessSelectValue={setBussinessSelectValue}
                      setFormStep={setFormStep}
                      setIsloading={setIsLoading}
                      setRadio={setRadio}
                      watchCountry={watchCountry}
                    />
                  )}

                  {formStep === 1 && (
                    <FormStepTwo
                      bussinessSelectValue={bussinessSelectValue}
                      form={form}
                      handleBackSideChange={handleBackSideChange}
                      handleFileChange={handleFileChange}
                      handleFrontSideChange={handleFrontSideChange}
                      isLoading={isLoading}
                      isNextButton={isNextButton}
                      radio={radio}
                      setBussinessSelectValue={setBussinessSelectValue}
                      setFormStep={setFormStep}
                      setIsloading={setIsLoading}
                      setRadio={setRadio}
                      watchCountry={watchCountry}
                    />
                  )}

                  {formStep === 2 && (
                    <FormStepThree
                      bussinessSelectValue={bussinessSelectValue}
                      form={form}
                      handleBackSideChange={handleBackSideChange}
                      handleFileChange={handleFileChange}
                      handleFrontSideChange={handleFrontSideChange}
                      isLoading={isLoading}
                      isNextButton={isNextButton}
                      radio={radio}
                      setBussinessSelectValue={setBussinessSelectValue}
                      setFormStep={setFormStep}
                      setIsloading={setIsLoading}
                      setRadio={setRadio}
                      watchCountry={watchCountry}
                    />
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
