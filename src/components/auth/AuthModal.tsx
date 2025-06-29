
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(`Σφάλμα σύνδεσης: ${error.message}`);
        } else {
          toast.success('Επιτυχής σύνδεση!');
          onClose();
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          toast.error(`Σφάλμα εγγραφής: ${error.message}`);
        } else {
          toast.success('Επιτυχής εγγραφή! Ελέγξτε το email σας για επιβεβαίωση.');
          onClose();
        }
      }
    } catch (error) {
      toast.error('Παρουσιάστηκε σφάλμα. Δοκιμάστε ξανά.');
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            {isLogin ? 'Σύνδεση' : 'Εγγραφή'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Κωδικός</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Παρακαλώ περιμένετε...' : (isLogin ? 'Σύνδεση' : 'Εγγραφή')}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            {isLogin ? 'Δεν έχετε λογαριασμό; Εγγραφείτε' : 'Έχετε ήδη λογαριασμό; Συνδεθείτε'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
