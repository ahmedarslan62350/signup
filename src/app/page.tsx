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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFrontSideChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFrontSide(selectedFile);
    }
  };

  const handleBackSideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setBackSide(selectedFile);
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
      nationalId: "",

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
      backSide: undefined,
      frontSide: undefined,
    },
  });

  const watchPhysicalAddress = form.watch("physicalAddress");
  const watchCompanyName = form.watch("companyName");
  const watchCountry = form.watch("country");

  const getCountryIdentityRecognitionMethod = () => {
    switch (watchCountry) {
      case "Pakistan":
        return "Computerized National Identity Card (CNIC)";
      case "India":
        return "Aadhaar Card Number";
      case "United States":
        return "Company Registration Number / Driving license";
      case "United Kingdom":
        return "National Insurance Number (NIN)";
      case "Canada":
        return "Social Insurance Number (SIN)";
      case "Australia":
        return "Tax File Number (TFN)";
      case "Germany":
        return "Personalausweis (Identity Card)";
      case "France":
        return "Numéro de Sécurité Sociale (Social Security Number)";
      case "Brazil":
        return "CPF Number (Cadastro de Pessoas Físicas)";
      case "South Africa":
        return "ID Number";
      case "Japan":
        return "My Number";
      case "China":
        return "Resident Identity Card";
      case "Russia":
        return "Passport or SNILS";
      case "Mexico":
        return "CURP (Clave Única de Registro de Población)";
      case "Argentina":
        return "DNI (Documento Nacional de Identidad)";
      case "Italy":
        return "Codice Fiscale";
      case "Spain":
        return "DNI (Documento Nacional de Identidad)";
      case "Saudi Arabia":
        return "Iqama";
      case "United Arab Emirates":
        return "Emirates ID";
      case "Turkey":
        return "Turkish National Identity Number";
      case "Egypt":
        return "National ID";
      default:
        return "Identity Card Number";
    }
  };

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
    f.append("country", values.country);
    f.append("contactPhone", values.contactPhone || "");
    f.append("ipAddress", values.ipAddress || "");
    f.append("physicalAddress", values.physicalAddress || "");
    f.append("portsNumber", values.portsNumber || "");
    f.append("website", values.website || "");
    f.append("nationalId", values.nationalId || "");

    if (file) {
      f.append("file", file);
    }

    if (frontSide) {
      f.append("frontSide", frontSide);
    }

    if (backSide) {
      f.append("backSide", backSide);
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
                    <FormStepOne
                      bussinessSelectValue={bussinessSelectValue}
                      form={form}
                      getCountryIdentityRecognitionMethod={
                        getCountryIdentityRecognitionMethod
                      }
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
                      getCountryIdentityRecognitionMethod={
                        getCountryIdentityRecognitionMethod
                      }
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
                      getCountryIdentityRecognitionMethod={
                        getCountryIdentityRecognitionMethod
                      }
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
