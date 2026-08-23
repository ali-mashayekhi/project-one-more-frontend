import { CartItem } from "../types/cart";
import CartItemCard from "./cartItemCard";

interface CartListProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function CartList({ cart, setCart }: CartListProps) {
  return (
    <div className="flex flex-col pb-24">
      {cart.map((item) => (
        <CartItemCard item={item} key={item.variantId} setCart={setCart} />
      ))}
    </div>
  );
}
