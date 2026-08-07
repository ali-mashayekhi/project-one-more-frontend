import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const ENGLISH_TO_PERSIAN_DIGITS: Record<string, string> = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToPersianDigits = (number: string | number): string => {
  if (typeof number === "number") number = number.toString();

  return number.replace(/[0-9]/g, (digit) => ENGLISH_TO_PERSIAN_DIGITS[digit]);
};

export const formatMoney = (number: string | number): string => {
  if (typeof number === "number") number = number.toString();
  // Remove non-numeric characters except "."
  const cleanNumber = number.replace(/[^0-9.]/g, "");
  // Convert money unit to tuman
  const formattedCleanNumber = String(
    parseInt(String(Number(cleanNumber) / 10)),
  );
  // Split into integer and decimal parts if any
  const [integerPart, decimalPart] = formattedCleanNumber.split(".");
  // Format the integer part with commas
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Combine integer and decimal parts
  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : convertToPersianDigits(formattedInteger);
};
