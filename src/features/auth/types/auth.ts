import { User } from "@/features/users/types/user";

export type LoginStep = "phone" | "verify";

export interface SendOtpResponse {
  detail: string;
}

export interface SendOtpPayload {
  phone_number: string;
}

export interface VerifyOtpPayload {
  phone_number: string;
  otp: string;
}

export interface VerifyOtpResponse {
  user: User;
  refresh: string;
  access: string;
}
