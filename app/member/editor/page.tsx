"use client";

import dynamic from "next/dynamic";

// import CustomCkeditor from "@/components/member/custom-ckeditor";

const CustomCkeditor = dynamic(
  () => {
    return import("@/components/member/custom-ckeditor");
  },
  { ssr: false }
);

const EditorPage = () => {
  return (
    <div>
      <h1>My App</h1>
      <CustomCkeditor />
    </div>
  );
};

export default EditorPage;
