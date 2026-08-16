import { StylePack } from "../types/product-detail";

interface PackOptionProps {
  pack: StylePack;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export default function PackOption({
  pack,
  selected,
  onSelect,
  disabled = false,
}: PackOptionProps) {
  return (
    <button
      type="button"
      className={`relative flex h-10 w-16 items-center justify-center overflow-hidden rounded-md border bg-card text-xs ${
        selected ? "border-primary font-medium" : "border-border"
      } ${disabled ? "text-muted-foreground" : ""}`}
      onClick={onSelect}
    >
      <span className="relative z-10 bg-card px-1">{pack.name}</span>

      {disabled && (
        <span
          className={`absolute left-1/2 top-1/2 z-0 h-px w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-32deg] ${
            selected ? "bg-primary" : "bg-border"
          }`}
        />
      )}
    </button>
  );
}
