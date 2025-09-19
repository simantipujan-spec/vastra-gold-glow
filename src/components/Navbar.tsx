import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Heart, 
  Bell, 
  Menu, 
  X,
  Home,
  Calendar,
  UserCircle 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        {/* Mobile Top Bar */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-xl font-display font-bold text-primary">
                Vastraveda
              </Link>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-destructive"></Badge>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
            
            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ghagra, jewellery..."
                  className="pl-10 glass-card"
                />
              </div>
            </form>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-[120px] right-0 bottom-0 w-64 bg-card border-l border-border p-4">
              <nav className="space-y-4">
                <Link 
                  to="/" 
                  className="flex items-center gap-3 text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                <Link 
                  to={isAuthenticated ? "/my-bookings" : "/profile"} 
                  className="flex items-center gap-3 text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5" />
                  My Bookings
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserCircle className="w-5 h-5" />
                  Profile
                </Link>
                {!isAuthenticated && (
                  <Button variant="hero" className="w-full" onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}>
                    Login
                  </Button>
                )}
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
          <div className="grid grid-cols-4 gap-1 p-2">
            <Link 
              to="/" 
              className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link 
              to={isAuthenticated ? "/my-bookings" : "/profile"} 
              className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary"
            >
              <Calendar className="w-5 h-5" />
              Bookings
            </Link>
            <Link 
              to="/profile" 
              className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary"
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
          </div>
        </nav>
      </>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-bold text-primary">
            Vastraveda
          </Link>


          {/* Navigation Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-destructive"></Badge>
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name}
                </span>
                <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
                  <User className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => navigate('/profile')}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};