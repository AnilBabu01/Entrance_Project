import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ onChange, blogHtml,setBlogHtml }) => {
  const editor = useRef(null);

  const config = {
    readonly: false, // Editable mode
    height: 400,
    placeholder: "Start typing blog...",
    uploader: {
      insertImageAsBase64URI: true, // Enables direct image upload
    },
    filebrowser: {
      ajax: {
        url: "YOUR_BACKEND_URL_HERE", // Optional backend for file handling
      },
      uploader: {
        url: "YOUR_BACKEND_UPLOAD_URL_HERE", // Optional file upload endpoint
      },
    },
    allowImages: true, // Enable image insertion
  };

  return (
    <JoditEditor
      ref={editor}
      value={blogHtml} // Pre-filled content
      config={config}
      onBlur={(newContent) => {
        setBlogHtml(newContent);
        if (onChange) onChange(newContent);
      }}
      onChange={(newContent) => {}}
    />
  );
};

export default TextEditor;
