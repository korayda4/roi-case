'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import styles from './styles/ScrollToTop.module.css';

const SHOW_AT_SCROLL_Y = 420;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AT_SCROLL_Y);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={[styles.button, visible ? styles.visible : ''].filter(Boolean).join(' ')}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp size={18} weight="bold" />
    </button>
  );
}
