'use client';

import Link from 'next/link';
import Button from './Button';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navigationItems = [
  {
    label: 'Products',
    href: '/side-projects',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'About',
    href: '/about',
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mx-4">
        <div className="mt-12 flex items-center justify-between">
          <Link href="/">Jasper Vermeulen</Link>
          <div className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={clsx('relative group flex')}
              >
                <p className="group-hover:-translate-y-1 transition">
                  {item.label}
                </p>
                <div
                  className={clsx(
                    'w-1 transition group-hover:translate-y-1 group-hover:opacity-100 h-1 bg-black rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2',
                    pathname === item.href ? 'opacity-100' : 'opacity-0'
                  )}
                ></div>
              </Link>
            ))}
            <Button as="link" href="/">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
