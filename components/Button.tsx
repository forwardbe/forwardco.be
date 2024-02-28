import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  as: 'button' | 'link';
  href?: string;
  type?: 'submit' | 'button';
};

export default function Button({ children, as, href, type }: ButtonProps) {
  if (as === 'button') {
    return (
      <button
        type="submit"
        className="py-2 flex w-fit px-4 text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition"
      >
        {children}
      </button>
    );
  }

  if (!href) throw new Error('href is required for link button');

  return (
    <Link
      href={href}
      className="py-2 flex w-fit px-4 text-sm rounded-md no-underline bg-neutral-200 hover:bg-neutral-300 transition"
    >
      {children}
    </Link>
  );
}
