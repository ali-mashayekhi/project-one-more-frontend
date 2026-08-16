import { Dispatch, SetStateAction } from "react";
import { ProductStyle, StyleColor, StylePack } from "../types/product-detail";
import MultiColorSwatch from "./multiColorSwatch";
import SingleColorSwatch from "./singleColorSwatch";

interface VariantColorSelectorProps {
  productStyles: ProductStyle[];
  availableColorStyles: ProductStyle[];
  selectedColor: StyleColor[];
  setSelectedColor: Dispatch<SetStateAction<StyleColor[]>>;
  selectedPack: StylePack;
  setSelectedStyle: Dispatch<SetStateAction<ProductStyle>>;
}

const getColorKey = (colors: StyleColor[]) =>
  colors
    .map((color) => color.id)
    .sort()
    .join("-");

export default function VariantColorSelector({
  productStyles,
  availableColorStyles,
  selectedColor,
  setSelectedColor,
  selectedPack,
  setSelectedStyle,
}: VariantColorSelectorProps) {
  const uniqueColorStyles = productStyles.filter((style, index, styles) => {
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

  return (
    <div className="flex flex-col gap-3 py-3 ">
      <p className="font-medium text-sm text-muted-foreground">رنگ</p>
      <div className="flex gap-3 flex-wrap">
        {uniqueColorStyles.map((style) => {
          const colors = style.colors;
          const isAvailable = availableColorStyles.some(
            (availableStyle) =>
              getColorKey(availableStyle.colors) === getColorKey(colors),
          );

          if (colors.length === 1)
            return (
              <SingleColorSwatch
                key={style.id}
                color={colors[0]}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                available={isAvailable}
                productStyles={productStyles}
                selectedPack={selectedPack}
                setSelectedStyle={setSelectedStyle}
              />
            );
          if (colors.length > 1)
            return (
              <MultiColorSwatch
                key={style.id}
                colors={colors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                available={isAvailable}
                selectedPack={selectedPack}
                setSelectedStyle={setSelectedStyle}
                productStyles={productStyles}
              />
            );
        })}
      </div>
    </div>
  );
}
