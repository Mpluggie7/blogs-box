"use server";

import { getUserByEmail } from "@/data/user.";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/member";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) return { errors: "Invalid fields" };

  const { name, email, password } = validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already exists" };

  await db.user.create({
    data: { name, email, password: hashedPassword },
  });

  return { success: "User created!" };
};
