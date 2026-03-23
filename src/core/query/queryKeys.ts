export const queryKeys = {
  games: {
    all: ['games'] as const,
    list: (category?: string) => ['games', 'list', category ?? 'all'] as const,
    featured: ['games', 'featured'] as const,
    detail: (id: number) => ['games', 'detail', id] as const,
  },
};
