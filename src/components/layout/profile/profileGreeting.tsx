"use client";

import { getStoredAuth } from "@/features/auth/lib/storage";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileGreeting() {
  const router = useRouter();
  const pathname = usePathname();
  const storedUser = getStoredAuth();

  useEffect(() => {
    if (!storedUser) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [router, pathname, storedUser]);

  if (!storedUser) {
    return null;
  }
  if (storedUser?.user)
    return (
      <p className="px-5 py-3 font-medium text-sm">
        سلام، {storedUser.user.first_name || storedUser.user.last_name || ""}
      </p>
    );
  return <p className="px-5 py-3 font-medium text-sm">سلام</p>;
}
