import { Dispatch, SetStateAction } from "react";
import {
  ProductDetail,
  ProductSize,
  ProductStyle,
  StyleColor,
  StylePack,
} from "../types/product-detail";
import VariantColorSelector from "./variantColorSelector";
import VariantPackSelector from "./variantPackSelector";
import VariantSizeSelector from "./variantSizeSelector";

interface ProductVariantSelectorProps {
  product: ProductDetail;
  selectedColor: StyleColor[];
  setSelectedColor: Dispatch<SetStateAction<StyleColor[]>>;
  selectedSize: ProductSize | null;
  setSelectedSize: Dispatch<SetStateAction<ProductSize | null>>;
  selectedPack: StylePack;
  setSelectedPack: Dispatch<SetStateAction<StylePack>>;
  setSelectedStyle: Dispatch<SetStateAction<ProductStyle>>;
}

export default function ProductVariantSelector({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  selectedPack,
  setSelectedPack,
  setSelectedStyle,
}: ProductVariantSelectorProps) {
  const availableColorStyles = product.styles
    .filter((style) => {
      // 1. Filter by selected pack
      if (selectedPack && style.pack.id !== selectedPack.id) {
        return false;
      }

      // 2. Find variants belonging to this style
      const styleVariants = product.variants.filter(
        (variant) => variant.style === style.id,
      );

      // 3. If a size is selected, the style must have
      //    at least one in-stock variant for that size.
      if (selectedSize) {
        return styleVariants.some(
          (variant) =>
            variant.size_ids.includes(selectedSize.id) && variant.stock > 0,
        );
      }

      // 4. No size selected:
      //    the style must have at least one variant in stock.
      return styleVariants.some((variant) => variant.stock > 0);
    })
    .filter((style, index, styles) => {
      // 5. Remove duplicate color combinations
      const colorKey = style.colors
        .map((color) => color.id)
        .sort()
        .join("-");

      return (
        index ===
        styles.findIndex((item) => {
          const itemKey = item.colors
            .map((color) => color.id)
            .sort()
            .join("-");

          return itemKey === colorKey;
        })
      );
    });

  const selectedColorKey = selectedColor
    .map((color) => color.id)
    .sort()
    .join("-");

  const availablePacks = product.styles
    .filter((style) => {
      // Exact color combination match
      const styleColorKey = style.colors
        .map((color) => color.id)
        .sort()
        .join("-");

      if (styleColorKey !== selectedColorKey) {
        return false;
      }

      // Find variants belonging to this style
      const styleVariants = product.variants.filter(
        (variant) => variant.style === style.id,
      );

      // Selected size
      if (selectedSize) {
        return styleVariants.some(
          (variant) =>
            variant.size_ids.includes(selectedSize.id) && variant.stock > 0,
        );
      }

      // No selected size
      return styleVariants.some((variant) => variant.stock > 0);
    })
    .reduce<StylePack[]>((packs, style) => {
      if (!packs.some((pack) => pack.id === style.pack.id)) {
        packs.push(style.pack);
      }

      return packs;
    }, []);

  const availableSizes = product.sizes.filter((size) => {
    return product.variants.some((variant) => {
      // Must be in stock
      if (variant.stock <= 0) {
        return false;
      }

      // Must support this size
      if (!variant.size_ids.includes(size.id)) {
        return false;
      }

      // Variant's style must belong to selected pack
      const style = product.styles.find((style) => style.id === variant.style);

      if (!style) {
        return false;
      }

      if (selectedPack && style.pack.id !== selectedPack.id) {
        return false;
      }

      // Variant's style must contain selected color
      if (
        selectedColor.length > 0 &&
        !selectedColor.every((selected) =>
          style.colors.some((color) => color.id === selected.id),
        )
      ) {
        return false;
      }

      return true;
    });
  });

  return (
    <div className="mb-8 px-5">
      <VariantColorSelector
        productStyles={product.styles}
        availableColorStyles={availableColorStyles}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedPack={selectedPack}
        setSelectedStyle={setSelectedStyle}
      />
      <VariantSizeSelector
        sizes={product.sizes}
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <VariantPackSelector
        productStyles={product.styles}
        availablePacks={availablePacks}
        selectedPack={selectedPack}
        setSelectedPack={setSelectedPack}
        selectedColor={selectedColor}
        setSelectedStyle={setSelectedStyle}
      />
    </div>
  );
}
