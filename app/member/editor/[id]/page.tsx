"use client";

import { saveEditPostAction } from "@/actions/saveEditPost";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Post, initialDataPost } from "@/interfaces/post";
import { EditPostSchema, PostSchema } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPostByIdAction } from "@/actions/getPostById";
import { useToast } from "@/components/ui/use-toast";
import { updatePostAction } from "@/actions/updatePost";

export default function EditorByIdPage({ params }: { params: { id: string } }) {
  const postId = params.id;
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<Post>(initialDataPost);
  const [editorLoaded, setEditorLoaded] = useState<boolean>(true);
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const DynamicTextEditor = useMemo(() => {
    return dynamic(() => import("@/components/editor/text-editor"), {
      loading: () => (
        <p className="h-[112px] flex items-center justify-center">
          Loading Editor...
        </p>
      ),
      ssr: false,
    });
  }, []);

  const getData = async (id: string) => {
    if (!isNaN(Number(id))) {
      const data = await getPostByIdAction(Number(id));
      console.log(data);
      setData(data);
    }
  };

  useEffect(() => {
    getData(postId);
  }, [postId]);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      userId: data.userId,
      title: data.title,
      content: data.content,
    },
    values: { userId: data.userId, title: data.title, content: data.content },
  });

  const handleEditorChange = (value: string) => {
    setData({ ...data, content: value });
  };

  const saveEditPost = (values: z.infer<typeof PostSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      const newValues = EditPostSchema.parse({
        id: data.id,
        title: values.title.trim(),
        content: data.content,
      });

      saveEditPostAction(newValues).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const publishChange = () => {
    console.log("publishChange");
    startTransition(() => {
      const value = {
        id: data.id,
        published: !data.published,
      };
      updatePostAction(value).then((data) => {
        setOpenDialog(false);
        toast({
          className: data.result ? "bg-green-300" : "",
          variant: data.result ? "default" : "destructive",
          description: data.message,
        });
      });
      getData(postId);
    });
  };

  const sumHideAllContent = data.title && data.content && editorLoaded;

  return (
    <div className="flex justify-center">
      <div
        className={`${
          sumHideAllContent ? "block" : "hidden"
        } w-[800px] space-y-6 m-6`}
      >
        <CardHeader className="space-y-4">
          <h1 className="text-3xl font-semibold text-center">
            Post Something ...
          </h1>
          <div className="w-full flex justify-center">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                {data.published ? (
                  <Button
                    variant="outline"
                    className="flex bg-green-200 hover:bg-green-300 gap-x-2"
                  >
                    This post is publishing
                    <FaCheck />
                  </Button>
                ) : (
                  <Button variant="outline" className="flex gap-x-2">
                    Not published yet
                    <FaTimes />
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-md space-y-6"
                // onInteractOutside={(e) => {
                //   isPending && e.preventDefault();
                // }}
              >
                <DialogHeader>
                  <DialogTitle>Confirmation</DialogTitle>
                  <DialogDescription>
                    Are you sure to{" "}
                    {data.published ? "cancel publishing" : "publish"} this
                    post?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="justify-around">
                  <Button
                    type="button"
                    variant="default"
                    onClick={publishChange}
                    className="w-24"
                    disabled={isPending}
                  >
                    Yes
                  </Button>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-24"
                      disabled={isPending}
                    >
                      No
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(saveEditPost)}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TITLE</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="title name"
                          type="text"
                          disabled={isPending}
                          onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DynamicTextEditor
                value={data.content}
                onChange={handleEditorChange}
                disabled={isPending}
                loaded={setEditorLoaded}
              />

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="w-full flex justify-end">
                <Button type="submit" className="">
                  Update Post
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </div>

      {/* page loading */}
      <div
        className={`${
          sumHideAllContent ? "hidden" : "block"
        } h-screen w-[800px] flex flex-col justify-center space-y-2`}
      >
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-80" />
      </div>
    </div>
  );
}
