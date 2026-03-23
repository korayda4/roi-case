'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from '@phosphor-icons/react';
import { getT, type Lang } from '@/core/i18n/translations';
import Button from '@/shared/components/ui/Button/Button';
import styles from './styles/CookieConsent.module.css';

interface CookieConsentProps {
  onAnswer: () => void;
}

export default function CookieConsent({ onAnswer }: CookieConsentProps) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)lang=([^;]*)/);
    if (match?.[1] === 'tr') setLang('tr');
  }, []);

  const t = getT(lang).cookie;

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    onAnswer();
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    onAnswer();
  };

  return (
    <div className={styles.banner} role="region" aria-label="Cookie consent">
      <div className={styles.inner}>
        <span className={styles.icon} aria-hidden="true">
          <Cookie size={22} weight="fill" />
        </span>
        <p className={styles.text}>
          {t.message}{' '}
          <Link href="/cookie-policy" className={styles.link}>{t.policyLink}</Link>.
        </p>
        <div className={styles.actions}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={styles.btnReject}
            onClick={reject}
            aria-label="Reject cookies"
          >
            {t.reject}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className={styles.btnAccept}
            onClick={accept}
            aria-label="Accept cookies"
          >
            {t.accept}
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={styles.close}
          onClick={reject}
          aria-label="Dismiss"
        >
          <X size={16} weight="bold" />
        </Button>
      </div>
    </div>
  );
}
