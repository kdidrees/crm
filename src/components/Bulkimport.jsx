import React from "react";
import { useDropzone } from "react-dropzone";

export default function Bulkimport() {
  const { getRootProps, getInputProps } = useDropzone({
    accept: [".xlsx", ".xls"],
    onDrop: (acceptedFiles) => handleUpload(acceptedFiles[0]),
  });

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  };
  return (
    <div>
      <h1>Bulk Import</h1>

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>
          Drag & drop an Excel file here, or click to select one (.xls, .xlsx)
        </p>
      </div>
    </div>
  );
}
