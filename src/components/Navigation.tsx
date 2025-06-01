
import { useState } from 'react';
import { Search, Film, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">CinemaHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              Discover
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              Movies
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              TV Shows
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              My Lists
            </a>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Discover
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Movies
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                TV Shows
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                My Lists
              </a>
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-800">
                <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
