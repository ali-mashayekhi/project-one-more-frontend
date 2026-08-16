import { Dispatch, SetStateAction } from "react";
import { ProductSize } from "../types/product-detail";
import SizeOption from "./sizeOption";

interface VariantSizeSelectorProps {
  sizes: ProductSize[];
  availableSizes: ProductSize[];
  selectedSize: ProductSize | null;
  setSelectedSize: Dispatch<SetStateAction<ProductSize | null>>;
}

export default function VariantSizeSelector({
  sizes,
  availableSizes,
  selectedSize,
  setSelectedSize,
}: VariantSizeSelectorProps) {
  return (
    <div className="flex flex-col gap-3 py-3 ">
      <div className="flex justify-between items-center">
        <p className="font-medium text-sm text-muted-foreground">سایز</p>
        <p className="text-xs text-muted-foreground">راهنمای سایز</p>
      </div>
      <div className="flex gap-4 flex-wrap">
        {sizes.map((size) => {
          const isAvailable = availableSizes.find((s) => s.id === size.id);

          return (
            <SizeOption
              size={size}
              key={size.id}
              selected={selectedSize?.id === size.id}
              onSelect={() => {
                if (selectedSize?.id === size.id) return;
                setSelectedSize(size);
              }}
              disabled={!isAvailable}
            />
          );
        })}
      </div>
    </div>
  );
}
