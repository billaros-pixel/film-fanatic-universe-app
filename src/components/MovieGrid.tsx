
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MovieCard } from '@/components/MovieCard';
import { tmdbApi, TMDBMovie } from '@/services/tmdbApi';

interface MovieGridProps {
  searchQuery: string;
  category: string;
}

export const MovieGrid = ({ searchQuery, category }: MovieGridProps) => {
  const [page, setPage] = useState(1);

  // Reset page when search query or category changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', category, searchQuery, page],
    queryFn: async () => {
      if (searchQuery.trim()) {
        return await tmdbApi.searchMovies(searchQuery, page);
      }
      
      switch (category) {
        case 'popular':
          return await tmdbApi.getPopularMovies(page);
        case 'top_rated':
          return await tmdbApi.getTopRatedMovies(page);
        case 'upcoming':
          return await tmdbApi.getUpcomingMovies(page);
        case 'now_playing':
          return await tmdbApi.getNowPlayingMovies(page);
        default:
          return await tmdbApi.getPopularMovies(page);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-slate-800 rounded-lg h-96 mb-4"></div>
            <div className="bg-slate-700 h-6 rounded mb-2"></div>
            <div className="bg-slate-700 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-lg mb-4">Σφάλμα κατά τη φόρτωση των ταινιών</p>
        <p className="text-slate-400">Παρακαλώ δοκιμάστε ξανά αργότερα</p>
      </div>
    );
  }

  const movies = data?.results || [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        {searchQuery ? `Αποτελέσματα Αναζήτησης για "${searchQuery}"` : 'Προτεινόμενες Ταινίες'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie: TMDBMovie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">Δεν βρέθηκαν ταινίες. Δοκιμάστε διαφορετική αναζήτηση.</p>
        </div>
      )}
    </div>
  );
};
