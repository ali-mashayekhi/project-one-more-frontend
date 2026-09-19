import PaymentStep from "@/features/checkout/components/paymentStep";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}
export default async function Page({ params }: PageProps) {
  const { uuid } = await params;
  return <PaymentStep sessionId={uuid} />;
}
