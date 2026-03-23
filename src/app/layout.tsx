import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/shared/components/layout/Header/Header';
import Footer from '@/shared/components/layout/Footer/Footer';
import ClientProviders from '@/core/providers/ClientProviders';
import ReactQueryProvider from '@/core/query/ReactQueryProvider';
import { getT, type Lang } from '@/core/i18n/translations';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const { meta } = getT(lang);
  return {
    title: {
      template: '%s | Koray',
      default: meta.siteTitle,
    },
    description: meta.siteDescription,
    keywords: ['free games', 'online games', 'social gaming', 'browser games', 'puzzle games'],
    robots: { index: true, follow: true },
    openGraph: { siteName: 'Koray', type: 'website', locale: lang === 'tr' ? 'tr_TR' : 'en_US' },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const t = getT(lang);

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
      <body>
        <ReactQueryProvider>
          <ClientProviders />
          <Header lang={lang} t={t} />
          <main>{children}</main>
          <Footer t={t} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
