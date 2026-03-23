import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Badge from '@/shared/components/ui/Badge/Badge';
import type { Game } from '@/shared/types';
import styles from './styles/GameCard.module.css';

interface GameCardProps {
  game: Game;
  playLabel?: string;
  priority?: boolean;
}

export default function GameCard({ game, playLabel = 'Play', priority = false }: GameCardProps) {
  return (
    <article>
      <Link href={`/games/${game.id}`} className={styles.card} aria-label={`${playLabel} ${game.title}`}>
        <div className={styles.thumbnail}>
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            className={styles.image}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
          <Badge variant="accent" className={styles.genre}>
            {game.genre}
          </Badge>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{game.title}</h3>
          <p className={styles.desc}>{game.shortDescription}</p>
          <div className={styles.footer}>
            <span className={styles.platform}>{game.platform}</span>
            <span className={styles.play}>
              {playLabel}
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
