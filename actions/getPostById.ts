"use server";

import { initialDataPost } from "@/interfaces/post";
import { db } from "@/lib/db";

export const getPostByIdAction = async (id: number) => {
  const data = await db.post.findUnique({ where: { id } });

  return data === null ? initialDataPost : data;
};
