// features/users/services/get-current-user.client.ts

import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { CurrentUser } from "../types/currentUser";

export async function getCurrentUser(): Promise<CurrentUser> {
  // return api<CurrentUser>(endpoints.users.me, { method: "GET", auth: true });
  return api<CurrentUser>(endpoints.users.me, { method: "GET", auth: true });
}
