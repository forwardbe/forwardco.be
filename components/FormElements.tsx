import { InputProps, SelectProps } from '@/types/FormElements';
import clsx from 'clsx';
import { Eye } from 'lucide-react';
import { InputHTMLAttributes, SelectHTMLAttributes, useState } from 'react';

const defaultClassNames = clsx(
  'rounded-md disabled:opacity-40 w-full disabled:cursor-not-allowed bg-white border-neutral-200 bg-inherit border placeholder:text-neutral-300 transition focus:ring-2 focus:ring-neutral-100 focus:outline-none focus:border-neutral-200 dark:bg-neutral-900 dark:border-neutral-600 dark:placeholder:text-neutral-600'
);

export function Input({
  label,
  id,
  required = false,
  placeholder,
  type = 'text',
  defaultValue,
  small = false,
  startIcon,
  startText,
  endIcon,
  endText,
  textPadding,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const InputClassName = clsx(
    defaultClassNames,
    small ? 'sm:text-sm' : 'text-base',
    startIcon ? (small ? 'pl-12' : 'pl-14') : '',
    endIcon ? (small ? 'pr-12' : 'pr-14') : '',
    textPadding
  );

  const LabelClassName = clsx(
    small
      ? 'sm:text-sm sm:text-neutral-700 sm:dark:text-neutral-400'
      : 'text-md'
  );

  const WrapperClassName = clsx(
    'flex items-center !w-full relative',
    label ? (small ? 'mt-1' : 'mt-2') : null
  );

  const StartIcon = startIcon;
  const EndIcon = endIcon;

  return (
    <div className="flex flex-col pl-">
      {label ? (
        <label htmlFor={id} className={LabelClassName}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      ) : null}
      <div className={WrapperClassName}>
        {startIcon && (
          <div
            className={clsx(
              small ? 'h-[38px]' : 'h-[42px]',
              'flex items-center bg-neutral-50 rounded-l-md border absolute pointer-events-none pl-3 pr-3 border-r'
            )}
          >
            <StartIcon
              className={clsx(
                small ? 'w-3 h-3' : 'w-4 h-4',
                'text-neutral-600'
              )}
            />
          </div>
        )}

        {startText && (
          <div
            className={clsx(
              small ? 'h-[38px]' : 'h-[42px]',
              'flex items-center bg-neutral-50 rounded-l-md border absolute pointer-events-none pl-3 pr-3 border-r'
            )}
          >
            <p className="text-neutral-600">{startText}</p>
          </div>
        )}
        <input
          className={InputClassName}
          name={id}
          placeholder={placeholder}
          required={required}
          type={type}
          defaultValue={defaultValue}
          {...props}
        />
        {endIcon && (
          <div
            className={clsx(
              small ? 'h-[38px]' : 'h-[42px]',
              'flex items-center bg-neutral-50 right-0 rounded-r-md border absolute pointer-events-none pr-3 pl-3 border-l'
            )}
          >
            <EndIcon
              className={clsx(
                small ? 'w-3 h-3' : 'w-4 h-4',
                'text-neutral-600'
              )}
            />
          </div>
        )}
         {endText && (
          <div
            className={clsx(
              small ? 'h-[38px]' : 'h-[42px]',
              'flex items-center bg-neutral-50 right-0 rounded-r-md border absolute pointer-events-none pr-3 pl-3 border-l'
            )}
          >
            <p className="text-neutral-600">{endText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Select({
  label,
  id,
  required = false,
  defaultValue,
  small = false,
  options = [],
  ...props
}: SelectProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const SelectClassName = clsx(
    defaultClassNames,
    small ? 'sm:text-sm mt-1 sm:mt-2' : 'text-base mt-2'
  );

  const LabelClassName = clsx(
    small
      ? 'sm:text-sm sm:text-neutral-700 sm:dark:text-neutral-400'
      : 'text-md'
  );

  return (
    <div className="flex flex-col">
      {label ? (
        <label htmlFor={id} className={LabelClassName}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      ) : null}
      <select className={SelectClassName} id={id} name={id}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextArea() {}
