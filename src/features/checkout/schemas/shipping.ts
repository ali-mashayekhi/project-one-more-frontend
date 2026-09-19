import { z } from "zod";

export const checkoutShippingSchema = z.object({
  first_name: z
    .string()
    .min(1, "نام را وارد کنید")
    .max(100, "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),

  last_name: z
    .string()
    .min(1, "نام خانوادگی را وارد کنید")
    .max(100, "نام خانوادگی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),

  phone_number: z.string().regex(/^09\d{9}$/, "شماره همراه معتبر نیست"),

  province: z.string().min(1, "استان را وارد کنید").max(100),

  city: z.string().min(1, "شهر را وارد کنید").max(100),

  address: z.string().min(1, "آدرس را وارد کنید"),

  building_number: z.string().min(1, "پلاک را وارد کنید").max(20),

  unit: z.string().max(20).optional(),

  postal_code: z.string().min(1, "کد پستی را وارد کنید").max(20),

  description: z.string().optional(),

  shipping_method_id: z.number().int().positive("روش ارسال را انتخاب کنید"),
});

export type CheckoutShippingForm = z.infer<typeof checkoutShippingSchema>;
