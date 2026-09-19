import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { ShippingMethod } from "../types/checkout";

export async function getShippingMethods(): Promise<ShippingMethod[]> {
  return api<ShippingMethod[]>(endpoints.checkout.shippingMethods, {
    method: "GET",
    auth: true,
  });
}
