'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, X } from '@phosphor-icons/react';
import LanguageSwitcher from '@/core/i18n/LanguageSwitcher';
import type { Lang, Translations } from '@/core/i18n/translations';
import styles from './styles/Header.module.css';

interface MobileMenuProps {
  lang: Lang;
  navT: Translations['nav'];
}

export default function MobileMenu({ lang, navT }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: navT.home, href: '/' },
    { label: navT.games, href: '/games' },
    { label: navT.howToPlay, href: '/#how-to-play' },
    { label: navT.about, href: '/#about' },
    { label: navT.faq, href: '/#faq' },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <button
        className={styles.menuToggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        {isOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
      </button>

      {isOpen && (
        <div className={styles.backdrop} onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      <nav
        id="mobile-nav"
        className={[styles.drawer, isOpen ? styles.drawerOpen : ''].join(' ')}
        aria-label="Mobile navigation"
      >
        <ul className={styles.drawerList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.drawerLink} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.drawerBottom}>
          <LanguageSwitcher current={lang} />
          <Link href="/games" className={styles.drawerCtaBtn} onClick={() => setIsOpen(false)}>
            {navT.playNow}
          </Link>
        </div>
      </nav>
    </>
  );
}
