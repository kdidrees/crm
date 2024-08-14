import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { bulkUploadAsync } from "../redux/slices/leadForm";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";

export default function Bulkimport() {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  // Set up dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: [".xlsx", ".xls"],
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles[0]),
  });

  const handleDrop = (file) => {
    setFile(file);
    readFile(file)
      .then((data) => setPreviewData(data))
      .catch((err) => {
        console.log("err reading file", err);
      });
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Define the onload function to process the file once it's read
      reader.onload = (e) => {
        try {
          // Convert the file content into binary string format
          const workbook = XLSX.read(e.target.result, { type: "binary" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          resolve(data); // Resolve the promise with the processed data
        } catch (error) {
          reject(error); // Reject the promise in case of an error
        }
      };

      // Handle any errors during file reading
      reader.onerror = (error) => reject(error);

      // Read the file as a binary string
      reader.readAsBinaryString(file);
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    // validate if all headers are selected

    const requriedHeaders = previewData[0].map((_, index) => index);
    const errors = {};
    requriedHeaders.forEach((index) => {
      if (!selectedHeaders[index]) {
        errors[index] = "This field is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const formData = new FormData();
    formData.append("file", file);
    formData.append("headers", JSON.stringify(selectedHeaders)); // add selected headers

    // dispatch the action for bulk upload
    dispatch(bulkUploadAsync(formData));

    console.log(formData, "kd formdata here");
  };

  const handleHeaderChange = (index, value) => {
    setSelectedHeaders((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  return (
    <div>
      <form>
        <h1>Bulk Import</h1>

        <div {...getRootProps()} className="dropzone mx-48">
          <input {...getInputProps()} />
          <p>
            Drag & drop an Excel file here, or click to select one (.xls, .xlsx)
          </p>
        </div>

        {previewData.length > 0 && (
          <div className="mt-6 mx-20">
            <h2 className="text-xl font-semibold mb-2">Preview</h2>
            <div className="overflow-auto h-64 flex justify-center">
              <table className=" bg-white border border-gray-300 rounded-xl">
                <thead className="rounded-xl">
                  <tr className="bg-gray-20">
                    {previewData[0].map((header, index) => (
                      <th
                        key={index}
                        className={`py-2 px-4 border-b bg-black `}
                      >
                        <select
                          onChange={(e) =>
                            handleHeaderChange(index, e.target.value)
                          }
                          required
                          value={selectedHeaders[header]}
                          className="bg-black  text-white"
                        >
                          <option disabled selected>
                            {header}
                          </option>
                          <option value="name">Name</option>
                          <option value="status">Status</option>
                          <option value="company">Company</option>
                          <option value="title">Title</option>
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                        </select>
                        {formErrors[index] && (
                          <p className="text-red-500 text-xs">
                            {formErrors[index]}
                          </p>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="h-36 overflow-y-auto ">
                  {previewData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`py-2 px-4 border-b ${
                            rowIndex % 2 === 0 ? "bg-blue-200" : "bg-white"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file}
            className={`mt-6 py-2 px-4 rounded-lg text-white font-semibold ${
              file
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Import
          </button>
        </div>
      </form>
    </div>
  );
}
