import Link from 'next/link';
import { UserCircle, MagnifyingGlass, GameController, Trophy } from '@phosphor-icons/react/dist/ssr';
import Container from '@/shared/components/ui/Container/Container';
import SectionHeader from '@/shared/components/ui/SectionHeader/SectionHeader';
import type { Translations } from '@/core/i18n/translations';
import styles from './styles/HowToPlay.module.css';

const icons = [
  <UserCircle key="user" size={28} weight="fill" />,
  <MagnifyingGlass key="search" size={28} weight="fill" />,
  <GameController key="game" size={28} weight="fill" />,
  <Trophy key="trophy" size={28} weight="fill" />,
];

interface HowToPlayProps {
  t: Translations;
}

export default function HowToPlay({ t }: HowToPlayProps) {
  const s = t.sections.howToPlay;

  return (
    <section className={styles.section} id="how-to-play" aria-labelledby="how-heading">
      <Container>
        <SectionHeader
          eyebrow={s.eyebrow}
          title={<span id="how-heading">{s.title}</span>}
          description={s.description}
          centered
        />

        <ol className={styles.steps}>
          {s.steps.map((item, index) => (
            <li key={item.step} className={styles.step}>
              <div className={styles.connector}>
                <div className={styles.stepBadge}>{item.step}</div>
                {index < s.steps.length - 1 && <div className={styles.line} aria-hidden="true" />}
              </div>
              <div className={styles.body}>
                <div className={styles.iconWrap} aria-hidden="true">
                  {icons[index]}
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.cta}>
          <Link href="/games" className={styles.ctaBtn}>
            <GameController size={20} weight="fill" />
            {s.cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
