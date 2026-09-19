import { CheckoutSession } from "../types/checkout";

export const CHECKOUT_SESSION_STORAGE_KEY = "checkout-session";

export function getCheckoutSession(): CheckoutSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedSession = localStorage.getItem(CHECKOUT_SESSION_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession) as CheckoutSession;
  } catch {
    localStorage.removeItem(CHECKOUT_SESSION_STORAGE_KEY);
    return null;
  }
}

export function clearCheckoutSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("checkout-session");
}
