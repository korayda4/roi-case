import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getT, type Lang } from '@/core/i18n/translations';
import HeroSection from './_home/HeroSection';
import FeaturedGames from './_home/FeaturedGames';
import WhyChooseUs from './_home/WhyChooseUs';
import HowToPlay from './_home/HowToPlay';
import AboutSection from './_home/AboutSection';
import FAQ from '@/shared/components/sections/FAQ/FAQ';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const { meta } = getT(lang);
  return { title: meta.homeTitle, description: meta.homeDescription };
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const t = getT(lang);

  return (
    <>
      <HeroSection t={t} />
      <FeaturedGames featuredT={t.sections.featured} playNow={t.games.playNow} />
      <WhyChooseUs t={t} />
      <HowToPlay t={t} />
      <AboutSection t={t} />
      <FAQ faqT={t.sections.faq} />
    </>
  );
}
