import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

interface ProductDetail {
  id: number;
  name: string;
}

export async function getProductDetail(id: string) {
  return api<ProductDetail>(`${endpoints.products.productDetail}${id}/`, {
    method: "GET",
  });
}
