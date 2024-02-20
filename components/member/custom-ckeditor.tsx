"use client";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useRef, useState } from "react";

const CustomCkeditor = () => {
  // const editorRef = useRef();
  // const [editorLoaded, setEditorLoaded] = useState(false);
  // const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   editorRef.current = {
  //     CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
  //     ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
  //   };
  //   setEditorLoaded(true);
  // }, []);

  //

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setContent(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={handleEditorChange}
      config={{
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "indent",
          "outdent",
          "|",
          "imageUpload",
          "blockQuote",
          "insertTable",
          "mediaEmbed",
          "undo",
          "redo",
        ],
      }}
    />
  );
};

export default CustomCkeditor;
