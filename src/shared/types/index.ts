export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  gameUrl: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  releaseDate: string;
}

export interface GameDetail extends Game {
  description: string;
  status: string;
  screenshots: { id: number; image: string }[];
}

export interface NavLink {
  label: string;
  href: string;
}
