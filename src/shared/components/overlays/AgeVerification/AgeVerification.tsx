'use client';

import { useState, useEffect } from 'react';
import { GameController, ShieldCheck, Warning } from '@phosphor-icons/react';
import { getT, type Lang } from '@/core/i18n/translations';
import AppLink from '@/shared/components/ui/AppLink/AppLink';
import Button from '@/shared/components/ui/Button/Button';
import styles from './styles/AgeVerification.module.css';

interface AgeVerificationProps {
  status: 'loading' | 'pending' | 'verified' | 'denied';
  onVerify: () => void;
  onDeny: () => void;
  onReset: () => void;
}

export default function AgeVerification({ status, onVerify, onDeny, onReset }: AgeVerificationProps) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)lang=([^;]*)/);
    if (match?.[1] === 'tr') setLang('tr');
  }, []);

  const switchLang = (next: Lang) => {
    document.cookie = `lang=${next};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    setLang(next);
  };

  const t = getT(lang);
  const av = t.ageVerification;

  if (status === 'loading') {
    return <div className={styles.loadingScreen} aria-hidden="true" />;
  }

  if (status === 'verified') return null;

  if (status === 'denied') {
    return (
      <div className={styles.overlay} role="alertdialog" aria-modal="true" aria-labelledby="av-denied-title">
        <div className={styles.card}>
          <div className={styles.langRow}>
            <LangToggle current={lang} onChange={switchLang} />
          </div>
          <div className={styles.iconWrap} data-variant="warning">
            <Warning size={40} weight="fill" />
          </div>
          <h2 id="av-denied-title" className={styles.title}>{av.deniedTitle}</h2>
          <p className={styles.body}>{av.deniedDescription}</p>
          <Button
            type="button"
            variant="ghost"
            size="md"
            fullWidth
            className={styles.btnSecondary}
            onClick={onReset}
          >
            {av.goBack}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="av-title">
      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.logoRow}>
            <span className={styles.logoIcon} aria-hidden="true">
              <GameController size={24} weight="fill" />
            </span>
            <span className={styles.logoText}>{t.brand}</span>
          </div>
          <LangToggle current={lang} onChange={switchLang} />
        </div>

        <div className={styles.iconWrap} data-variant="accent">
          <ShieldCheck size={40} weight="fill" />
        </div>

        <h2 id="av-title" className={styles.title}>{av.title}</h2>
        <p className={styles.body}>{av.description}</p>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            className={styles.btnPrimary}
            onClick={onVerify}
          >
            {av.confirm}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="md"
            fullWidth
            className={styles.btnSecondary}
            onClick={onDeny}
          >
            {av.deny}
          </Button>
        </div>

        <p className={styles.legal}>
          {av.legalPrefix}{' '}
          <AppLink href="/terms">{av.termsLink}</AppLink>.
        </p>
      </div>
    </div>
  );
}

function LangToggle({ current, onChange }: { current: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className={styles.langSwitcher} role="group" aria-label="Language selection">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={[styles.langBtn, current === 'en' ? styles.langActive : ''].filter(Boolean).join(' ')}
        onClick={() => onChange('en')}
        aria-pressed={current === 'en'}
        lang="en"
      >
        EN
      </Button>
      <span className={styles.langDivider} aria-hidden="true" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={[styles.langBtn, current === 'tr' ? styles.langActive : ''].filter(Boolean).join(' ')}
        onClick={() => onChange('tr')}
        aria-pressed={current === 'tr'}
        lang="tr"
      >
        TR
      </Button>
    </div>
  );
}
