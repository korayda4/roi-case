import Link from 'next/link';
import { GameController, GithubLogo, TwitterLogo, InstagramLogo } from '@phosphor-icons/react/dist/ssr';
import Container from '@/shared/components/ui/Container/Container';
import AppLink from '@/shared/components/ui/AppLink/AppLink';
import type { Translations } from '@/core/i18n/translations';
import styles from './styles/Footer.module.css';

interface FooterProps {
  t: Translations;
}

export default function Footer({ t }: FooterProps) {
  const f = t.footer;

  return (
    <footer className={styles.footer} role="contentinfo">
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label={`${t.brand} — Go to home`}>
              <span className={styles.logoIcon} aria-hidden="true">
                <GameController size={22} weight="fill" />
              </span>
              <span className={styles.logoText}>{t.brand}</span>
            </Link>
            <p className={styles.tagline}>{f.tagline}</p>
            <div className={styles.socials}>
              <AppLink href="#" aria-label="Twitter" className={styles.socialLink}>
                <TwitterLogo size={18} weight="fill" />
              </AppLink>
              <AppLink href="#" aria-label="Instagram" className={styles.socialLink}>
                <InstagramLogo size={18} weight="fill" />
              </AppLink>
              <AppLink href="https://github.com/korayda4/roi-case" aria-label="GitHub" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                <GithubLogo size={18} weight="fill" />
              </AppLink>
            </div>
          </div>

          <nav aria-label={f.columns.games}>
            <h3 className={styles.colTitle}>{f.columns.games}</h3>
            <ul className={styles.linkList}>
              <li><Link href="/games" className={styles.link}>{f.links.allGames}</Link></li>
              <li><Link href="/games?category=Arcade" className={styles.link}>{f.links.arcade}</Link></li>
              <li><Link href="/games?category=Puzzle" className={styles.link}>{f.links.puzzle}</Link></li>
              <li><Link href="/games?category=Strategy" className={styles.link}>{f.links.strategy}</Link></li>
              <li><Link href="/games?category=Card" className={styles.link}>{f.links.card}</Link></li>
            </ul>
          </nav>

          <nav aria-label={f.columns.company}>
            <h3 className={styles.colTitle}>{f.columns.company}</h3>
            <ul className={styles.linkList}>
              <li><Link href="/#about" className={styles.link}>{f.links.about}</Link></li>
              <li><Link href="/#how-to-play" className={styles.link}>{f.links.howToPlay}</Link></li>
              <li><Link href="/#faq" className={styles.link}>{f.links.faq}</Link></li>
            </ul>
          </nav>

          <nav aria-label={f.columns.legal}>
            <h3 className={styles.colTitle}>{f.columns.legal}</h3>
            <ul className={styles.linkList}>
              <li><Link href="/privacy-policy" className={styles.link}>{f.links.privacy}</Link></li>
              <li><Link href="/cookie-policy" className={styles.link}>{f.links.cookies}</Link></li>
              <li><Link href="/terms" className={styles.link}>{f.links.terms}</Link></li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.disclaimer}>{f.disclaimer}</p>
          <p className={styles.copyright}>{f.copyright(new Date().getFullYear())}</p>
        </div>
      </Container>
    </footer>
  );
}
