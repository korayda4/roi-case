import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { ArrowLeft, GameController } from '@phosphor-icons/react/dist/ssr';
import Container from '@/shared/components/ui/Container/Container';
import { getT, type Lang } from '@/core/i18n/translations';
import type { GameDetail } from '@/shared/types';
import Accordion from '@/shared/components/ui/Accordion/Accordion';
import GameGallery from './_components/GameGallery';
import GameInfo from './_components/GameInfo';
import styles from './styles/game-detail.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface FTGDetail {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  status: string;
  screenshots: { id: number; image: string }[];
}

async function getGameById(id: number): Promise<GameDetail | null> {
  try {
    const { data } = await axios.get<FTGDetail>(
      `https://www.freetogame.com/api/game?id=${id}`
    );
    return {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      shortDescription: data.short_description,
      description: data.description,
      gameUrl: data.game_url,
      genre: data.genre,
      platform: data.platform,
      publisher: data.publisher,
      developer: data.developer,
      releaseDate: data.release_date,
      status: data.status,
      screenshots: data.screenshots ?? [],
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameById(parseInt(slug, 10));
  if (!game) return {};
  return { title: game.title, description: game.shortDescription };
}

export default async function GameDetailPage({ params }: PageProps) {
  const [{ slug }, cookieStore] = await Promise.all([params, cookies()]);
  const lang = (cookieStore.get('lang')?.value ?? 'en') as Lang;
  const t = getT(lang);

  const game = await getGameById(parseInt(slug, 10));
  if (!game) notFound();

  return (
    <div className={styles.page}>
      <Container>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/games" className={styles.back}>
            <ArrowLeft size={16} />
            <span>{t.games.allGames}</span>
          </Link>
          <span className={styles.breadDivider} aria-hidden="true">/</span>
          <span className={styles.breadCurrent} aria-current="page">
            <GameController size={14} weight="fill" />
            {game.title}
          </span>
        </nav>

        <h1 className={styles.title}>{game.title}</h1>
        <p className={styles.subtitle}>{game.shortDescription}</p>

        <div className={styles.layout}>
          <div className={styles.main}>
            <GameGallery
              title={game.title}
              thumbnail={game.thumbnail}
              screenshots={game.screenshots}
              aboutSlot={<Accordion items={[{ id: 'about', question: t.games.aboutGame, answer: game.description }]} />}
            />
          </div>
          <div className={styles.sidebar}>
            <GameInfo game={game} t={t} />
          </div>
        </div>
      </Container>
    </div>
  );
}
