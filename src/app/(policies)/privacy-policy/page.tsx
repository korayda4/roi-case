import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getT, type Lang } from '@/core/i18n/translations';
import styles from '../_components/styles/policy.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const pol = getT(lang).policies;
  return { title: pol.privacy.title, description: pol.privacy.title + ' — Koray' };
}

export default async function PrivacyPolicyPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const pol = getT(lang).policies;
  const p = pol.privacy;

  return (
    <article>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{pol.eyebrow}</p>
        <h1 className={styles.title}>{p.title}</h1>
        <p className={styles.lastUpdated}>{pol.lastUpdated}</p>
      </header>

      <div className={styles.content}>
        <div className={styles.highlight}>{pol.caseStudyNotice}</div>

        <section className={styles.section} aria-labelledby="pp-info">
          <h2 id="pp-info" className={styles.sectionTitle}>{p.s1Heading}</h2>
          <p className={styles.text}>{p.s1Intro}</p>
          <ul className={styles.list}>
            {p.s1Items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="pp-use">
          <h2 id="pp-use" className={styles.sectionTitle}>{p.s2Heading}</h2>
          <ul className={styles.list}>
            {p.s2Items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="pp-rights">
          <h2 id="pp-rights" className={styles.sectionTitle}>{p.s3Heading}</h2>
          <ul className={styles.list}>
            {p.s3Items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="pp-contact">
          <h2 id="pp-contact" className={styles.sectionTitle}>{p.s4Heading}</h2>
          <p className={styles.text}>{p.s4Text}</p>
        </section>
      </div>
    </article>
  );
}
