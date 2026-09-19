"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { clearCheckoutSession } from "../../lib/storage";

interface PaymentSuccessProps {
  uuid: string;
}

export default function PaymentSuccess({ uuid }: PaymentSuccessProps) {
  useEffect(() => {
    clearCheckoutSession();
  }, []);

  return (
    <div className="px-5 flex flex-col justify-center items-center py-9 gap-9">
      <div className="text-sm font-medium text-success bg-success/10 rounded-md px-6 py-2">
        پرداخت موفق
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>
          خرید شما با موفقیت انجام شد، برای مشاهده وضعیت و جزئیات سفارش
          می‌توانید به پروفایل کاربری خود مراجعه نمایید.
        </p>
      </div>

      <Link href={`/profile/orders/${uuid}`}>
        <Button size="sm" className="w-36">
          مشاهده سفارش
        </Button>
      </Link>
    </div>
  );
}
