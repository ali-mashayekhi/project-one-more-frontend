import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { VerifyOtpPayload, VerifyOtpResponse } from "../types/auth";

export async function verifyOtp(
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> {
  return api<VerifyOtpResponse>(endpoints.users.auth.verifyOtp, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
