"use client";

import { useState } from "react";
import {
  ProductDetail,
  ProductSize,
  StyleColor,
} from "../types/product-detail";
import AddToCartButton from "./addToCartButton";
import ProductGallery from "./gallery/productGallery";
import ProductPrice from "./productPrice";
import ProductVariantSelector from "./productVariantSelector";

function isSameColorCombination(
  first: StyleColor[],
  second: StyleColor[],
): boolean {
  if (first.length !== second.length) {
    return false;
  }

  const firstIds = first.map((color) => color.id).sort();
  const secondIds = second.map((color) => color.id).sort();

  return firstIds.every((id, index) => id === secondIds[index]);
}

interface ProductPurchaseProps {
  product: ProductDetail;
}

export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const [selectedColor, setSelectedColor] = useState(product.styles[0].colors);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedPack, setSelectedPack] = useState(product.styles[0].pack);
  const [selectedStyle, setSelectedStyle] = useState(product.styles[0]);

  // TODO: Change the name here to selected style and the upper selected style in state to ImageStyle after refactore
  const selectedStyleForVariant =
    product.styles.find(
      (style) =>
        style.pack.id === selectedPack.id &&
        isSameColorCombination(style.colors, selectedColor),
    ) ?? null;

  const selectedVariant =
    selectedStyleForVariant && selectedSize
      ? (product.variants.find(
          (variant) =>
            variant.style === selectedStyleForVariant.id &&
            variant.size_ids.includes(selectedSize.id) &&
            variant.stock > 0,
        ) ?? null)
      : null;

  return (
    <>
      <ProductGallery images={selectedStyle.images} />
      <ProductPrice
        price={
          selectedVariant ? selectedVariant.price : product.variants[0].price
        }
      />
      <ProductVariantSelector
        product={product}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedPack={selectedPack}
        setSelectedPack={setSelectedPack}
        setSelectedStyle={setSelectedStyle}
      />
      <AddToCartButton
        selectedVariant={selectedVariant}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        selectedPack={selectedPack}
        variantImage={selectedStyle.images[0]}
      />
    </>
  );
}
