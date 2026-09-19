export interface Order {
  id: number;
  order_number: string;
  status: "paid" | "completed";
  created_at: string;
  total_amount: number;
  items: { image: string }[];
}

export interface OrderDetails {
  id: string;
  order_number: string;
  created_at: string;

  status: string;

  recipient_name: string;
  recipient_phone_number: string;

  address: string;
  unit: string;
  building_number: string;
  postal_code: string;

  shipping_method_name: string;
  shipping_cost: number;

  subtotal: number;
  total_amount: number;

  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_title: string;
  pack_name: string;
  image: string;
  unit_price: number;
  quantity: number;
  colors: string[];
  sizes: string[];
}
