import React, {
  type FC,
  type InputHTMLAttributes,
  type PropsWithChildren,
} from "react";

interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name: string;
  className?: string;
  isError?: boolean;
  errorMessage?: string;
}

const Input: FC<PropsWithChildren<PropsInput>> = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  disabled,
  className,
  isError,
  errorMessage,
}: PropsInput) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-gray-600 text-sm md:text-base font-bold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          ${className}
          border rounded-md px-3 py-2 focus:outline-none transition-all duration-150
          ${
            isError
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }
          disabled:cursor-not-allowed
        `}
      />
      {isError && (
        <span className="text-xs text-red-500 mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
