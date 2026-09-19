import OrderDetails from "@/features/orders/components/orderDetails";

interface OrderDetailsPageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function Page({ params }: OrderDetailsPageProps) {
  const { uuid } = await params;

  return <OrderDetails uuid={uuid} />;
}
