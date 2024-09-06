"use client";

import ExcelUploadForm from "@/components/ExcelUploadForm";

const ExcelUpload = () => {
  return (
    <div className="flex justify-center h-screen mt-24">
      <div className="max-w-md mx-auto mt-10">
        <ExcelUploadForm />
      </div>
    </div>
  );
};

export default ExcelUpload;
