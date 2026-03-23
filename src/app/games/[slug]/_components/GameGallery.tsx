'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './styles/GameGallery.module.css';

interface GameGalleryProps {
  title: string;
  thumbnail: string;
  screenshots: { id: number; image: string }[];
  aboutSlot?: React.ReactNode;
}

export default function GameGallery({ title, thumbnail, screenshots, aboutSlot }: GameGalleryProps) {
  const images = [thumbnail, ...screenshots.map((s) => s.image)];
  const [active, setActive] = useState(0);

  return (
    <div className={styles.gallery}>
      {images.length > 1 && (
        <div className={styles.strip} role="list" aria-label="Game screenshots">
          {images.map((src, i) => (
            <button
              key={i}
              role="listitem"
              className={[styles.thumb, active === i ? styles.thumbActive : ''].join(' ')}
              onClick={() => setActive(i)}
              aria-label={i === 0 ? `${title} main image` : `Screenshot ${i}`}
              aria-pressed={active === i}
            >
              <Image src={src} alt="" fill sizes="72px" className={styles.thumbImg} />
            </button>
          ))}
        </div>
      )}

      <div className={styles.mainCol}>
        <div className={styles.main}>
          <Image
            src={images[active]}
            alt={`${title}${active > 0 ? ` screenshot ${active}` : ''}`}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className={styles.mainImg}
            priority
            loading="eager"
          />
        </div>
        {aboutSlot && <div className={styles.about}>{aboutSlot}</div>}
      </div>
    </div>
  );
}
