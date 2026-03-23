'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchAllGames,
  fetchFeaturedGames,
  fetchGameById,
  fetchGamesByCategory,
} from '@/services/gamesService';
import { queryKeys } from '@/core/query/queryKeys';

export function useGames(category?: string) {
  return useQuery({
    queryKey: queryKeys.games.list(category),
    queryFn: () => (category ? fetchGamesByCategory(category) : fetchAllGames()),
  });
}

export function useFeaturedGames() {
  return useQuery({
    queryKey: queryKeys.games.featured,
    queryFn: fetchFeaturedGames,
  });
}

export function useGame(id: number) {
  return useQuery({
    queryKey: queryKeys.games.detail(id),
    queryFn: () => fetchGameById(id),
    enabled: !!id,
  });
}
