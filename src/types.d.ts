import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/schemas/signupForm";

export interface FormStepArgs {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  bussinessSelectValue: string;
  radio: string;
  isLoading: boolean;
  isNextButton: boolean;
  setBussinessSelectValue: React.Dispatch<React.SetStateAction<string>>;
  setRadio: React.Dispatch<React.SetStateAction<string>>;
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  watchCountry: string;
  handleBackSideChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFrontSideChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getCountryIdentityRecognitionMethod?: () => string;
}
