'use client';

import GameCard from '@/shared/components/ui/GameCard/GameCard';
import GameCardSkeleton from '@/shared/components/ui/GameCard/GameCardSkeleton';
import { useGames } from '@/core/hooks/useGames';
import { getT, type Lang } from '@/core/i18n/translations';
import styles from './styles/GamesGrid.module.css';

interface GamesGridProps {
  category: string;
  lang: Lang;
}

export default function GamesGrid({ category, lang }: GamesGridProps) {
  const g = getT(lang).games;
  const activeCategory = category === 'All' ? undefined : category;
  const { data: games, isLoading, isError } = useGames(activeCategory);

  if (isLoading) {
    return (
      <ul className={styles.grid} role="list">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i}>
            <GameCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (isError) {
    return <div className={styles.empty}><p>{g.noGames}</p></div>;
  }

  const list = games ?? [];

  return (
    <>
      <p className={styles.count}>{g.gamesFound(list.length)}</p>
      {list.length > 0 ? (
        <ul className={styles.grid} role="list">
          {list.map((game, i) => (
            <li key={game.id}>
              <GameCard game={game} playLabel={g.play} priority={i < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}><p>{g.noGames}</p></div>
      )}
    </>
  );
}
