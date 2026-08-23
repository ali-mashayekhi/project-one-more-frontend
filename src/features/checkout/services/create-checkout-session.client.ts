import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { CreateCheckoutSessionResponse } from "../types/checkout";

interface CreateCheckoutSessionPayload {
  items: {
    variant_id: number;
    quantity: number;
  }[];
}

export async function createCheckoutSession(
  payload: CreateCheckoutSessionPayload,
): Promise<CreateCheckoutSessionResponse> {
  return api<CreateCheckoutSessionResponse>(endpoints.checkout.sessions, {
    method: "POST",
    auth: true,
    body: JSON.stringify(payload),
  });
}
