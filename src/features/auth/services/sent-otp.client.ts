import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { SendOtpPayload, SendOtpResponse } from "../types/auth";

export async function sendOtp(
  payload: SendOtpPayload,
): Promise<SendOtpResponse> {
  return api<SendOtpResponse>(endpoints.users.auth.sendOtp, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
