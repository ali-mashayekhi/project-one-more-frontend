"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVIGATION_TABS = [
  { title: "اطلاعات شخصی", path: "/profile/personal-info" },
  { title: "سفارشات", path: "/profile/orders" },
];

export default function ProfileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 border-b px-5 py-2 text-muted-foreground text-sm">
      {NAVIGATION_TABS.map((tab) => {
        return (
          <Link
            href={tab.path}
            key={tab.path}
            className={
              pathname === tab.path ? "text-primary font-medium underline" : ""
            }
          >
            {tab.title}
          </Link>
        );
      })}
    </nav>
  );
}
