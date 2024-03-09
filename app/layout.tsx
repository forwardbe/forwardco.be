import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Button from '@/components/Button';

const defaultUrl = process.env.WEBSITE_URL
  ? `https://${process.env.WEBSITE_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Chronobill - Time tracking & invoicing',
  description:
    'Chronobill makes it easy to track time across all your projects. Then turn that data into reporting or invoices.',
};

const navigationItems = [
  {
    label: 'Products',
    href: '/side-projects',
  },
  {
    label: 'Projects',
    href: '/',
  },
  {
    label: 'Services',
    href: '/',
  },
  {
    label: 'About',
    href: '/',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <Toaster />
        <main>
          <div className="max-w-6xl mx-auto">
            <div className="mx-4">
              <div className="mt-12 flex items-center justify-between">
                <Link href="/">Jasper Vermeulen</Link>
                <div className="flex items-center gap-6">
                  {navigationItems.map((item) => (
                    <Link href={item.href} className="relative group flex">
                      <p className="group-hover:-translate-y-1 transition">
                        {item.label}
                      </p>
                      <div className="w-1 opacity-0 transition group-hover:translate-y-1 group-hover:opacity-100 h-1 bg-black rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
                    </Link>
                  ))}
                  <Button as="link" href="/">
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="mx-4">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
