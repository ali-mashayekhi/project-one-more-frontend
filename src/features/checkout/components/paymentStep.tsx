"use client";

import { Button } from "@/components/ui/button";
import { convertToPersianDigits, formatMoney } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { CHECKOUT_SESSION_STORAGE_KEY } from "../lib/storage";
import { checkoutPayment } from "../services/checkout-payment.client";
import { CheckoutSession } from "../types/checkout";

interface PaymentStepProps {
  sessionId: string;
}
export default function PaymentStep({ sessionId }: PaymentStepProps) {
  const checkoutSession = getCheckoutSession(sessionId);

  const paymentMutation = useMutation({
    mutationFn: () => checkoutPayment(sessionId),
    onSuccess: (data) => {
      window.location.href = data.payment_start_url;
    },
  });

  if (!checkoutSession) {
    return <div>اطلاعات پرداخت پیدا نشد</div>;
  }

  return (
    <div className="flex flex-col gap-5 py-4 px-5">
      {/* Checkout Details */}
      <div className="flex flex-col gap-3 ">
        <h2 className="text-sm font-medium">جزئیات پرداخت</h2>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="font-medium text-xs text-muted-foreground">
              مجموع سبد خرید (
              {convertToPersianDigits(
                checkoutSession.items.reduce(
                  (acc, item) => acc + item.quantity,
                  0,
                ),
              )}{" "}
              کالا)
            </p>
            <p>
              <span className="text-muted-foreground text-xs">تومان </span>
              <span className="text-primary font-medium text-sm">
                {formatMoney(
                  checkoutSession.items.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  ),
                )}{" "}
              </span>
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-medium text-xs text-muted-foreground">
              هزینه ارسال (از طریق{" "}
              {checkoutSession.shipping?.shipping_method.name})
            </p>
            <p>
              <span className="text-muted-foreground text-xs">تومان </span>
              <span className="text-primary font-medium text-sm">
                {formatMoney(
                  checkoutSession?.shipping?.shipping_method?.price || 0,
                )}{" "}
              </span>
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-medium text-xs text-muted-foreground">
              مبلغ قابل پرداخت
            </p>
            <p>
              <span className="text-muted-foreground text-xs">تومان </span>
              <span className="text-primary font-medium text-sm">
                {formatMoney(
                  checkoutSession.items.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  ) + (checkoutSession?.shipping?.shipping_method?.price || 0),
                )}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Gateway */}
      <div className="flex flex-col gap-3 ">
        <h2 className="text-sm font-medium">درگاه پرداخت</h2>
        <div className="flex justify-between py-2 px-3 rounded-md items-center border border-primary bg-card">
          <p className="font-medium text-sm">درگاه بانک سامان</p>
          <Image
            src="/images/checkout/sep.webp"
            width={32}
            height={32}
            alt="درگاه سامان"
          />
        </div>
      </div>

      {/* Gateway */}
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-between">
          <h2 className="text-sm font-medium">اطلاعات ارسال</h2>
          <Link
            href={`/checkout/shipping/${sessionId}`}
            className="underline text-xs text-muted-foreground"
          >
            تغییر اطلاعات
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <p className="font-medium">
            <span>ارسال از طریق </span>
            {checkoutSession.shipping?.shipping_method?.name} (
            {convertToPersianDigits(
              checkoutSession.shipping?.shipping_method?.estimated_delivery ||
                "",
            )}
            )
          </p>
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-medium">
                {checkoutSession.shipping?.first_name}{" "}
                {checkoutSession.shipping?.last_name}
              </span>
              <span> به شماره تماس</span>{" "}
              <span className="font-medium">
                {convertToPersianDigits(
                  checkoutSession.shipping?.phone_number || "",
                )}
              </span>
            </p>
            <p>
              {checkoutSession.shipping?.province}{" "}
              {checkoutSession.shipping?.city}{" "}
              {convertToPersianDigits(checkoutSession.shipping?.address || "")}{" "}
              پلاک{" "}
              {convertToPersianDigits(
                checkoutSession.shipping?.building_number || "",
              )}{" "}
              واحد{" "}
              {convertToPersianDigits(checkoutSession.shipping?.unit || "")}
            </p>
            <p>
              کد پستی{" "}
              {convertToPersianDigits(
                checkoutSession.shipping?.postal_code || "",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* cart summary */}
      <div className="flex flex-col gap-3 pb-2">
        <h2 className="text-sm font-medium">خلاصه سبد خرید</h2>
        <div className="flex flex-col gap-3">
          {checkoutSession.items.map((item) => {
            return (
              <div className="flex gap-3" key={item.variantId}>
                <div className="relative aspect-[0.8] w-16">
                  <Image
                    src={item.style.image.image}
                    alt={item.style.image.alt}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col justify-center w-full gap-1">
                  <div className="text-sm font-medium flex justify-between">
                    <p>{item.productName}</p>
                    <p>
                      {" "}
                      <span className="text-muted-foreground text-xs">
                        تومان{" "}
                      </span>
                      <span className="text-primary font-medium text-sm">
                        {formatMoney(item.price * item.quantity)}
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.style.colors.length === 1
                      ? item.style.colors[0].name
                      : item.style.colors
                          .map((color) => color.name)
                          .join("، ")}{" "}
                    - سایز {item.size.name} - بسته {item.style.pack.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {convertToPersianDigits(item.quantity)} عدد
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          با پرداخت و تکمیل خرید موافقت خود را با قوانین و شرایط بازگشت محصول
          اعلام می‌نمایم.
        </p>

        <div className="pt-2 pb-6">
          <Button
            className={"w-full"}
            size={"lg"}
            onClick={() => paymentMutation.mutate()}
          >
            پرداخت (
            {formatMoney(
              checkoutSession.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0,
              ) + (checkoutSession?.shipping?.shipping_method?.price || 0),
            )}
            )
          </Button>
        </div>
      </div>
    </div>
  );
}

function getCheckoutSession(sessionId: string): CheckoutSession | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(CHECKOUT_SESSION_STORAGE_KEY);

  if (!stored) return null;

  try {
    const checkoutSession = JSON.parse(stored) as CheckoutSession;

    if (checkoutSession.sessionId !== sessionId) {
      return null;
    }

    return checkoutSession;
  } catch {
    localStorage.removeItem(CHECKOUT_SESSION_STORAGE_KEY);
    return null;
  }
}
