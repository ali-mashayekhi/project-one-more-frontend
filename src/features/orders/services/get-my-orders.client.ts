import { api } from "@/lib/api";
import { Order } from "../types/order";
import { endpoints } from "@/lib/endpoints";

export async function getMyOrders(): Promise<Order[]> {
  return api<Order[]>(endpoints.orders.orders, {
    method: "GET",
    auth: true,
  });
}
