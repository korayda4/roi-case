import { GameController, Monitor, Buildings, Code, CalendarBlank, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import type { GameDetail } from '@/shared/types';
import type { Translations } from '@/core/i18n/translations';
import Button from '@/shared/components/ui/Button/Button';
import styles from './styles/GameInfo.module.css';

interface GameInfoProps {
  game: GameDetail;
  t: Translations;
}

export default function GameInfo({ game, t }: GameInfoProps) {
  const g = t.games;

  const stats = [
    { icon: <GameController size={16} weight="fill" />, value: game.genre,       label: g.genre },
    { icon: <Monitor       size={16} weight="fill" />, value: game.platform,     label: g.platform },
    { icon: <Buildings     size={16} weight="fill" />, value: game.publisher,    label: g.publisher },
    { icon: <Code          size={16} weight="fill" />, value: game.developer,    label: g.developer },
    { icon: <CalendarBlank size={16} weight="fill" />, value: game.releaseDate,  label: g.releaseDate },
  ];

  return (
    <aside className={styles.aside}>
      <ul className={styles.statsList}>
        {stats.map(({ icon, value, label }) => (
          <li key={label} className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true">{icon}</span>
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statValue}>{value}</span>
          </li>
        ))}
      </ul>

      <Button
        as="link"
        href={game.gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.playBtn}
        size="lg"
        fullWidth
      >
        <ArrowSquareOut size={18} weight="bold" />
        {g.playNow}
      </Button>
    </aside>
  );
}
