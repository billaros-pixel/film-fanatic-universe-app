
import { useState, useEffect } from 'react';
import { supabase, Watchlist } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { TMDBMovie } from '@/services/tmdbApi';
import { toast } from 'sonner';

export const useWatchlist = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWatchlist = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', user.id)
      .order('added_at', { ascending: false });

    if (error) {
      console.error('Error fetching watchlist:', error);
    } else {
      setWatchlist(data || []);
    }
    setLoading(false);
  };

  const addToWatchlist = async (movie: TMDBMovie) => {
    if (!user) {
      toast.error('Πρέπει να συνδεθείτε για να προσθέσετε ταινίες στη λίστα σας');
      return;
    }

    const { error } = await supabase.from('watchlist').insert([
      {
        user_id: user.id,
        movie_id: movie.id,
        movie_title: movie.title,
        movie_poster_path: movie.poster_path,
        movie_overview: movie.overview,
        movie_release_date: movie.release_date,
        movie_vote_average: movie.vote_average,
      },
    ]);

    if (error) {
      toast.error('Σφάλμα κατά την προσθήκη στη λίστα');
      console.error('Error adding to watchlist:', error);
    } else {
      toast.success('Η ταινία προστέθηκε στη λίστα σας!');
      fetchWatchlist();
    }
  };

  const removeFromWatchlist = async (movieId: number) => {
    if (!user) return;

    const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', user.id)
      .eq('movie_id', movieId);

    if (error) {
      toast.error('Σφάλμα κατά την αφαίρεση από τη λίστα');
    } else {
      toast.success('Η ταινία αφαιρέθηκε από τη λίστα σας');
      fetchWatchlist();
    }
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some(item => item.movie_id === movieId);
  };

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    } else {
      setWatchlist([]);
    }
  }, [user]);

  return {
    watchlist,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    refetch: fetchWatchlist,
  };
};
