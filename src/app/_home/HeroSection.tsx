import Link from 'next/link';
import { ArrowRight, Play, Star, Users, GameController, JoystickIcon, PuzzlePieceIcon, CardsIcon, CrownIcon } from '@phosphor-icons/react/dist/ssr';
import Container from '@/shared/components/ui/Container/Container';
import type { Translations } from '@/core/i18n/translations';
import { HERO_CATEGORY_GRADIENTS } from '@/shared/constants/color';
import styles from './styles/HeroSection.module.css';

interface HeroSectionProps {
  t: Translations;
}

const categoryConfig = [
  { Icon: JoystickIcon,    gradient: HERO_CATEGORY_GRADIENTS.arcade,   count: '1,840', key: 'arcade'   as const },
  { Icon: PuzzlePieceIcon, gradient: HERO_CATEGORY_GRADIENTS.puzzle,   count: '1,120', key: 'puzzle'   as const },
  { Icon: CardsIcon,       gradient: HERO_CATEGORY_GRADIENTS.card,     count: '763',   key: 'card'     as const },
  { Icon: CrownIcon,       gradient: HERO_CATEGORY_GRADIENTS.strategy, count: '512',   key: 'strategy' as const },
];

export default function HeroSection({ t }: HeroSectionProps) {
  const h = t.hero;
  const l = t.footer.links;

  const labelMap = { arcade: l.arcade, puzzle: l.puzzle, card: l.card, strategy: l.strategy };

  return (
    <section className={styles.section} aria-label="Hero">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.pill}>
              <Star size={13} weight="fill" />
              <span>{h.pill}</span>
            </div>

            <h1 className={styles.headline}>
              {h.headline[0]}{' '}
              <span className={styles.accent}>{h.headline[1]}</span>{' '}
              {h.headline[2]}
            </h1>

            <p className={styles.subheadline}>{h.subheadline}</p>

            <div className={styles.actions}>
              <Link href="/games" className={styles.btnPrimary}>
                <Play size={18} weight="fill" />
                {h.cta}
              </Link>
              <Link href="/#how-to-play" className={styles.btnSecondary}>
                {h.howItWorks}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <Users size={18} weight="fill" />
                <span><strong>50K+</strong> {h.stats.players}</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.stat}>
                <GameController size={18} weight="fill" />
                <span><strong>100+</strong> {h.stats.games}</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.stat}>
                <Star size={18} weight="fill" />
                <span><strong>4.8</strong> {h.stats.rating}</span>
              </div>
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.widget}>
              <div className={styles.widgetHeader}>
                <span className={styles.liveDot} />
                <span>{h.stats.live}</span>
              </div>
              <div className={styles.ticker}>
                <div className={styles.tickerTrack}>
                  {[...categoryConfig, ...categoryConfig].map(({ Icon, gradient, count, key }, i) => (
                    <div key={`${key}-${i}`} className={styles.tickerItem}>
                      <div className={styles.tickerIcon} style={{ background: gradient }}>
                        <Icon size={20} weight="fill" />
                      </div>
                      <span className={styles.tickerName}>{labelMap[key]}</span>
                      <span className={styles.tickerCount}>{count} {h.stats.players}</span>
                      <span className={styles.tickerDot} />
                    </div>
                  ))}
                </div>
                <div className={styles.tickerMask} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
