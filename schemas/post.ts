import * as z from "zod";

export const PostSchema = z.object({
  userId: z.string(),
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .max(255, { message: "Less than or equal 255 characters" }),
  content: z.string(),
});

export const EditPostSchema = PostSchema.extend({
  id: z.number(),
});
