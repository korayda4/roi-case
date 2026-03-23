import Image from 'next/image';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import styles from './styles/GameEmbed.module.css';

interface GameEmbedProps {
  title: string;
  thumbnail: string;
  gameUrl: string;
  playLabel?: string;
}

export default function GameEmbed({ title, thumbnail, gameUrl, playLabel = 'Play Now' }: GameEmbedProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.preview}>
        <Image
          src={thumbnail}
          alt={`${title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className={styles.image}
          priority
        />
        <div className={styles.overlay}>
          <a
            href={gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.playBtn}
            aria-label={`${playLabel} ${title}`}
          >
            <ArrowSquareOut size={20} weight="bold" />
            {playLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
