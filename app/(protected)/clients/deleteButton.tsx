'use client';

import { useFormStatus } from 'react-dom';
import { type ComponentProps } from 'react';
import toast from 'react-hot-toast';

type Props = ComponentProps<'button'> & {
  pendingText?: string;
};

export function DeleteButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      {...props}
      type="submit"
      className="hover:underline"
      aria-disabled={pending}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
