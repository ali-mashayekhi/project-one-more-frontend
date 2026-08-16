import StorefrontLayout from "@/components/layout/storefront/storefrontLayout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <StorefrontLayout>{children}</StorefrontLayout>;
}
