"use client";

import { getMyOrders } from "@/features/orders/services/get-my-orders.client";
import {
  convertToPersianDigits,
  formatMoney,
  formatPersianDate,
} from "@/lib/utils";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const ORDER_STATUS_MAP = [
  { status: "compeleted", title: "تحویل داده شده" },
  { status: "paid", title: "در انتظار بررسی..." },
];

export default function Orders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  return (
    <div className="px-5 flex flex-col">
      {orders?.map((order, index) => {
        return (
          <Link
            href={`/profile/orders/${order.id}`}
            className={`flex flex-col gap-1 py-3 ${orders.length - 1 !== index && "border-b"} `}
            key={order.order_number}
          >
            <div className="flex justify-between items-center">
              <p
                className={`text-xs font-medium ${order.status === "completed" && "text-success"} ${order.status === "paid" && "text-warning"}`}
              >
                {
                  ORDER_STATUS_MAP.find((status_map) => {
                    return status_map.status === order.status;
                  })?.title
                }
              </p>
              <HugeiconsIcon icon={ArrowLeft01Icon} />
            </div>
            <p className="text-xs font-medium">
              <span className="text-muted-foreground">کد پیگیری </span>
              <span className="text-sm">
                {convertToPersianDigits(order.order_number)}
              </span>
            </p>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-muted-foreground">
                {formatPersianDate(order.created_at)}
              </p>
              <p>
                <span className="text-muted-foreground text-xs">تومان </span>
                <span className="text-primary font-medium text-sm">
                  {formatMoney(order.total_amount)}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              {order.items.map((item, index) => {
                return (
                  <Image
                    src={item.image}
                    alt="عکس محصول"
                    height={64}
                    width={54}
                    key={index}
                  />
                );
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
