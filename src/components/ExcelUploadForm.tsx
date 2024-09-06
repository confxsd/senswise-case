import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useState, useCallback } from "react";
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

const ExcelUploadForm = () => {
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

  const onSubmit = useCallback(
    (data: FormData) => {
      const file = data.file[0];
      if (file) {
        mutation.mutate(file);
      } else {
        setErrorMessage("Please select a file to upload");
      }
    },
    [mutation],
  );

  return (
    <div className="my-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl mb-6 font-semibold text-gray-700">
        Upload Excel File
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <input
          type="file"
          {...register("file")}
          accept=".xlsx"
          className="mb-4 p-3 border border-gray-300 rounded-lg"
        />
        {errorMessage && (
          <div
            className="text-red-500"
            dangerouslySetInnerHTML={{
              __html: errorMessage.split(",").join("<br />"),
            }}
          />
        )}
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ExcelUploadForm;
