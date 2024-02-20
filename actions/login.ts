"use server";

import { LoginSchema } from "@/schemas/member";
import * as z from "zod";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Login successfully" };
};
