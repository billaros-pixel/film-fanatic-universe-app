
import { useState } from 'react';
import { User, LogOut, Heart, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from './AuthModal';

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowAuthModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <User className="h-4 w-4 mr-2" />
          Σύνδεση
        </Button>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-slate-700">
          <User className="h-5 w-5 mr-2" />
          {user.email}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
        <DropdownMenuItem className="hover:bg-slate-700">
          <Heart className="h-4 w-4 mr-2" />
          Η Λίστα μου
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-slate-700">
          <List className="h-4 w-4 mr-2" />
          Οι Κριτικές μου
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-600" />
        <DropdownMenuItem 
          onClick={signOut}
          className="hover:bg-slate-700 text-red-400"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Αποσύνδεση
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
