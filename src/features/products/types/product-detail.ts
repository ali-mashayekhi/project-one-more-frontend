export interface ProductDetail {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  composition: string;

  size_guide_title: string;
  size_guide_description: string;
  size_guide_image?: string;

  sizes: ProductSize[];
  styles: ProductStyle[];
  variants: ProductVariant[];
}

export interface ProductSize {
  id: number;
  info_description: string;
  info_title: string;
  name: string;
}

export interface ProductStyle {
  id: number;
  pack: StylePack;
  colors: StyleColor[];
  images: StyleImage[];
}

export interface StylePack {
  id: number;
  name: string;
}

export interface StyleColor {
  id: number;
  name: string;
  hex_code: string;
}

export interface StyleImage {
  id: number;
  image: string;
  alt: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  style: number;
  size_ids: number[];
  price: number;
  stock: number;
}
