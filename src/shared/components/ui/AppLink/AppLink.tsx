import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
}

export default function AppLink({ href, children, ...rest }: AppLinkProps) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    const rel = rest.rel ?? 'noopener noreferrer';
    const target = rest.target ?? '_blank';
    return (
      <a href={href} rel={rel} target={target} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
