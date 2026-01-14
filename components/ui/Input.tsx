"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3
            bg-white border border-slate-300 rounded-xl
            text-slate-900 placeholder:text-slate-400
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            hover:border-slate-400
            disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed disabled:hover:border-slate-300
            ${errorMessage ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {errorMessage && (
          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
