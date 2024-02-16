import type { Metadata } from 'next';
import './globals.css';
import Header from '@/_components/header';
import { Providers } from './_components/Providers';
import { Crimson_Pro, Raleway } from 'next/font/google';

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimsonPro',
  style: 'italic',
});
const raleway = Raleway({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${crimsonPro.variable} ${raleway.variable}`}
    >
      <body
        className={`flex min-h-lvh flex-col px-4 font-sans
 antialiased transition md:px-10 lg:px-20 `}
      >
        <Providers>
          <Header />
          <main className='mx-auto h-full max-w-7xl'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
