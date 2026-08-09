import { endpoints } from "./endpoints";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiOptions extends RequestInit {
  auth?: boolean;
}

interface StoredUser {
  access: string;
  refresh: string;
}

interface RefreshResponse {
  access: string;
  refresh?: string;
}

function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;

  const storedUser = localStorage.getItem("user");

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as StoredUser;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

function setStoredTokens(currentUser: StoredUser, tokens: RefreshResponse) {
  localStorage.setItem(
    "user",
    JSON.stringify({
      ...currentUser,
      access: tokens.access,
      refresh: tokens.refresh ?? currentUser.refresh,
    }),
  );
}

async function refreshAccessToken(): Promise<string> {
  if (typeof window === "undefined")
    throw new Error("Token refresh is only available on the client");

  const user = getStoredUser();

  if (!user?.refresh) throw new Error("No refresh token available");

  const response = await fetch(
    `${BASE_URL}${endpoints.users.auth.token.refresh}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: user.refresh,
      }),
    },
  );

  if (!response.ok) {
    localStorage.removeItem("user");
    throw new Error("Token refresh failed");
  }

  const tokens = (await response.json()) as RefreshResponse;

  setStoredTokens(user, tokens);

  return tokens.access;
}

function createHeaders(headers?: HeadersInit, accessToken?: string) {
  const result = new Headers(headers);

  result.set("Content-Type", "application/json");

  if (accessToken) {
    result.set("Authorization", `Bearer ${accessToken}`);
  }

  return result;
}

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { auth = false, ...fetchOptions } = options;

  let accessToken: string | undefined;

  if (auth && typeof window !== "undefined")
    accessToken = getStoredUser()?.access;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: createHeaders(fetchOptions.headers, accessToken),
  });

  // Normal response
  if (response.status !== 401 || !auth) {
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  // Authenticated request returned 401.
  const newAccessToken = await refreshAccessToken();

  // Retry the original request once.
  const retryResponse = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: createHeaders(fetchOptions.headers, newAccessToken),
  });

  if (!retryResponse.ok) {
    throw new Error(`API request failed: ${retryResponse.status}`);
  }

  return retryResponse.json();
}
