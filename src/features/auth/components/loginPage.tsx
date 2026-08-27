"use client";

import { useState } from "react";
import { LoginStep } from "../types/auth";
import OtpVerificationStep from "./otpVerificationStep";
import PhoneNumberStep from "./phoneNumberStep";

export default function LoginPage() {
  const [page, setPage] = useState<LoginStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-3 px-5 items-center justify-center pt-20">
      <h1 className="text-xl font-medium">ورود یا ثبت نام</h1>
      {page === "phone" && (
        <PhoneNumberStep setPage={setPage} setPhoneNumber={setPhoneNumber} />
      )}
      {page === "verify" && phoneNumber && (
        <OtpVerificationStep setPage={setPage} phoneNumber={phoneNumber} />
      )}
    </div>
  );
}
