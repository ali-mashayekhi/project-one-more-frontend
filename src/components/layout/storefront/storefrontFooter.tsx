import {
  InstagramIcon,
  PinterestIcon,
  TelegramIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function StorefrontFooter() {
  return (
    <div className="flex flex-col gap-6 items-center px-5 pb-5">
      <div className="border-b flex flex-col gap-4 items-center w-full pb-6">
        <div className="max-w-52 flex flex-col items-center gap-1">
          <h3 className="text-2xl">ANAHI</h3>
          <p className="text-sm text-muted-foreground text-center">
            برای چیزهایی که هر روز با تو هستند، با دقت بیشتری انتخاب کن.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <HugeiconsIcon icon={InstagramIcon} size={20} />
          <HugeiconsIcon icon={TelegramIcon} size={20} />
          <HugeiconsIcon icon={WhatsappIcon} size={20} />
          <HugeiconsIcon icon={PinterestIcon} size={20} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Link href={"#"} className="text-sm">
          سوالات متداول
        </Link>
        <Link href={"#"} className="text-sm">
          درباره آناهی
        </Link>
        <Link href={"#"} className="text-sm">
          قوانین و مقررات
        </Link>
        <Link href={"#"} className="text-sm">
          تماس با ما
        </Link>
      </div>

      <p className="text-xs text-muted-foreground" dir="ltr">
        © 2026 Anahi. All rights reserved.
      </p>
    </div>
  );
}
