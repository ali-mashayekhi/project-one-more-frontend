import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { convertToEnglishDigits, convertToPersianDigits } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { OtpForm, otpSchema } from "../schemas/login";
import { verifyOtp } from "../services/verify-otp.client";
import { LoginStep } from "../types/auth";

const getSafeRedirect = (next: string | null) => {
  if (!next) return "/";

  if (next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }

  return "/";
};

interface OtpVerificationStepProps {
  setPage: Dispatch<SetStateAction<LoginStep>>;
  phoneNumber: string;
}

export default function OtpVerificationStep({
  setPage,
  phoneNumber,
}: OtpVerificationStepProps) {
  const router = useRouter();

  const form = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));

      const next = new URLSearchParams(window.location.search).get("next");

      router.replace(getSafeRedirect(next));
    },
  });

  const onSubmit = (data: OtpForm) => {
    verifyOtpMutation.mutate({
      phone_number: phoneNumber,
      otp: data.otp,
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <p className="text-xs text-secondary-foreground">
        کد ۶ رقمی ارسال شده به شماره{" "}
        <span className="text-primary font-medium">
          {convertToPersianDigits(phoneNumber)}
        </span>{" "}
        را وارد کنید
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Controller
          name="otp"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputOTP
                {...field}
                value={convertToPersianDigits(field.value)}
                onChange={(value) => {
                  const englishValue = convertToEnglishDigits(value);
                  field.onChange(englishValue);
                  if (englishValue.length === 6 && !verifyOtpMutation.isPending)
                    form.handleSubmit(onSubmit)();
                }}
                maxLength={6}
                containerClassName="justify-center"
                aria-invalid={fieldState.invalid}
                disabled={verifyOtpMutation.isPending}
              >
                <InputOTPGroup dir="ltr">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <div className="flex items-center justify-between">
          <button
            className="text-xs underline"
            onClick={() => {
              return setPage("phone");
            }}
          >
            ویرایش شماره موبایل
          </button>
          <button className="text-xs underline">ارسال مجدد</button>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={verifyOtpMutation.isPending}
        >
          ادامه
        </Button>
      </form>
    </div>
  );
}
