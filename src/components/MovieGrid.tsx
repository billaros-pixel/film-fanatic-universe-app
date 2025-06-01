
import { useState, useEffect } from 'react';
import { MovieCard } from '@/components/MovieCard';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface MovieGridProps {
  searchQuery: string;
  category: string;
}

export const MovieGrid = ({ searchQuery, category }: MovieGridProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: "The Dark Knight",
        overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
        poster_path: "https://images.unsplash.com/photo-1478720568477-b956b24b4e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        release_date: "2008-07-18",
        vote_average: 9.0,
        vote_count: 2500000
      },
      {
        id: 2,
        title: "Inception",
        overview: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.",
        poster_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        release_date: "2010-07-16",
        vote_average: 8.8,
        vote_count: 2200000
      },
      {
        id: 3,
        title: "Interstellar",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        poster_path: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        release_date: "2014-11-07",
        vote_average: 8.6,
        vote_count: 1800000
      },
      {
        id: 4,
        title: "The Matrix",
        overview: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
        poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        release_date: "1999-03-31",
        vote_average: 8.7,
        vote_count: 1900000
      },
      {
        id: 5,
        title: "Pulp Fiction",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        poster_path: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        release_date: "1994-10-14",
        vote_average: 8.9,
        vote_count: 2100000
      },
      {
        id: 6,
        title: "The Godfather",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        poster_path: "https://images.unsplash.com/photo-1489599188041-d6ba9e166b41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        release_date: "1972-03-24",
        vote_average: 9.2,
        vote_count: 1700000
      }
    ];

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredMovies = mockMovies;
      
      if (searchQuery) {
        filteredMovies = mockMovies.filter(movie =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setMovies(filteredMovies);
      setLoading(false);
    }, 500);
  }, [searchQuery, category]);

  if (loading) {
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

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Movies'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No movies found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
};
