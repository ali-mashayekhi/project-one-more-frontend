import { Button } from "@/components/ui/button";
import { CurrentUser } from "@/features/users/types/currentUser";
import EmptyFieldAction from "./emptyFieldAction";
import { formatPersianDate } from "@/lib/utils";

interface PersonalInfoViewProps {
  user: CurrentUser;
  onEdit: () => void;
}

export default function PersonalInfoView({
  user,
  onEdit,
}: PersonalInfoViewProps) {
  return (
    <div className="flex flex-col gap-3 px-5 py-3">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-xs text-muted-foreground">شماره همراه</p>
        <p className="font-medium text-sm">{user.phone_number}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-xs text-muted-foreground">نام</p>
        {user.first_name || user.last_name ? (
          <p className="font-medium text-sm">{`${user.first_name} ${user.last_name}`}</p>
        ) : (
          <EmptyFieldAction onEdit={onEdit} />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-xs text-muted-foreground">تاریخ تولد</p>
        {user.birthday ? (
          <p className="font-medium text-sm">
            {formatPersianDate(user.birthday)}
          </p>
        ) : (
          <EmptyFieldAction onEdit={onEdit} />
        )}
      </div>
      <Button className="w-20" size={"sm"} onClick={onEdit}>
        ویرایش
      </Button>
    </div>
  );
}
