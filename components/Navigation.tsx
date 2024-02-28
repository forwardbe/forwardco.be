'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3">
      <Link
        className={pathname === '/calendar' ? 'underline' : ''}
        href="/calendar"
      >
        Calendar
      </Link>
      <Link
        className={pathname === '/clients' ? 'underline' : ''}
        href="/clients"
      >
        Clients
      </Link>
      <Link
        className={pathname === '/invoices' ? 'underline' : ''}
        href="/invoices"
      >
        Invoices
      </Link>
    </div>
  );
}
