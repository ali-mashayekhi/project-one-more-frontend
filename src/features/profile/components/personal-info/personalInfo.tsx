"use client";

import { useState } from "react";
import PersonalInfoView from "./personalInfoView";
import PersonalInfoEdit from "./personalInfoEdit";
import { getCurrentUser } from "@/features/users/services/get-current-user.client";
import { useQuery } from "@tanstack/react-query";

export default function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false);

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  if (isLoading) {
    return null;
  }

  if (!currentUser) {
    return null;
  }

  if (isEditing) {
    return (
      <PersonalInfoEdit user={currentUser} onDone={() => setIsEditing(false)} />
    );
  }

  return (
    <PersonalInfoView user={currentUser} onEdit={() => setIsEditing(true)} />
  );
}
