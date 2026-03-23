import {
  Lightning,
  Lock,
  Trophy,
  DeviceMobile,
  UsersThree,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr';
import Container from '@/shared/components/ui/Container/Container';
import SectionHeader from '@/shared/components/ui/SectionHeader/SectionHeader';
import type { Translations } from '@/core/i18n/translations';
import styles from './styles/WhyChooseUs.module.css';

const icons = [
  <Lightning key="lightning" size={24} weight="fill" />,
  <Lock key="lock" size={24} weight="fill" />,
  <Trophy key="trophy" size={24} weight="fill" />,
  <DeviceMobile key="device" size={24} weight="fill" />,
  <UsersThree key="users" size={24} weight="fill" />,
  <Sparkle key="sparkle" size={24} weight="fill" />,
];

interface WhyChooseUsProps {
  t: Translations;
}

export default function WhyChooseUs({ t }: WhyChooseUsProps) {
  const s = t.sections.why;

  return (
    <section className={styles.section} id="why-choose-us" aria-labelledby="why-heading">
      <Container>
        <SectionHeader
          eyebrow={s.eyebrow}
          title={<span id="why-heading">{s.title}</span>}
          description={s.description}
          centered
        />
        <ul className={styles.grid} role="list">
          {s.advantages.map((item, i) => (
            <li key={item.title} className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                {icons[i]}
              </div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
