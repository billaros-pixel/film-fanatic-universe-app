
import { useState } from 'react';
import { Heart, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { tmdbApi, TMDBMovie } from '@/services/tmdbApi';

interface MovieCardProps {
  movie: TMDBMovie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const formatVoteCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300 hover:scale-105 group overflow-hidden">
      <div className="relative">
        {/* Movie Poster */}
        <div className="relative h-80 overflow-hidden rounded-t-lg">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-700 animate-pulse" />
          )}
          <img
            src={tmdbApi.getImageUrl(movie.poster_path)}
            alt={movie.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Προβολή Λεπτομερειών
            </Button>
          </div>

          {/* Like button */}
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-3 right-3 ${
              isLiked ? 'text-red-500' : 'text-white'
            } hover:text-red-500 transition-colors`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>

          {/* Rating badge */}
          <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-semibold">
            ⭐ {formatRating(movie.vote_average)}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
            {movie.title}
          </h3>
          
          <div className="flex items-center text-slate-400 text-sm mb-3 space-x-4">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(movie.release_date)}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {formatVoteCount(movie.vote_count)} ψήφοι
            </span>
          </div>

          <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
            {movie.overview || 'Δεν διατίθεται περιγραφή για αυτή την ταινία.'}
          </p>

          <div className="mt-4 flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Προσθήκη στη Λίστα
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
