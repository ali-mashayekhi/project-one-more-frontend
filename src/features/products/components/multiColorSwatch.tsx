import { Dispatch, SetStateAction } from "react";
import { ProductStyle, StyleColor, StylePack } from "../types/product-detail";

interface MultiColorSwatchProps {
  colors: StyleColor[];
  selectedColor: StyleColor[];
  setSelectedColor: Dispatch<SetStateAction<StyleColor[]>>;
  available: boolean;
  productStyles: ProductStyle[];
  selectedPack: StylePack;
  setSelectedStyle: Dispatch<SetStateAction<ProductStyle>>;
}

const getColorKey = (colors: StyleColor[]) =>
  colors
    .map((color) => color.id)
    .sort()
    .join("-");

export default function MultiColorSwatch({
  colors,
  selectedColor,
  setSelectedColor,
  available,
  productStyles,
  selectedPack,
  setSelectedStyle,
}: MultiColorSwatchProps) {
  const isSelected =
    selectedColor.length === colors.length &&
    selectedColor.every((color) =>
      colors.some((selectedColor) => selectedColor.id === color.id),
    );

  const slice = 360 / colors.length;

  const gradient = colors
    .map((color, index) => {
      const start = index * slice;
      const end = (index + 1) * slice;

      return `${color.hex_code} ${start}deg ${end}deg`;
    })
    .join(", ");

  return (
    <button
      type="button"
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border ${
        isSelected ? "border-primary" : "border-transparent"
      }`}
      onClick={() => {
        setSelectedColor(colors);

        const style = productStyles.find(
          (style) =>
            style.pack.id === selectedPack.id &&
            getColorKey(style.colors) === getColorKey(colors),
        );

        if (style) {
          setSelectedStyle(style);
        }
      }}
    >
      <span
        className="h-8 w-8 rounded-full"
        style={{
          background: `conic-gradient(${gradient})`,
        }}
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
            className={`absolute left-1/2 top-1/2 z-20 h-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black ${
              isSelected ? "w-10" : "w-8"
            }`}
          />
        </span>
      )}
    </button>
  );
}
