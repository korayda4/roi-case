'use client';

import { useRouter } from 'next/navigation';
import type { Lang } from './translations';
import styles from './styles/LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  current: Lang;
  compact?: boolean;
}

export default function LanguageSwitcher({ current, compact = false }: LanguageSwitcherProps) {
  const router = useRouter();

  const switchLang = (lang: Lang) => {
    if (lang === current) return;
    document.cookie = `lang=${lang};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    router.refresh();
  };

  return (
    <div
      className={[styles.switcher, compact ? styles.compact : ''].filter(Boolean).join(' ')}
      role="group"
      aria-label="Language selection"
    >
      <button
        className={[styles.btn, current === 'en' ? styles.active : ''].filter(Boolean).join(' ')}
        onClick={() => switchLang('en')}
        aria-pressed={current === 'en'}
        lang="en"
      >
        EN
      </button>
      <span className={styles.divider} aria-hidden="true" />
      <button
        className={[styles.btn, current === 'tr' ? styles.active : ''].filter(Boolean).join(' ')}
        onClick={() => switchLang('tr')}
        aria-pressed={current === 'tr'}
        lang="tr"
      >
        TR
      </button>
    </div>
  );
}
