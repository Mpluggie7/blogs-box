"use server";

import { db } from "@/lib/db";
import { PostSchema } from "@/schemas/post";
import * as z from "zod";

export const savePostAction = async (values: z.infer<typeof PostSchema>) => {
  console.log(values);

  const validateFields = PostSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  if (values.content === "") return { error: "Content must be empty!" };

  const { userId, title, content } = validateFields.data;

  const existingTitle = await db.post.findFirst({ where: { title: title } });

  if (existingTitle) return { error: "Title already exist" };

  // await db.post.create({
  //   data: { userId, title, content },
  // });
  console.log("create post passed");

  return { success: "Save post successfully" };
};
