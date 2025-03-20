//// filepath: /c:/Users/idvz0/Proyects/infogamer/src/components/RichTextEditor.tsx
"use client";
import React from "react";
import dynamic from "next/dynamic";
import ReactDOM from "react-dom";

// Polyfill para ReactDOM.findDOMNode si no existe
if (!(ReactDOM as any).findDOMNode) {
  (ReactDOM as any).findDOMNode = (node: any) => node;
}

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Encabezados 1,2,3
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
  "image",
  "align",
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}