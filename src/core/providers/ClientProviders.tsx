'use client';

import { useState, useEffect, useCallback } from 'react';
import AgeVerification from '@/shared/components/overlays/AgeVerification/AgeVerification';
import CookieConsent from '@/shared/components/overlays/CookieConsent/CookieConsent';

type AgeStatus = 'loading' | 'pending' | 'verified' | 'denied';

export default function ClientProviders() {
  const [ageStatus, setAgeStatus] = useState<AgeStatus>('loading');
  const [cookieAnswered, setCookieAnswered] = useState(true);

  useEffect(() => {
    const age = localStorage.getItem('age-verified');
    const cookie = localStorage.getItem('cookie-consent');

    if (age === 'true') {
      setAgeStatus('verified');
      setCookieAnswered(cookie !== null);
    } else if (age === 'false') {
      setAgeStatus('denied');
    } else {
      setAgeStatus('pending');
    }
  }, []);

  const handleVerify = useCallback(() => {
    localStorage.setItem('age-verified', 'true');
    setAgeStatus('verified');
    const cookie = localStorage.getItem('cookie-consent');
    if (cookie === null) setCookieAnswered(false);
  }, []);

  const handleDeny = useCallback(() => {
    localStorage.setItem('age-verified', 'false');
    setAgeStatus('denied');
  }, []);

  const handleReset = useCallback(() => {
    localStorage.removeItem('age-verified');
    setAgeStatus('pending');
  }, []);

  const handleCookieAnswer = useCallback(() => {
    setCookieAnswered(true);
  }, []);

  return (
    <>
      <AgeVerification
        status={ageStatus}
        onVerify={handleVerify}
        onDeny={handleDeny}
        onReset={handleReset}
      />
      {ageStatus === 'verified' && !cookieAnswered && (
        <CookieConsent onAnswer={handleCookieAnswer} />
      )}
    </>
  );
}
