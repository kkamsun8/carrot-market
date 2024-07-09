"use server";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten;
  }
  return {
    errors: ["wrong password", "password is shot"],
  };
};
