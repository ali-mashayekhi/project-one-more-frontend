import { Dispatch, SetStateAction } from "react";
import { ProductStyle, StyleColor, StylePack } from "../types/product-detail";
import PackOption from "./packOption";

interface VariantPackSelectorProps {
  productStyles: ProductStyle[];
  availablePacks: StylePack[];
  selectedPack: StylePack;
  setSelectedPack: Dispatch<SetStateAction<StylePack>>;
  selectedColor: StyleColor[];
  setSelectedStyle: Dispatch<SetStateAction<ProductStyle>>;
}

const getColorKey = (colors: StyleColor[]) =>
  colors
    .map((color) => color.id)
    .sort()
    .join("-");

export default function VariantPackSelector({
  productStyles,
  availablePacks,
  selectedPack,
  setSelectedPack,
  selectedColor,
  setSelectedStyle,
}: VariantPackSelectorProps) {
  const uniquePacks = Array.from(
    new Map(productStyles.map((style) => [style.pack.id, style.pack])).values(),
  );
  return (
    <div className="flex flex-col gap-3 py-3 ">
      <p className="font-medium text-sm text-muted-foreground">بسته</p>
      <div className="flex gap-4">
        {uniquePacks.map((pack) => {
          const isAvailable = availablePacks.find((p) => p.id === pack.id);
          return (
            <PackOption
              key={pack.id}
              pack={pack}
              selected={selectedPack?.id === pack.id}
              onSelect={() => {
                if (selectedPack?.id === pack.id) return;

                setSelectedPack(pack);

                const style = productStyles.find(
                  (style) =>
                    style.pack.id === pack.id &&
                    getColorKey(style.colors) === getColorKey(selectedColor),
                );

                if (style) {
                  setSelectedStyle(style);
                }
              }}
              disabled={!isAvailable}
            />
          );
        })}
      </div>
    </div>
  );
}
