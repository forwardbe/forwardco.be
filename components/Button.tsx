import clsx from 'clsx';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  as: 'button' | 'link';
  href?: string;
  type?: 'submit' | 'button';
  blank?: boolean;
  disabled?: boolean;
  state?: 'primary' | 'secondary' | 'danger';
};

export default function Button({
  children,
  as,
  blank = false,
  href,
  state = 'primary',
  type = 'submit',
  disabled = false,
}: ButtonProps) {
  const standardClassNames =
    'border flex w-fit items-center gap-1.5 shadow px-4 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:border-neutral-600 py-1.5 disabled:cursor-not-allowed bg-inherit border-neutral-300 rounded-md text-sm transition focus:outline-none focus:ring-2 ring-neutral-600 disabled:opacity-40';

  const classNames = clsx(
    standardClassNames,
    state === 'primary'
      ? 'bg-white text-neutral-900 hover:bg-neutral-100'
      : state === 'secondary'
      ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
      : state === 'danger'
      ? 'bg-red-500 text-white border-red-600 hover:bg-red-600'
      : 'bg-white text-neutral-900 hover:bg-neutral-100'
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
