'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { FunnelSimple } from '@phosphor-icons/react';
import styles from './styles/GamesFilter.module.css';

const CATEGORIES = [
  'All',
  'shooter',
  'strategy',
  'mmorpg',
  'card',
  'racing',
  'sports',
  'battle-royale',
  'action-rpg',
  'puzzle',
] as const;

interface GamesFilterProps {
  current: string;
  filterLabel?: string;
  allLabel?: string;
}

export default function GamesFilter({ current, filterLabel = 'Filter:', allLabel = 'All' }: GamesFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setCategory = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (cat === 'All') {
        params.delete('category');
      } else {
        params.set('category', cat);
      }
      router.push(`/games?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className={styles.bar} role="group" aria-label="Filter games by category">
      <span className={styles.label} aria-hidden="true">
        <FunnelSimple size={16} />
        {filterLabel}
      </span>
      <div className={styles.pills}>
        {CATEGORIES.map((cat) => {
          const isActive = current === cat || (cat === 'All' && current === 'All');
          const label = cat === 'All' ? allLabel : cat;
          return (
            <button
              key={cat}
              className={[styles.pill, isActive ? styles.active : ''].join(' ')}
              onClick={() => setCategory(cat)}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
