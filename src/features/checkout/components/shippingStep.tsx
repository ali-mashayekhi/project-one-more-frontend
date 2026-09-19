"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertToPersianDigits, formatMoney } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { CHECKOUT_SESSION_STORAGE_KEY } from "../lib/storage";
import {
  CheckoutShippingForm,
  checkoutShippingSchema,
} from "../schemas/shipping";
import { getShippingMethods } from "../services/get-shipping-methods.client";
import { updateCheckoutShipping } from "../services/update-checkout-shipping.client";
import { CheckoutSession } from "../types/checkout";

interface ShippingStepProps {
  sessionId: string;
}

export default function ShippingStep({ sessionId }: ShippingStepProps) {
  const router = useRouter();

  const form = useForm<CheckoutShippingForm>({
    resolver: zodResolver(checkoutShippingSchema),

    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      province: "",
      city: "",
      address: "",
      building_number: "",
      unit: "",
      postal_code: "",
      description: "",
      shipping_method_id: undefined,
    },
  });

  const updateShippingMutation = useMutation({
    mutationFn: (data: CheckoutShippingForm) =>
      updateCheckoutShipping(sessionId, data),

    onSuccess: (_, formData) => {
      const selectedShippingMethod = shippingMethods.find(
        (method) => method.id === formData.shipping_method_id,
      );

      if (!selectedShippingMethod) return;

      const stored = localStorage.getItem(CHECKOUT_SESSION_STORAGE_KEY);

      if (!stored) return;

      const checkoutSession: CheckoutSession = JSON.parse(stored);

      checkoutSession.shipping = {
        ...formData,
        shipping_method: selectedShippingMethod,
      };

      localStorage.setItem(
        CHECKOUT_SESSION_STORAGE_KEY,
        JSON.stringify(checkoutSession),
      );

      router.push(`/checkout/payment/${sessionId}`);
    },

    onError: (error) => {
      // handle error
    },
  });
  const onSubmit = (data: CheckoutShippingForm) => {
    updateShippingMutation.mutate(data);
  };

  const { data: shippingMethods } = useQuery({
    queryKey: ["checkout", "shipping-methods"],
    queryFn: getShippingMethods,
  });

  return (
    <div className="px-5 pb-10">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        {/* address */}
        <div className="border-b pb-3">
          <div className="flex justify-between py-3">
            <h2 className="text-sm font-medium">اطلاعات ارسال</h2>
            <p className="text-xs text-secondary-foreground">* اجباری</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="first_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      placeholder="نام *"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="last_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      placeholder="نام خانوادگی *"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <Controller
              name="phone_number"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    placeholder="شماره همراه *"
                    inputMode="numeric"
                    type="tel"
                    dir="ltr"
                    className="placeholder:text-right"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="province"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      placeholder="استان *"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      placeholder="شهر *"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Textarea
                    {...field}
                    placeholder="آدرس کامل *"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="building_number"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      placeholder="پلاک *"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="unit"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      placeholder="واحد"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <Controller
              name="postal_code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    placeholder="کد پستی *"
                    inputMode="numeric"
                    dir="ltr"
                    className="placeholder:text-right"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Textarea
                    {...field}
                    placeholder="توضیحات"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>
        </div>
        {/* Shipment */}
        {shippingMethods && (
          <div className="flex flex-col">
            <h2 className="text-sm font-medium py-3">انتخاب شیوه ارسال</h2>

            <Controller
              name="shipping_method_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="py-3 flex flex-col gap-3">
                    {shippingMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => field.onChange(method.id)}
                        className={`flex justify-between items-center border rounded-md px-3 py-2 text-right ${
                          field.value === method.id
                            ? "border-primary"
                            : "border-border"
                        }`}
                      >
                        <div className="flex flex-col">
                          <p className="text-xs">
                            زمان تحویل{" "}
                            {convertToPersianDigits(method.estimated_delivery)}
                          </p>

                          <p className="text-sm font-medium text-muted-foreground">
                            {method.name}
                          </p>
                        </div>

                        <p className="text-sm">
                          <span className="text-xs text-muted-foreground ml-1">
                            تومان
                          </span>
                          {formatMoney(method.price)}
                        </p>
                      </button>
                    ))}
                  </div>

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-col gap-1 py-2">
          <div className="flex justify-between py-1">
            <p className="text-sm font-medium">مجموع قیمت</p>
            <div>
              <p className="text-sm">
                <span className="text-xs text-muted-foreground ml-1">
                  تومان
                </span>
                <span>{formatMoney(2000000)}</span>
              </p>
            </div>
          </div>
          <Button
            size="lg"
            className="btn btn-primary"
            type="submit"
            disabled={updateShippingMutation.isPending}
          >
            ادامه
          </Button>
        </div>
      </form>
    </div>
  );
}
