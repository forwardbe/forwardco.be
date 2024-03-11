import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/Navigation';

const defaultUrl = process.env.WEBSITE_URL
  ? `https://${process.env.WEBSITE_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Chronobill - Time tracking & invoicing',
  description:
    'Chronobill makes it easy to track time across all your projects. Then turn that data into reporting or invoices.',
};

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
          <Navigation />
          <div className="max-w-6xl mx-auto">
            <div className="mx-4">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
