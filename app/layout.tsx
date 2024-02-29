import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const defaultUrl = process.env.WEBSITE_URL
  ? `https://${process.env.WEBSITE_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Chronobill - Time tracking & invoicing',
  description:
    'Chronobill makes it easy to track time across all your projects. Then turn that data into reporting or invoices.',
};

const isLocal = process.env.WEBSITE_URL === 'http://localhost:3000';

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
          {isLocal ? (
            <div
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                padding: '1rem',
                backgroundColor: 'red',
                color: 'white',
              }}
            >
              <p>Local</p>
            </div>
          ) : null}
          {children}
        </main>
      </body>
    </html>
  );
}
