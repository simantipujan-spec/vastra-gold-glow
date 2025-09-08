import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, MessageSquare, X } from 'lucide-react';

interface UserBooking {
  id: string;
  productName: string;
  productImage: string;
  date: string;
  slot: string;
  status: 'Pending' | 'Accepted' | 'Cancelled';
  requestDate: string;
}

const MyBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<UserBooking[]>([
    {
      id: '1',
      productName: 'Royal Golden Ghagra',
      productImage: '/api/placeholder/400/300',
      date: '2024-09-25',
      slot: 'Evening (5-8 PM)',
      status: 'Pending',
      requestDate: '2024-09-20'
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'Cancelled' as const }
          : booking
      )
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-foreground mb-8">
            My Bookings
          </h1>

          {bookings.length === 0 ? (
            <Card className="glass-card text-center p-12">
              <CardContent className="space-y-4">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold text-foreground">No bookings yet</h3>
                <p className="text-muted-foreground">Start browsing our collection to make your first booking</p>
                <Button variant="hero" onClick={() => navigate('/')}>
                  Browse Collection
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {bookings.map(booking => (
                <Card key={booking.id} className="glass-card hover-lift">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={booking.productImage}
                        alt={booking.productName}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-display font-semibold text-foreground">
                              {booking.productName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Requested on {new Date(booking.requestDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge 
                            variant={
                              booking.status === 'Accepted' ? 'default' : 
                              booking.status === 'Pending' ? 'secondary' : 'destructive'
                            }
                            className={
                              booking.status === 'Pending' ? 'bg-warning/20 text-warning border-warning/30' :
                              booking.status === 'Accepted' ? 'bg-success/20 text-success border-success/30' :
                              'bg-destructive/20 text-destructive border-destructive/30'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {booking.slot}
                          </span>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contact Admin
                          </Button>
                          
                          {booking.status === 'Pending' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel Request
                            </Button>
                          )}
                          
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>

                        {booking.status === 'Accepted' && (
                          <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded-lg">
                            <p className="text-sm text-success font-medium">
                              ✓ Booking confirmed! Please arrive on time for your scheduled slot.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyBookings;