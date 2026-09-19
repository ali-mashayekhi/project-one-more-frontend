// features/users/services/update-current-user.client.ts

import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { CurrentUser, UpdateCurrentUserData } from "../types/currentUser";

export async function updateCurrentUser(
  data: Partial<UpdateCurrentUserData>,
): Promise<CurrentUser> {
  return api<CurrentUser>(endpoints.users.me, {
    method: "PATCH",
    body: JSON.stringify(data),
    auth: true,
  });
}
