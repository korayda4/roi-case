import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { GameController } from '@phosphor-icons/react/dist/ssr';
import Container from '@/shared/components/ui/Container/Container';
import GamesFilter from './_components/GamesFilter';
import GamesGrid from './_components/GamesGrid';
import { getT, type Lang } from '@/core/i18n/translations';
import FAQ from '@/shared/components/sections/FAQ/FAQ';
import styles from './styles/games.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const { meta } = getT(lang);
  return { title: meta.gamesTitle, description: meta.gamesDescription };
}

interface GamesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const [{ category }, cookieStore] = await Promise.all([searchParams, cookies()]);
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const g = getT(lang).games;
  const activeCategory = category ?? 'All';

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <Container>
          <div className={styles.heroInner}>
            <span className={styles.heroIcon} aria-hidden="true">
              <GameController size={32} weight="fill" />
            </span>
            <h1 className={styles.heroTitle}>{g.heroTitle}</h1>
            <p className={styles.heroDesc}>{g.heroDesc}</p>
          </div>
        </Container>
      </div>

      <Container>
        <div className={styles.toolbar}>
          <Suspense fallback={<div className={styles.filterSkeleton} />}>
            <GamesFilter current={activeCategory} filterLabel={g.filter} allLabel={g.allGames} />
          </Suspense>
        </div>
        <GamesGrid category={activeCategory} lang={lang} />
      </Container>

      <FAQ faqT={getT(lang).sections.faq} />
    </div>
  );
}
