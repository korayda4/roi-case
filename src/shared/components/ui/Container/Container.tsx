import type { HTMLAttributes, ReactNode } from 'react';
import styles from './styles/Container.module.css';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  narrow?: boolean;
}

export default function Container({ children, narrow = false, className = '', ...rest }: ContainerProps) {
  return (
    <div
      className={[styles.container, narrow ? styles.narrow : '', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
