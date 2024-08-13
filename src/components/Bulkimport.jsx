import React from "react";
import { useDropzone } from "react-dropzone";
import { bulkUploadAsync } from "../redux/slices/leadForm";
import { useDispatch } from "react-redux";

export default function Bulkimport() {

  const dispatch = useDispatch();

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);


  // dispatch the action with formData
    dispatch(bulkUploadAsync(formData))
  };

   // Set up dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: [".xlsx", ".xls"],
    onDrop: (acceptedFiles) => handleUpload(acceptedFiles[0]),
  });


    
 
  return (
    <form>
      <h1>Bulk Import</h1>

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>
          Drag & drop an Excel file here, or click to select one (.xls, .xlsx)
        </p>
      </div>
    </form>
  );
}
