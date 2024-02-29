"use server";

import { db } from "@/lib/db";

export const updatePostAction = async ({
  id,
  published,
}: {
  id: number | undefined;
  published: boolean;
}) => {
  try {
    const data = await db.post.update({
      where: { id: id },
      data: { published },
    });
    // console.log("updatePost.ts", data);
    return { result: true, message: "This post is updated successfully." };
  } catch (error) {
    return { result: false, message: "Can't update this post!" };
  }
};
