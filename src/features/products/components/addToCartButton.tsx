import { Button } from "@/components/ui/button";
import { ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ProductSize,
  ProductVariant,
  StyleColor,
  StyleImage,
  StylePack,
} from "../types/product-detail";
import { CartItem } from "@/features/cart/types/cart";
import { CART_STORAGE_KEY } from "@/features/cart/lib/storage";

interface AddToBasketButtonProps {
  selectedVariant: ProductVariant | null;
  selectedSize: ProductSize | null;
  selectedColor: StyleColor[];
  selectedPack: StylePack;
  variantImage: StyleImage;
}

export default function AddToCartButton({
  selectedVariant,
  selectedSize,
  selectedColor,
  selectedPack,
  variantImage,
}: AddToBasketButtonProps) {
  const addToCart = () => {
    if (!selectedVariant || !selectedSize) return;

    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cart.find(
      (item) => item.variantId === selectedVariant.id,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const cartItem: CartItem = {
        variantId: selectedVariant.id,
        sku: selectedVariant.sku,

        style: {
          colors: selectedColor,
          image: variantImage,
          pack: selectedPack,
        },

        size: selectedSize,
        price: selectedVariant.price,
        quantity: 1,
      };

      cart.push(cartItem);
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  };
  return (
    <div className="px-5">
      <Button
        className="w-full mb-10"
        size="lg"
        disabled={!selectedSize || !selectedVariant}
        onClick={addToCart}
      >
        {!!selectedVariant && (
          <>
            <HugeiconsIcon icon={ShoppingCart02Icon} className="size-5" />
            افزودن به سبد خرید
          </>
        )}
        {!selectedSize && (
          <>
            <HugeiconsIcon icon={ShoppingCart02Icon} className="size-5" />
            ابتدا سایز انتخاب کنید
          </>
        )}
        {!!selectedSize && !selectedVariant && (
          <>
            <HugeiconsIcon icon={ShoppingCart02Icon} className="size-5" />
            موجود نمیباشد
          </>
        )}
      </Button>
    </div>
  );
}
