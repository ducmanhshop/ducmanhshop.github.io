import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import SharedLayout from '@/components/SharedLayout';
import PageLoader from '@/components/PageLoader';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'MDM Store - Tài Khoản Premium Cao Cấp',
  description: 'Dịch vụ tài khoản Premium — Uy tín, Nhanh chóng, Tận tâm. Trải nghiệm các dịch vụ giải trí, thiết kế và công cụ AI hàng đầu thế giới.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://img.vietqr.io" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.variable} font-sans bg-transparent text-[#1d1d1f] antialiased overflow-x-hidden selection:bg-black selection:text-white transition-colors duration-300 relative`}>
        <AppProvider>
          <PageLoader />
          <SharedLayout>
            {children}
          </SharedLayout>
        </AppProvider>
      </body>
    </html>
  );
}
