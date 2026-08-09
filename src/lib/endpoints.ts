export const endpoints = {
  users: {
    auth: {
      sendOtp: "users/auth/send-otp/",
      verifyOtp: "users/auth/verify-otp/",
      token: { refresh: "users/auth/token/refresh/" },
    },
  },
  products: { productDetail: "products/product-detail/" },
};
