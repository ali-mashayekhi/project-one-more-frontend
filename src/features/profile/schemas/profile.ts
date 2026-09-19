import { z } from "zod";

export const personalInfoSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birthday: z.string(),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
