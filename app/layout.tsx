import type {Metadata} from 'next';
import {Open_Sans} from 'next/font/google';
import './globals.css';
import Header from './header/header';

const sans = Open_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kyzzen No Sekai',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.className} con`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
