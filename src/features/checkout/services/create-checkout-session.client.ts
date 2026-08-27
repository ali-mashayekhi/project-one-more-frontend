import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import {
  CreateCheckoutSessionPayload,
  CreateCheckoutSessionResponse,
} from "../types/checkout";

export async function createCheckoutSession(
  payload: CreateCheckoutSessionPayload,
): Promise<CreateCheckoutSessionResponse> {
  return api<CreateCheckoutSessionResponse>(endpoints.checkout.sessions, {
    method: "POST",
    auth: true,
    body: JSON.stringify(payload),
  });
}
