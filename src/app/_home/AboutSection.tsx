import { Heart, Globe, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import Container from '@/shared/components/ui/Container/Container';
import type { Translations } from '@/core/i18n/translations';
import styles from './styles/AboutSection.module.css';

const valueIcons = [
  <Heart key="heart" size={20} weight="fill" />,
  <Globe key="globe" size={20} weight="fill" />,
  <ShieldCheck key="shield" size={20} weight="fill" />,
];

interface AboutSectionProps {
  t: Translations;
}

export default function AboutSection({ t }: AboutSectionProps) {
  const s = t.sections.about;

  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <Container>
        <div className={styles.grid}>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.blob} />
            <div className={styles.statsCard}>
              <div className={styles.statRow}>
                <span className={styles.statValue}>50K+</span>
                <span className={styles.statLabel}>{s.stats.players}</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.statRow}>
                <span className={styles.statValue}>100+</span>
                <span className={styles.statLabel}>{s.stats.games}</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.statRow}>
                <span className={styles.statValue}>40+</span>
                <span className={styles.statLabel}>{s.stats.countries}</span>
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>{s.eyebrow}</p>
            <h2 id="about-heading" className={styles.title}>{s.title}</h2>
            <p className={styles.body}>{s.body1}</p>
            <p className={styles.body}>{s.body2}</p>
            <ul className={styles.values} role="list">
              {s.values.map((v, i) => (
                <li key={v.label} className={styles.value}>
                  <span className={styles.valueIcon} aria-hidden="true">{valueIcons[i]}</span>
                  <div>
                    <strong className={styles.valueLabel}>{v.label}</strong>
                    <p className={styles.valueText}>{v.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
