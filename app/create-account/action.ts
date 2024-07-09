"use server";
import { z } from "zod";

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "문자를 입력하세요",
        required_error: "이름을 입력하세요",
      })
      .min(3, "아이디가 너무 짧습니다.")
      .max(10, "아이디가 너무 길어요"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "암호가 잘못됨",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
