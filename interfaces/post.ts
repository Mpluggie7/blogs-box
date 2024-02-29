// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const initialDataPost = {
  id: undefined,
  userId: "",
  title: "",
  content: "",
  published: false,
  createdAt: "",
  updatedAt: "",
};

export type Post = {
  id: number | undefined;
  userId: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type GetPostByUserId = Omit<Post, "userId" | "content">;
