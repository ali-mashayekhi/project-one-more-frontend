"use client";

import { Button } from "@/components/ui/button";
import { getCheckoutSession } from "@/features/checkout/lib/storage";
import Link from "next/link";

export default function PaymentFailure() {
  const session = getCheckoutSession();

  const paymentUrl = session?.sessionId
    ? `/checkout/payment/${session?.sessionId}`
    : "/";

  return (
    <div className="px-5 flex flex-col justify-center items-center py-9 gap-9">
      <div className="text-sm font-medium text-destructive bg-destructive/10 rounded-md px-6 py-2">
        پرداخت ناموفق
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>پرداخت شما موفقیت آمیز نبود!</p>
        <p>
          برای تلاش مجدد و ادامه پرداخت میتوانید از دکمه زیر استفاده نمایید.
        </p>
      </div>

      <Link href={paymentUrl}>
        <Button size="sm" className="w-28">
          ادامه خرید
        </Button>
      </Link>
    </div>
  );
}
