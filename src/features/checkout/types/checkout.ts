export interface CreateCheckoutSessionResponse {
  session_id: string;
}

export interface CreateCheckoutSessionPayload {
  items: {
    variant_id: number;
    quantity: number;
  }[];
}
