import { GeistSans } from 'geist/font/sans';
import './globals.css';

const defaultUrl = process.env.WEBSITE_URL
  ? `https://${process.env.WEBSITE_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
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
