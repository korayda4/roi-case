import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getT, type Lang } from '@/core/i18n/translations';
import styles from '../_components/styles/policy.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const pol = getT(lang).policies;
  return { title: pol.terms.title, description: pol.terms.title + ' — Koray' };
}

export default async function TermsPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const pol = getT(lang).policies;
  const t = pol.terms;

  return (
    <article>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{pol.eyebrow}</p>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.lastUpdated}>{pol.lastUpdated}</p>
      </header>

      <div className={styles.content}>
        <div className={styles.highlight}>{pol.caseStudyNotice}</div>

        <section className={styles.section} aria-labelledby="tos-eligibility">
          <h2 id="tos-eligibility" className={styles.sectionTitle}>{t.s1Heading}</h2>
          <p className={styles.text}>{t.s1Text}</p>
        </section>

        <section className={styles.section} aria-labelledby="tos-use">
          <h2 id="tos-use" className={styles.sectionTitle}>{t.s2Heading}</h2>
          <p className={styles.text}>{t.s2Intro}</p>
          <ul className={styles.list}>
            {t.s2Items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="tos-ip">
          <h2 id="tos-ip" className={styles.sectionTitle}>{t.s3Heading}</h2>
          <p className={styles.text}>{t.s3Text}</p>
        </section>

        <section className={styles.section} aria-labelledby="tos-disclaimer">
          <h2 id="tos-disclaimer" className={styles.sectionTitle}>{t.s4Heading}</h2>
          <p className={styles.text}>{t.s4Text}</p>
        </section>

        <section className={styles.section} aria-labelledby="tos-contact">
          <h2 id="tos-contact" className={styles.sectionTitle}>{t.s5Heading}</h2>
          <p className={styles.text}>{t.s5Text}</p>
        </section>
      </div>
    </article>
  );
}
