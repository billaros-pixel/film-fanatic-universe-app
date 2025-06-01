
import { Button } from '@/components/ui/button';
import { Heart, User } from 'lucide-react';

export const MovieHero = () => {
  return (
    <div className="relative h-[70vh] bg-gradient-to-r from-slate-900 via-blue-900/20 to-slate-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489599188041-d6ba9e166b41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Amazing
            <span className="text-blue-400 block">Movies & Shows</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Explore millions of movies and TV shows. Create your personal watchlist, 
            rate your favorites, and discover your next binge-watch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Exploring
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3"
            >
              <Heart className="mr-2 h-5 w-5" />
              My Watchlist
            </Button>
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
    </div>
  );
};
