
import { useWatchlist } from '@/hooks/useWatchlist';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Calendar, Star } from 'lucide-react';
import { tmdbApi } from '@/services/tmdbApi';
import { AuthModal } from '@/components/auth/AuthModal';
import { useState } from 'react';

const Watchlist = () => {
  const { user } = useAuth();
  const { watchlist, loading, removeFromWatchlist } = useWatchlist();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Η Λίστα μου</h1>
          <p className="text-slate-400 mb-8">Πρέπει να συνδεθείτε για να δείτε τη λίστα σας</p>
          <Button
            onClick={() => setShowAuthModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Σύνδεση
          </Button>
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Η Λίστα μου</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-slate-800 rounded-lg h-96 mb-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Η Λίστα μου</h1>
      
      {watchlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg mb-4">Η λίστα σας είναι άδεια</p>
          <p className="text-slate-500">Προσθέστε ταινίες από την κεντρική σελίδα!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchlist.map((item) => (
            <Card key={item.id} className="bg-slate-800 border-slate-700 overflow-hidden">
              <div className="relative h-80">
                <img
                  src={tmdbApi.getImageUrl(item.movie_poster_path)}
                  alt={item.movie_title}
                  className="w-full h-full object-cover"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-3 right-3"
                  onClick={() => removeFromWatchlist(item.movie_id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
                  {item.movie_title}
                </h3>
                
                <div className="flex items-center text-slate-400 text-sm mb-3 space-x-4">
                  {item.movie_release_date && (
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.movie_release_date).getFullYear()}
                    </span>
                  )}
                  {item.movie_vote_average && (
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {item.movie_vote_average.toFixed(1)}
                    </span>
                  )}
                </div>

                <p className="text-slate-300 text-sm line-clamp-3">
                  {item.movie_overview || 'Δεν διατίθεται περιγραφή.'}
                </p>
                
                <p className="text-slate-500 text-xs mt-2">
                  Προστέθηκε: {new Date(item.added_at).toLocaleDateString('el-GR')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
