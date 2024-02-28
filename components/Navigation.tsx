'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex items-center">
      <Link
        className={
          pathname === '/calendar'
            ? 'bg-neutral-100 py-1.5 px-2 rounded'
            : 'bg-white p-2'
        }
        href="/calendar"
      >
        Calendar
      </Link>
      <Link
        className={
          pathname === '/clients'
            ? 'bg-neutral-100 py-1.5 px-2 rounded'
            : 'bg-white p-2'
        }
        href="/clients"
      >
        Clients
      </Link>
      <Link
        className={
          pathname === '/invoices'
            ? 'bg-neutral-100 py-1.5 px-2 rounded'
            : 'bg-white p-2'
        }
        href="/invoices"
      >
        Invoices
      </Link>
    </div>
  );
}
