// import type {Metadata} from 'next';
'use client';
import {Open_Sans} from 'next/font/google';
import './globals.css';
import Header from '../components/header/header';
import {ToastContainer, Slide} from 'react-toastify';
import Providers from './providers';

const sans = Open_Sans({
  subsets: ['latin'],
});

// const metadata: Metadata = {
//   title: 'Kyzzen No Sekai',
//   description: '',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.className}`}>
        <div className="con">
          <Providers>
            <Header />
            {children}
          </Providers>
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Slide}
          />
        </div>
      </body>
    </html>
  );
}
