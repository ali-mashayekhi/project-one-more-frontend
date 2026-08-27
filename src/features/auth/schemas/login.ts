import { z } from "zod";

export const phoneNumberSchema = z.object({
  phone_number: z
    .string()
    .length(11, "شماره همراه باید ۱۱ رقم باشد")
    .startsWith("09", "شماره همراه باید با ۰۹ شروع شود"),
});

export type PhoneNumberForm = z.infer<typeof phoneNumberSchema>;

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "کد تایید باید ۶ رقم باشد"),
});

export type OtpForm = z.infer<typeof otpSchema>;
