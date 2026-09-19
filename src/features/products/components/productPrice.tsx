import { formatMoney } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
}

export default function ProductPrice({ price }: ProductPriceProps) {
  return (
    <div className="flex justify-end pt-2 pb-1 px-5">
      <p className="text-lg font-medium">
        <span className="text-sm text-muted-foreground font-normal">تومان</span>{" "}
        {formatMoney(price)}
      </p>
    </div>
  );
}
