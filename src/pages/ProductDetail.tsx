import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Heart, Eye, ArrowLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';

// Import generated images
import ghagra1 from '@/assets/ghagra-1.jpg';
import ghagra2 from '@/assets/ghagra-2.jpg';
import ghagra3 from '@/assets/ghagra-3.jpg';
import jewelry1 from '@/assets/jewelry-1.jpg';
import jewelry2 from '@/assets/jewelry-2.jpg';
import jewelry3 from '@/assets/jewelry-3.jpg';

const mockProducts = {
  '1': {
    id: '1',
    name: 'Royal Golden Ghagra',
    category: 'GHAGRA',
    images: [ghagra1, ghagra1],
    material: 'Silk with Zardozi work',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    available: true,
    description: 'Exquisite royal golden ghagra with intricate zardozi embroidery'
  },
  '2': {
    id: '2',
    name: 'Traditional Red Lehenga',
    category: 'GHAGRA',
    images: [ghagra2, ghagra2],
    material: 'Premium Silk with Gold Thread',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    available: true,
    description: 'Traditional red lehenga with detailed embroidery work'
  },
  '3': {
    id: '3',
    name: 'Diamond Necklace Set',
    category: 'JEWELLERY',
    images: [jewelry1, jewelry1],
    material: 'Sterling Silver with Diamonds',
    sizes: ['One Size'],
    available: false,
    description: 'Elegant diamond necklace set with matching earrings'
  },
  '4': {
    id: '4',
    name: 'Emerald Earrings',
    category: 'JEWELLERY',
    images: [jewelry2, jewelry2],
    material: 'Gold with Emerald Stones',
    sizes: ['One Size'],
    available: true,
    description: 'Beautiful emerald drop earrings with gold setting'
  },
  '5': {
    id: '5',
    name: 'Silk Pink Ghagra',
    category: 'GHAGRA',
    images: [ghagra3, ghagra3],
    material: 'Pure Silk with Rose Gold Thread',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    available: true,
    description: 'Delicate silk pink ghagra with elegant embroidery'
  },
  '6': {
    id: '6',
    name: 'Pearl Bracelet',
    category: 'JEWELLERY',
    images: [jewelry3, jewelry3],
    material: 'White Gold with Cultured Pearls',
    sizes: ['One Size'],
    available: true,
    description: 'Elegant pearl bracelet with white gold setting'
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const product = mockProducts[id as keyof typeof mockProducts];

  if (!product) {
    return <div className="min-h-screen bg-background text-foreground">Product not found</div>;
  }

  const handleBookingRequest = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Please select date and time slot",
        variant: "destructive"
      });
      return;
    }
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    toast({
      title: "Booking request sent",
      description: "You'll receive confirmation after admin approval."
    });
    setShowBookingModal(false);
    navigate('/my-bookings');
  };

  const slots = ['Morning (9-12 PM)', 'Afternoon (12-5 PM)', 'Evening (5-8 PM)'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-[600px] object-cover rounded-lg glass-card"
              />
              <Button
                variant="glass"
                size="icon"
                className="absolute top-4 right-4"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="glass"
                size="icon"
                className="absolute top-4 left-4"
              >
                <Eye className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Product Info & Booking */}
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4 text-primary border-primary">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-display font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {product.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-foreground">Material: </span>
                  <span className="text-muted-foreground">{product.material}</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Available Sizes: </span>
                  <div className="flex gap-2 mt-2">
                    {product.sizes.map(size => (
                      <Badge key={size} variant="secondary">{size}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Panel */}
            <Card className="glass-card p-6">
              <h3 className="text-xl font-display font-semibold mb-6 text-foreground">
                Availability & Book Slot
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-foreground">
                    <CalendarIcon className="inline w-4 h-4 mr-2" />
                    Select Date (20 Sep - 10 Oct)
                  </label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const start = new Date(2024, 8, 20); // Sept 20
                      const end = new Date(2024, 9, 10);   // Oct 10
                      return date < start || date > end;
                    }}
                    className="glass-card p-3 pointer-events-auto"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium mb-3 text-foreground">
                      <Clock className="inline w-4 h-4 mr-2" />
                      Select Time Slot
                    </label>
                    <div className="grid gap-2">
                      {slots.map(slot => (
                        <Button
                          key={slot}
                          variant={selectedSlot === slot ? "default" : "outline"}
                          onClick={() => setSelectedSlot(slot)}
                          className="justify-start"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handleBookingRequest}
                  disabled={!selectedDate || !selectedSlot}
                >
                  Request Booking
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  You'll receive confirmation after admin approval
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Booking Confirmation Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="glass-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Confirm Booking Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <p><span className="font-semibold">Product:</span> {product.name}</p>
              <p><span className="font-semibold">Date:</span> {selectedDate?.toLocaleDateString()}</p>
              <p><span className="font-semibold">Time:</span> {selectedSlot}</p>
              <p><span className="font-semibold">Contact:</span> {user?.name} ({user?.mobile})</p>
              <p><span className="font-semibold">College:</span> {user?.college}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="hero" onClick={confirmBooking}>
                Confirm Request
              </Button>
              <Button variant="outline" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="glass-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Login to Continue Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">You need to be logged in to book a slot.</p>
            <div className="flex gap-3">
              <Button variant="hero" onClick={() => navigate('/profile')}>
                Login / Register
              </Button>
              <Button variant="outline" onClick={() => setShowLoginModal(false)}>
                Continue as Guest (View Only)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;