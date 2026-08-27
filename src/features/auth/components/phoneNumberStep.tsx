import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { PhoneNumberForm, phoneNumberSchema } from "../schemas/login";
import { LoginStep } from "../types/auth";
import { convertToEnglishDigits, convertToPersianDigits } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../services/sent-otp.client";

interface PhoneNumberStepProps {
  setPage: Dispatch<SetStateAction<LoginStep>>;
  setPhoneNumber: Dispatch<SetStateAction<string | null>>;
}

export default function PhoneNumberStep({
  setPage,
  setPhoneNumber,
}: PhoneNumberStepProps) {
  const form = useForm<PhoneNumberForm>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phone_number: "",
    },
  });

  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      setPage("verify");
    },
  });

  const onSubmit = (data: PhoneNumberForm) => {
    setPhoneNumber(data.phone_number);
    sendOtpMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <p className="text-xs text-secondary-foreground">
        شماره همراه خود را وارد کنید
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Controller
          name="phone_number"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                value={convertToPersianDigits(field.value)}
                onChange={(event) => {
                  field.onChange(convertToEnglishDigits(event.target.value));
                }}
                aria-invalid={fieldState.invalid}
                placeholder="شماره همراه"
                inputMode="numeric"
                type="tel"
                dir="ltr"
                className="placeholder:text-right placeholder:text-xs"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Button type="submit" className="w-full">
          ادامه
        </Button>
      </form>
      <p className="text-xs text-secondary-foreground w-full text-right">
        ورود یا ثبت نام به معنای پذیرش{" "}
        <span className="text-primary font-medium underline">قوانین سایت</span>{" "}
        میباشد.
      </p>
    </div>
  );
}
