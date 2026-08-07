import Layout from "@/components/layout/layout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
