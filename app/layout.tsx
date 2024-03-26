import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata = {
  title:
    'Forward - we build visually and technically sound web experiences for humans',
  description:
    'Forward is a tiny spec on the internet, we build visually and technically sound web experiences for humans. We build applications that solve problems and make the web a better place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
