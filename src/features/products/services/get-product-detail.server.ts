import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { ProductDetail } from "../types/product-detail";

export async function getProductDetail(slug: string): Promise<ProductDetail> {
  return api<ProductDetail>(`${endpoints.products.productDetail}${slug}/`, {
    method: "GET",
  });
}
