import {
  ProductSize,
  StyleColor,
  StyleImage,
  StylePack,
} from "@/features/products/types/product-detail";

export interface CartItem {
  variantId: number;
  productId: number;
  sku: string;

  style: {
    colors: StyleColor[];
    image: StyleImage;
    pack: StylePack;
  };
  size: ProductSize;
  price: number;
  quantity: number;
}
