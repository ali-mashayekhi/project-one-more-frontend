export const endpoints = {
  users: {
    auth: {
      sendOtp: "users/auth/send-otp/",
      verifyOtp: "users/auth/verify-otp/",
      token: { refresh: "users/auth/token/refresh/" },
    },
    me: "users/me/",
  },
  products: { productDetail: "products/product-detail/" },
  checkout: {
    sessions: "checkout/sessions/",
    shippingMethods: "checkout/shipping-methods/",
    shipping: (sessionId: string) => `checkout/sessions/${sessionId}/shipping/`,
    payment: (sessionId: string) => `checkout/sessions/${sessionId}/payment/`,
  },
  orders: {
    orders: "orders/",
  },
};
