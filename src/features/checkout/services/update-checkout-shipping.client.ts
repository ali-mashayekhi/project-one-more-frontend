import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { CheckoutShippingForm } from "../schemas/shipping";

export async function updateCheckoutShipping(
  sessionId: string,
  payload: CheckoutShippingForm,
) {
  return api(`${endpoints.checkout.shipping(sessionId)}`, {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
  });
}
