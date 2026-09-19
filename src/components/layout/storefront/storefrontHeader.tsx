import {
  ShoppingBasket01Icon,
  UserCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function StorefrontHeader() {
  return (
    <div className="sticky top-0 z-10 bg-background flex items-center justify-between px-5 h-12 border-b border-border">
      <Link href={"/cart"}>
        <HugeiconsIcon icon={ShoppingBasket01Icon} size={24} />
      </Link>
      <Link href={"/"}>The LOGO</Link>
      <Link href={"/profile/personal-info"}>
        <HugeiconsIcon icon={UserCircle02Icon} size={24} />
      </Link>
    </div>
  );
}
