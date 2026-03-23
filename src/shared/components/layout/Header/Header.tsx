import Link from 'next/link';
import { GameController } from '@phosphor-icons/react/dist/ssr';
import Container from '@/shared/components/ui/Container/Container';
import LanguageSwitcher from '@/core/i18n/LanguageSwitcher';
import type { Lang, Translations } from '@/core/i18n/translations';
import MobileMenu from './MobileMenu';
import styles from './styles/Header.module.css';

interface HeaderProps {
  lang: Lang;
  t: Translations;
}

export default function Header({ lang, t }: HeaderProps) {
  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.games, href: '/games' },
    { label: t.nav.howToPlay, href: '/#how-to-play' },
    { label: t.nav.about, href: '/#about' },
    { label: t.nav.faq, href: '/#faq' },
  ];

  return (
    <header className={styles.header} role="banner">
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label={`${t.brand} — Go to home`}>
            <span className={styles.logoIcon} aria-hidden="true">
              <GameController size={26} weight="fill" />
            </span>
            <span className={styles.logoText}>{t.brand}</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <LanguageSwitcher current={lang} />
            <Link href="/games" className={styles.ctaBtn}>
              {t.nav.playNow}
            </Link>
          </div>

          <MobileMenu lang={lang} navT={t.nav} />
        </div>
      </Container>
    </header>
  );
}
