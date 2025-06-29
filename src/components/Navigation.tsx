
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Film, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/auth/UserMenu';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">MovieApp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Αρχική
            </Link>
            <Link 
              to="/watchlist" 
              className="flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <Heart className="h-4 w-4 mr-1" />
              Η Λίστα μου
            </Link>
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Αρχική
              </Link>
              <Link 
                to="/watchlist" 
                className="flex items-center text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-4 w-4 mr-2" />
                Η Λίστα μου
              </Link>
              <div className="pt-2">
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
