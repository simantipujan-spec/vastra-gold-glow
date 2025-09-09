import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { ProductGrid } from '@/components/ProductGrid';
import { Search } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 mb-12">
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Premium Collection
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover exquisite ghagra and jewellery pieces for your special occasions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search collection..."
                  className="pl-10 glass-card"
                />
              </div>
            </form>
          </div>
        </section>

        {/* Product Gallery */}
        <section>
          <ProductGrid />
        </section>

        {/* Admin Access Button */}
        <section className="mt-16 text-center">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/admin'}
            className="glass-card"
          >
            Login to Admin Panel
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Index;
