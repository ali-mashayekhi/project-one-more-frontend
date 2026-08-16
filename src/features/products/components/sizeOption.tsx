import { ProductSize } from "../types/product-detail";

interface SizeOptionProps {
  size: ProductSize;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export default function SizeOption({
  size,
  selected,
  onSelect,
  disabled = false,
}: SizeOptionProps) {
  return (
    <button
      type="button"
      className={`relative flex h-10 w-14 items-center justify-center overflow-hidden rounded-md border text-xs ${
        selected ? "border-primary bg-card font-medium" : "border-border"
      } ${disabled ? "text-muted-foreground" : ""}`}
      onClick={onSelect}
    >
      <span className="relative z-10 bg-card leading-none pt-0.5">
        {size.name}
      </span>

      {disabled && (
        <span
          className={`absolute left-1/2 top-1/2 z-0 h-px w-[calc(100%+12px)] -translate-x-1/2 -translate-y-1/2 rotate-[-35deg]  ${
            selected ? "bg-primary" : "bg-border"
          }`}
        />
      )}
    </button>
  );
}
