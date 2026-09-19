import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { CheckoutPaymentResponse } from "../types/checkout";

export async function checkoutPayment(
  sessionId: string,
): Promise<CheckoutPaymentResponse> {
  return api<CheckoutPaymentResponse>(
    `${endpoints.checkout.payment(sessionId)}`,
    {
      method: "POST",
      auth: true,
    },
  );
}
