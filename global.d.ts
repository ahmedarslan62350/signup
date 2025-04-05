declare module 'use-react-countries' {
    import { Dispatch, SetStateAction } from 'react';
  
    // Define the shape of a currency object.
    export interface Currency {
      name: string;
      symbol: string;
    }
  
    // Define the shape of the maps object.
    export interface Maps {
      googleMaps: string;
      openStreetMaps: string;
    }
  
    // Define the shape of the postal code object.
    export interface PostalCode {
      format: string;
      regex: string;
    }
  
    // Define the shape of the flags object.
    export interface Flags {
      png: string;
      svg: string;
    }
  
    // Define the shape of a country object.
    export interface Country {
      name: string;
      capital: string;
      area?: number;
      coordinates?: number[];
      currencies?: Currency[];
      languages?: string[];
      maps?: Maps;
      postalCode?: PostalCode;
      flags?: Flags;
      population?: number;
      emoji?: string;
      countryCallingCode?: string;
    }
  
    // The hook returns the current list of countries and a setter function.
    export function useCountries(): {
      countries: Country[];
      setCountries: Dispatch<SetStateAction<Country[]>>;
    };
  }
  