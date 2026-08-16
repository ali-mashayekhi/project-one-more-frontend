import { formatMoney } from "@/lib/utils";
import React from "react";

interface ProductPriceProps {
  price: number;
}

export default function ProductPrice({ price }: ProductPriceProps) {
  return (
    <div className="flex justify-end py-4 px-5">
      <p className="text-lg font-medium">
        <span className="text-sm text-muted-foreground font-normal"></span>{" "}
        {formatMoney(price)}
      </p>
    </div>
  );
}
