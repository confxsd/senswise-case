"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

type FormData = {
  file: FileList;
};

async function uploadExcel(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/users/bulkUpload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to process the Excel file.");
  }

  return res.json();
}

export default function ExcelUploadForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation(uploadExcel, {
    onSuccess: () => {
      toast.success("Users uploaded successfully!");
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      toast.error("Error: Failed to process the Excel file.");
    },
  });

  const onSubmit = (data: FormData) => {
    const file = data.file[0];
    if (file) {
      mutation.mutate(file);
    } else {
      setErrorMessage("Please select a file to upload");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-5">Upload Users via Excel</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <input
          type="file"
          {...register("file")}
          accept=".xlsx"
          className="mb-4"
        />
        {errorMessage && (
          <div
            className="text-red-500"
            dangerouslySetInnerHTML={{
              __html: errorMessage.split(",").join("<br />"),
            }}
          />
        )}
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Upload
        </button>
      </form>
    </div>
  );
}
