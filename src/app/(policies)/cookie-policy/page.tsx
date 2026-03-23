import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getT, type Lang } from '@/core/i18n/translations';
import styles from '../_components/styles/policy.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const pol = getT(lang).policies;
  return { title: pol.cookie.title, description: pol.cookie.title + ' — Koray' };
}

export default async function CookiePolicyPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const pol = getT(lang).policies;
  const c = pol.cookie;

  return (
    <article>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{pol.eyebrow}</p>
        <h1 className={styles.title}>{c.title}</h1>
        <p className={styles.lastUpdated}>{pol.lastUpdated}</p>
      </header>

      <div className={styles.content}>
        <div className={styles.highlight}>{pol.caseStudyNotice}</div>

        <section className={styles.section} aria-labelledby="cp-what">
          <h2 id="cp-what" className={styles.sectionTitle}>{c.s1Heading}</h2>
          <p className={styles.text}>{c.s1Text}</p>
        </section>

        <section className={styles.section} aria-labelledby="cp-types">
          <h2 id="cp-types" className={styles.sectionTitle}>{c.s2Heading}</h2>
          <ul className={styles.list}>
            {c.s2Items.map((item) => (
              <li key={item.label}><strong>{item.label}</strong> — {item.text}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="cp-control">
          <h2 id="cp-control" className={styles.sectionTitle}>{c.s3Heading}</h2>
          <p className={styles.text}>{c.s3Text}</p>
        </section>

        <section className={styles.section} aria-labelledby="cp-contact">
          <h2 id="cp-contact" className={styles.sectionTitle}>{c.s4Heading}</h2>
          <p className={styles.text}>{c.s4Text}</p>
        </section>
      </div>
    </article>
  );
}
