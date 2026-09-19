import { CartItem } from "../types/cart";

export const CART_STORAGE_KEY = "product-cart";

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function updateCartItemQuantity(
  cart: CartItem[],
  variantId: number,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return cart.filter((item) => item.variantId !== variantId);
  }

  return cart.map((item) =>
    item.variantId === variantId ? { ...item, quantity } : item,
  );
}
