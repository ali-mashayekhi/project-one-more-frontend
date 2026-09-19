import PaymentSuccess from "@/features/checkout/components/payment-result/paymentSuccess";

interface PaymentSuccessPageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function Page({ params }: PaymentSuccessPageProps) {
  const { uuid } = await params;

  return <PaymentSuccess uuid={uuid} />;
}
