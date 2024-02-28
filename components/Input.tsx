import { InputHTMLAttributes } from 'react';

interface InputProps {
  label: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'number' | 'date' | 'time';
  defaultValue?: string;
}

export default function Input({
  label,
  id,
  required = false,
  placeholder,
  type = 'text',
  defaultValue,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col">
      <label className="text-md" htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="rounded-md disabled:opacity-40 disabled:cursor-not-allowed bg-white border-neutral-300 focus:ring-2 ring-neutral-600 transition  focus:outline-none shadow px-4 mt-2 py-2 bg-inherit border"
        name={id}
        placeholder={placeholder}
        required={required}
        type={type}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
}
