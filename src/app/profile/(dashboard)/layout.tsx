import ProfileLayout from "@/components/layout/profile/profileLayout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
