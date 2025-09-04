import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/header/header';
import { ToastContainer, Slide } from 'react-toastify';
import Providers from './providers';

const sans = Open_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kyzzen No Sekai',
  description: 'Kyzzen no Sekai is an upcoming Solana NFT project by Kyzzen.io, the ultimate onboarding & discovery platform on Solana. Learn more about us today!',
  keywords: [
    'Kyzzen',
    'Kyzzen no Sekai',
    'Kyzzen Solana, NFT',
    'Solana tools',
    'portfolio tracker',
    'crypto alerts',
    'crypto analytics',
    'solana opportunities',
    'AI art',
    'Artist led',
    'Ai powered NFT',
    'generative NFT art',
    'NFT utilities'
  ]
};

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
