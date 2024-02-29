"use server";

import { db } from "@/lib/db";
import { EditPostSchema } from "@/schemas/post";
import * as z from "zod";

export const saveEditPostAction = async (
  values: z.infer<typeof EditPostSchema>
) => {
  console.log(values);

  const validateFields = EditPostSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  if (values.content === "") return { error: "Content must be empty!" };

  const { id, title, content } = validateFields.data;

  const existingTitle = await db.post.findFirst({
    where: { AND: { NOT: { id }, title } },
  });
  if (existingTitle) return { error: "Title already exist" };

  await db.post.update({ where: { id }, data: { title, content } });

  return { success: "Save post successfully" };
};
