import ShippingStep from "@/features/checkout/components/shippingStep";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}
export default async function Page({ params }: PageProps) {
  const { uuid } = await params;
  return <ShippingStep sessionId={uuid} />;
}
