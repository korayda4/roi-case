import type { ReactNode } from 'react';
import styles from './styles/SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <header
      className={[styles.header, centered ? styles.centered : '', className].filter(Boolean).join(' ')}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}
