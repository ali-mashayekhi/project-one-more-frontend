import { Dispatch, SetStateAction } from "react";
import { ProductStyle, StyleColor, StylePack } from "../types/product-detail";

interface SingleColorSwatchProps {
  color: StyleColor;
  selectedColor: StyleColor[];
  setSelectedColor: Dispatch<SetStateAction<StyleColor[]>>;
  available: boolean;
  selectedPack: StylePack;
  setSelectedStyle: Dispatch<SetStateAction<ProductStyle>>;
  productStyles: ProductStyle[];
}

const getColorKey = (colors: StyleColor[]) =>
  colors
    .map((color) => color.id)
    .sort()
    .join("-");

export default function SingleColorSwatch({
  color,
  selectedColor,
  setSelectedColor,
  available,
  selectedPack,
  setSelectedStyle,
  productStyles,
}: SingleColorSwatchProps) {
  const isSelected =
    selectedColor.length === 1 && selectedColor[0].id === color.id;

  return (
    <button
      type="button"
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border ${
        isSelected ? "border-primary" : "border-transparent"
      }`}
      onClick={() => {
        const newColors = [color];

        setSelectedColor(newColors);

        const style = productStyles.find(
          (style) =>
            style.pack.id === selectedPack.id &&
            getColorKey(style.colors) === getColorKey(newColors),
        );

        if (style) {
          setSelectedStyle(style);
        }
      }}
      aria-label={color.name}
    >
      <span
        className="relative h-8 w-8 rounded-full"
        style={{ backgroundColor: color.hex_code }}
      />

      {!available && (
        <span
          className={`absolute inset-0 rounded-full ${
            !isSelected ? "overflow-hidden" : ""
          }`}
        >
          {/* White base line */}
          <span
            className={`absolute left-1/2 top-1/2 z-10 h-0.75  -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white ${
              isSelected ? "w-9" : "w-8"
            }`}
          />

          {/* Black center line */}
          <span
            className={`absolute left-1/2 top-1/2 z-20 h-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black  ${
              isSelected ? "w-10" : "w-8"
            }`}
          />
        </span>
      )}
    </button>
  );
}
