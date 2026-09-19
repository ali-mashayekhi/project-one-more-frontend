interface EmptyFieldActionProps {
  onEdit: () => void;
}

export default function EmptyFieldAction({ onEdit }: EmptyFieldActionProps) {
  return (
    <button
      className="underline font-medium text-sm text-start"
      onClick={onEdit}
    >
      اضافه کردن
    </button>
  );
}
