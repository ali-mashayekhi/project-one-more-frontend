import { CartItem } from "@/features/cart/types/cart";

export interface CreateCheckoutSessionResponse {
  session_id: string;
}

export interface CreateCheckoutSessionPayload {
  items: {
    variant_id: number;
    quantity: number;
  }[];
}

export interface ShippingMethod {
  id: number;
  name: string;
  price: number;
  estimated_delivery: string;
}

export interface CheckoutSession {
  sessionId: string;
  items: CartItem[];
  shipping: CheckoutShipping | null;
}

export interface CheckoutShipping {
  first_name: string;
  last_name: string;
  phone_number: string;
  province: string;
  city: string;
  address: string;
  building_number: string;
  unit: string;
  postal_code: string;
  description: string;
  shipping_method: ShippingMethod;
}

export interface CheckoutPaymentResponse {
  payment_start_url: string;
}
