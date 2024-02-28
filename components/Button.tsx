import clsx from 'clsx';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  as: 'button' | 'link';
  href?: string;
  type?: 'submit' | 'button';
  blank?: boolean;
  disabled?: boolean;
};

export default function Button({
  children,
  as,
  blank = false,
  href,
  type = 'submit',
  disabled = false,
}: ButtonProps) {
  const classNames = clsx(
    'py-2 flex w-fit px-4 disabled:opacity-40 disabled:cursor-not-allowed text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition'
  );

  if (as === 'button') {
    return (
      <button
        disabled={disabled}
        type={type}
        className={clsx(blank ? 'text-sm' : classNames)}
      >
        {children}
      </button>
    );
  }

  if (!href) throw new Error('href is required for link button');

  return (
    <Link href={href} className={clsx(blank ? 'text-sm' : classNames)}>
      {children}
    </Link>
  );
}
