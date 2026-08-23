"use client";

import { convertToPersianDigits, formatMoney } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CART_STORAGE_KEY } from "../lib/storage";
import { CartItem } from "../types/cart";
import CartList from "./cartList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/features/checkout/services/create-checkout-session.client";
import { ApiError } from "@/lib/api";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const createSessionMutation = useMutation({
    mutationFn: createCheckoutSession,

    onSuccess: (data) => {
      router.push(`/checkout/${data.session_id}`);
    },

    onError: (error) => {
      if (error instanceof ApiError && error.status === 401) {
        router.push("/login?next=/cart");
      }
    },
  });

  const handleContinue = () => {
    createSessionMutation.mutate({
      items: cart.map((item) => ({
        variant_id: item.variantId,
        quantity: item.quantity,
      })),
    });
  };

  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch {
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }

      setIsLoaded(true);
    };

    queueMicrotask(loadCart);
  }, []);

  if (!isLoaded) {
    return null; // or your cart skeleton
  }

  return (
    <>
      <section className="flex items-center gap-2 mt-6 px-5">
        <h1 className="text-sm">سبد خرید</h1>
        <p className="text-xs font-medium text-muted-foreground">
          (
          {convertToPersianDigits(
            cart.reduce((total, item) => total + item.quantity, 0),
          )}
          )
        </p>
      </section>

      <CartList cart={cart} setCart={setCart} />

      <div className="px-5 py-2 flex flex-col w-full gap-1 fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="py-1 flex justify-between">
          <p className="text-sm font-medium">مجموع خرید</p>
          <p>
            <span className="text-xs text-muted-foreground">تومان</span>
            <span className="text-sm mr-1">
              {formatMoney(
                cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0,
                ),
              )}
            </span>
          </p>
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={handleContinue}
          disabled={createSessionMutation.isPending}
        >
          ادامه خرید
        </Button>
      </div>
    </>
  );
}
