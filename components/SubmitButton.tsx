'use client';

import { useFormStatus } from 'react-dom';
import { type ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  pendingText?: string;
  blank?: boolean;
};

export default function SubmitButton({
  children,
  blank = false,
  pendingText,

  ...props
}: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      {...props}
      type="submit"
      className={
        blank
          ? 'hover:underline'
          : 'py-2 flex w-fit px-4 text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition'
      }
      aria-disabled={pending}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
