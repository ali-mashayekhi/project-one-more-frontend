// features/auth/lib/storage.ts

import { User } from "@/features/users/types/user";
import { StoredAuth } from "../types/auth";

export function getStoredAuth(): StoredAuth | null {
  if (typeof window === "undefined") return null;

  const storedAuth = localStorage.getItem("user");

  if (!storedAuth) return null;

  try {
    return JSON.parse(storedAuth) as StoredAuth;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export function updateStoredUser(data: Pick<User, "first_name" | "last_name">) {
  const storedAuth = getStoredAuth();

  if (!storedAuth) return;

  localStorage.setItem(
    "user",
    JSON.stringify({
      ...storedAuth,
      user: {
        ...storedAuth.user,
        ...data,
      },
    }),
  );
}
