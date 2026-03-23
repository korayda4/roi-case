import type { ReactNode } from 'react';
import Container from '@/shared/components/ui/Container/Container';
import styles from './_components/styles/policy.module.css';

export default function PolicyLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <Container narrow>
        {children}
      </Container>
    </div>
  );
}
