export interface CurrentUser {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string | null;
  avatar: string | null;
  birthday: string | null;
}

export interface UpdateCurrentUserData {
  first_name?: string;
  last_name?: string;
  email?: string | null;
  avatar?: string | null;
  birthday?: string | null;
}
