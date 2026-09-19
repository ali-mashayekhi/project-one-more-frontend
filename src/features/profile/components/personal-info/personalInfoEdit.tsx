import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateCurrentUser } from "@/features/users/services/update-current-user.client";
import { CurrentUser } from "@/features/users/types/currentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateStoredUser } from "@/features/auth/lib/storage";
import {
  PersonalInfoFormValues,
  personalInfoSchema,
} from "../../schemas/profile";

interface PersonalInfoEditProps {
  user: CurrentUser;
  onDone: () => void;
}

export default function PersonalInfoEdit({
  user,
  onDone,
}: PersonalInfoEditProps) {
  const queryClient = useQueryClient();

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      birthday: user.birthday ?? "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: (updatedUser) => {
      queryClient.setQueryData<CurrentUser>(
        ["current-user"],
        (currentUser) => ({
          ...currentUser!,
          ...updatedUser,
        }),
      );

      updateStoredUser({
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
      });

      onDone();
    },
  });

  const onSubmit = (data: PersonalInfoFormValues) => {
    updateMutation.mutate({
      ...data,
      birthday: data.birthday || null,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3 px-5 py-3"
    >
      <div className="flex flex-col gap-1">
        <p className="font-medium text-xs text-muted-foreground">شماره همراه</p>
        <p className="font-medium text-sm">{user.phone_number}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="first_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                placeholder="نام"
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
                placeholder="نام خانوادگی"
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>

      <Controller
        name="birthday"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              placeholder="تاریخ تولد"
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
      <div className="flex gap-2">
        <Button
          type="submit"
          className="w-20"
          size="sm"
          disabled={updateMutation.isPending}
        >
          ذخیره
        </Button>
        <Button
          type="button"
          className="w-20"
          size="sm"
          variant="outline"
          onClick={onDone}
        >
          کنسل
        </Button>
      </div>
    </form>
  );
}
