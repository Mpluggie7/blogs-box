"use client";

import { savePostAction } from "@/actions/savePost";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostSchema } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function EditorPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
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

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: { userId: "", title: "", content: "" },
  });

  const [content, setContent] = useState<string>("");

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  const savePost = (values: z.infer<typeof PostSchema>) => {
    console.log("in savePost");

    setError("");
    setSuccess("");

    startTransition(() => {
      const newValues = PostSchema.parse({
        userId: "clsw831ey00007zx6054vdb2y",
        title: values.title.trim(),
        content: content,
      });

      savePostAction(newValues).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return <div></div>;
}
