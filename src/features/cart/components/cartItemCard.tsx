import { convertToPersianDigits, formatMoney } from "@/lib/utils";
import {
  Cancel01Icon,
  Delete02Icon,
  Minus,
  Plus,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { saveCart, updateCartItemQuantity } from "../lib/storage";
import { CartItem } from "../types/cart";

interface CardItemCardProps {
  item: CartItem;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
export default function CartItemCard({ item, setCart }: CardItemCardProps) {
  const handleIncrease = () => {
    setCart((currentCart) => {
      const updatedCart = updateCartItemQuantity(
        currentCart,
        item.variantId,
        item.quantity + 1,
      );

      saveCart(updatedCart);

      return updatedCart;
    });
  };

  const handleDecrease = () => {
    setCart((currentCart) => {
      const updatedCart = updateCartItemQuantity(
        currentCart,
        item.variantId,
        item.quantity - 1,
      );

      saveCart(updatedCart);

      return updatedCart;
    });
  };

  const handleRemove = () => {
    setCart((currentCart) => {
      const updatedCart = currentCart.filter(
        (cartItem) => cartItem.variantId !== item.variantId,
      );

      saveCart(updatedCart);

      return updatedCart;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 border-b border-border p-5 relative">
      <button
        type="button"
        onClick={handleRemove}
        aria-label="حذف محصول"
        className="absolute left-5 top-5 z-10"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={24} />
      </button>

      <div className="flex gap-4 relative w-full">
        <div className="relative w-[40%] shrink-0 aspect-[0.8]">
          <Image
            src={item.style.image.image}
            alt={item.style.image.alt}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-between py-4">
          <div>
            <p className="text-2xs font-medium">{item.productSubtitle}</p>
            <h2 className="text-sm font-medium">{item.productName}</h2>
          </div>
          <div>
            <p className="font-medium text-xs">
              <span className="text-muted-foreground">سایز</span>{" "}
              <span className="mr-1">{item.size.name}</span>
            </p>
            <p className="font-medium text-xs">
              <span className="text-muted-foreground">رنگ</span>{" "}
              <span className="mr-1">
                {item.style.colors
                  .map((color) => {
                    return color.name;
                  })
                  .join(", ")}
              </span>
            </p>
            <p className="font-medium text-xs">
              <span className="text-muted-foreground">بسته</span>{" "}
              <span className="mr-1">{item.style.pack.name}</span>
            </p>
          </div>
          <div>
            <Link
              className="text-xs font-medium text-muted-foreground"
              href={`/product/${item.productSlug}`}
            >
              ویرایش
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-4 w-full items-center">
        <div className="w-[40%] shrink-0 h-8 border border-border rounded-md flex items-center px-3 justify-between">
          <button
            type="button"
            onClick={handleIncrease}
            aria-label="افزایش تعداد"
          >
            <HugeiconsIcon icon={Plus} size={20} />
          </button>
          <p className="text-sm">{convertToPersianDigits(item.quantity)}</p>
          <button
            type="button"
            onClick={handleDecrease}
            aria-label="کاهش تعداد"
          >
            <HugeiconsIcon
              icon={item.quantity === 1 ? Delete02Icon : Minus}
              size={20}
            />
          </button>
        </div>
        <p>
          <span className="text-xs text-muted-foreground">تومان</span>
          <span className="text-sm mr-1">{formatMoney(item.price)}</span>
        </p>
      </div>
    </div>
  );
}
