'use client';

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import Container from '@/shared/components/ui/Container/Container';
import SectionHeader from '@/shared/components/ui/SectionHeader/SectionHeader';
import GameCard from '@/shared/components/ui/GameCard/GameCard';
import GameCardSkeleton from '@/shared/components/ui/GameCard/GameCardSkeleton';
import { useFeaturedGames } from '@/core/hooks/useGames';
import type { Translations } from '@/core/i18n/translations';
import styles from './styles/FeaturedGames.module.css';

interface FeaturedGamesProps {
  featuredT: Translations['sections']['featured'];
  playNow: string;
}

export default function FeaturedGames({ featuredT, playNow }: FeaturedGamesProps) {
  const { data: games, isLoading, isError } = useFeaturedGames();

  return (
    <section className={styles.section} id="featured-games" aria-labelledby="featured-heading">
      <Container>
        <div className={styles.top}>
          <SectionHeader
            eyebrow={featuredT.eyebrow}
            title={<span id="featured-heading">{featuredT.title}</span>}
            description={featuredT.description}
          />
          <Link href="/games" className={styles.viewAll}>
            {featuredT.viewAll}
            <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading && (
          <ul className={styles.grid} role="list">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i}>
                <GameCardSkeleton />
              </li>
            ))}
          </ul>
        )}

        {isError && <p className={styles.error}>Could not load games.</p>}

        {games && (
          <ul className={styles.grid} role="list">
            {games.map((game, i) => (
              <li key={game.id}>
                <GameCard game={game} playLabel={playNow} priority={i < 3} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
