'use client';

import { useFormStatus } from 'react-dom';
import { type ComponentProps } from 'react';
import clsx from 'clsx';

type Props = ComponentProps<'button'> & {
  pendingText?: string;
  blank?: boolean;
  danger?: boolean;
};

export default function SubmitButton({
  children,
  blank = false,
  pendingText,
  danger = false,
  ...props
}: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  let classNames;

  if (danger) {
    classNames = clsx(
      'py-2 flex w-fit text-white px-4 disabled:opacity-40 disabled:cursor-not-allowed text-sm rounded-md no-underline bg-red-500 hover:bg-red-600 transition'
    );
  } else {
    classNames = clsx(
      blank
        ? 'hover:underline'
        : 'py-2 flex w-fit disabled:opacity-40 disabled:cursor-not-allowed px-4 text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition'
    );
  }

  return (
    <button
      {...props}
      type="submit"
      className={classNames}
      aria-disabled={pending}
      disabled={pending}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
