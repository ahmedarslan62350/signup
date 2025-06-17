import { getFetchAPI } from "@/app/config/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getUserIP = async () => {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
};

export const getUserIPDetails = async () => {
  const ip = await getUserIP();
  const reqUrl = getFetchAPI(ip);
  const res = await fetch(reqUrl);
  const data = (await res.json()) as { country_name: string };
  return data.country_name;
};

export const getCountryIdentityRecognitionMethod = (country: string) => {
  switch (country) {
    case "Pakistan":
      return "CNIC";
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
