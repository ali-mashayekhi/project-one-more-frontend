// features/orders/services/get-order-details.client.ts

import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { OrderDetails } from "../types/order";

export async function getOrderDetails(uuid: string): Promise<OrderDetails> {
  return api<OrderDetails>(endpoints.orders.orders + uuid, {
    method: "GET",
    auth: true,
  });
}
