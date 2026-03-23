import apiClient from '@/core/api/apiClient';
import type { Game, GameDetail } from '@/shared/types';

interface FTGGame {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
}

interface FTGDetail extends FTGGame {
  description: string;
  status: string;
  screenshots: { id: number; image: string }[];
}

function mapGame(g: FTGGame): Game {
  return {
    id: g.id,
    title: g.title,
    thumbnail: g.thumbnail,
    shortDescription: g.short_description,
    gameUrl: g.game_url,
    genre: g.genre,
    platform: g.platform,
    publisher: g.publisher,
    developer: g.developer,
    releaseDate: g.release_date,
  };
}

export async function fetchAllGames(): Promise<Game[]> {
  const { data } = await apiClient.get<FTGGame[]>('/games');
  return data.map(mapGame);
}

export async function fetchGamesByCategory(category: string): Promise<Game[]> {
  const { data } = await apiClient.get<FTGGame[]>(`/games?category=${category}`);
  return data.map(mapGame);
}

export async function fetchFeaturedGames(): Promise<Game[]> {
  const games = await fetchAllGames();
  return games.slice(0, 3);
}

export async function fetchGameById(id: number): Promise<GameDetail> {
  const { data } = await apiClient.get<FTGDetail>(`/games/${id}`);
  return {
    ...mapGame(data),
    description: data.description,
    status: data.status,
    screenshots: data.screenshots ?? [],
  };
}
