"use server";

import { db } from "@/lib/db";

export const getPostByUserIdAction = async (userId: string) => {
  const data = await db.post.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return data !== undefined ? data : [];
};
