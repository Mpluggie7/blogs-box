import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  loaded: (value: boolean) => void;
}

const TextEditor = ({ value, onChange, disabled, loaded }: TextEditorProps) => {
  const [editorValue, setEditorValue] = useState(value);

  const handleChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  useEffect(() => {
    console.log("TextEditor loaded");
    loaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modules = useMemo(() => {
    return {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
      ],
    };
  }, []);

  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      value={editorValue}
      onChange={handleChange}
      readOnly={disabled}
    />
  );
};

export default TextEditor;
