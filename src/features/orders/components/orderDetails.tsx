"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../services/get-order-details.client";
import {
  convertToPersianDigits,
  formatMoney,
  formatPersianDate,
} from "@/lib/utils";
import Image from "next/image";

const ORDER_STATUS_MAP = [
  { status: "compeleted", title: "تحویل داده شده" },
  { status: "paid", title: "در انتظار بررسی..." },
];

interface OrderDetailsProps {
  uuid: string;
}

export default function OrderDetails({ uuid }: OrderDetailsProps) {
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", uuid],
    queryFn: () => getOrderDetails(uuid),
  });

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="flex flex-col px-5">
      <div className="py-3 flex flex-col gap-2">
        <h2 className="font-medium text-sm">جزئیات سفارش</h2>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground text-xs">وضعیت سفارش</p>
            <p
              className={`px-3 py-1 rounded-md text-xs ${order.status === "completed" && "text-success bg-success/10"} ${order.status === "paid" && "text-warning bg-warning/10"}`}
            >
              {
                ORDER_STATUS_MAP.find((status_map) => {
                  return status_map.status === order.status;
                })?.title
              }
            </p>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground text-xs">کد پیگیری</p>
            <p>{convertToPersianDigits(order.order_number)}</p>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground text-xs">تاریخ ثبت سفارش</p>
            <p>{formatPersianDate(order.created_at)}</p>
          </div>
        </div>
      </div>

      <div className="py-3 flex flex-col gap-2">
        <h2 className="font-medium text-sm">اطلاعات ارسال</h2>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs font-medium">
            ارسال از طریق {order.shipping_method_name}
          </p>

          <div className="text-xs text-muted-foreground flex flex-col gap-1">
            <p className="flex gap-0.5">
              <span className="font-medium">{order.recipient_name}</span>
              <span>به شماره تماس</span>
              <span className="font-medium">
                {convertToPersianDigits(order.recipient_phone_number)}
              </span>
            </p>
            <p>
              {order.address} پلاک{" "}
              {convertToPersianDigits(order.building_number)} واحد{" "}
              {convertToPersianDigits(order.unit)}
            </p>
            <p>کد پستی {convertToPersianDigits(order.postal_code)}</p>
          </div>
        </div>
      </div>

      <div className="py-3 flex flex-col gap-2">
        <h2 className="font-medium text-sm">جزئیات پرداخت</h2>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground text-xs">
              مجموع سبد خرید ({convertToPersianDigits(order.items.length)} کالا)
            </p>
            <p>
              <span className="text-muted-foreground text-xs">تومان </span>
              <span className="text-primary font-medium text-sm">
                {formatMoney(order.subtotal)}
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground text-xs">هزینه ارسال</p>
            <p>
              <span className="text-muted-foreground text-xs">تومان </span>
              <span className="text-primary font-medium text-sm">
                {formatMoney(order.shipping_cost)}
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-muted-foreground text-xs">مبلغ پرداخت شده</p>
            <p>
              <span className="text-muted-foreground text-xs">تومان </span>
              <span className="text-primary font-medium text-sm">
                {formatMoney(order.total_amount)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-2">
        <h2 className="text-sm font-medium">خلاصه سبد خرید</h2>
        <div className="flex flex-col gap-3">
          {order.items.map((orderItem) => {
            return (
              <div className="flex gap-3" key={orderItem.id}>
                <div className="relative aspect-[0.8] w-16">
                  <Image
                    src={orderItem.image}
                    alt={orderItem.image}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col justify-center w-full gap-1">
                  <div className="text-sm font-medium flex justify-between">
                    <p>{orderItem.product_title}</p>
                    <p>
                      {" "}
                      <span className="text-muted-foreground text-xs">
                        تومان{" "}
                      </span>
                      <span className="text-primary font-medium text-sm">
                        {formatMoney(orderItem.unit_price * orderItem.quantity)}
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {orderItem.colors.length === 1
                      ? orderItem.colors[0]
                      : orderItem.colors.map((color) => color).join("، ")}{" "}
                    - سایز {orderItem.sizes[0]} - بسته {orderItem.pack_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {convertToPersianDigits(orderItem.quantity)} عدد
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
