import React, { forwardRef } from "react";

interface TextInputProps {
  type: string;
  placeholder: string;
  error?: string;
  [x: string]: any;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type, placeholder, error, ...rest }, ref) => {
    return (
      <div className="mb-4 w-full">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : ""
          }`}
          {...rest}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
export default TextInput;
