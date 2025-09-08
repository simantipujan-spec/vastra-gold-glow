import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter } from 'lucide-react';

// Import generated images
import ghagra1 from '@/assets/ghagra-1.jpg';
import ghagra2 from '@/assets/ghagra-2.jpg';
import ghagra3 from '@/assets/ghagra-3.jpg';
import jewelry1 from '@/assets/jewelry-1.jpg';
import jewelry2 from '@/assets/jewelry-2.jpg';
import jewelry3 from '@/assets/jewelry-3.jpg';

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'Royal Golden Ghagra',
    category: 'GHAGRA' as const,
    image: ghagra1,
    hoverImage: ghagra1,
    available: true
  },
  {
    id: '2',
    name: 'Traditional Red Lehenga',
    category: 'GHAGRA' as const,
    image: ghagra2,
    hoverImage: ghagra2,
    available: true
  },
  {
    id: '3',
    name: 'Diamond Necklace Set',
    category: 'JEWELLERY' as const,
    image: jewelry1,
    hoverImage: jewelry1,
    available: false
  },
  {
    id: '4',
    name: 'Emerald Earrings',
    category: 'JEWELLERY' as const,
    image: jewelry2,
    hoverImage: jewelry2,
    available: true
  },
  {
    id: '5',
    name: 'Silk Pink Ghagra',
    category: 'GHAGRA' as const,
    image: ghagra3,
    hoverImage: ghagra3,
    available: true
  },
  {
    id: '6',
    name: 'Pearl Bracelet',
    category: 'JEWELLERY' as const,
    image: jewelry3,
    hoverImage: jewelry3,
    available: true
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'ghagra' && product.category === 'GHAGRA') ||
                      (activeTab === 'jewellery' && product.category === 'JEWELLERY');
    return matchesSearch && matchesTab;
  });

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
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Product Gallery */}
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="glass-card">
                <TabsTrigger value="all" className="font-display">All Items</TabsTrigger>
                <TabsTrigger value="ghagra" className="font-display">Ghagra</TabsTrigger>
                <TabsTrigger value="jewellery" className="font-display">Jewellery</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ghagra" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.filter(p => p.category === 'GHAGRA').map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="jewellery" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.filter(p => p.category === 'JEWELLERY').map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No items found</p>
              <p className="text-muted-foreground">Try adjusting your search or browse all categories</p>
            </div>
          )}
        </section>

        {/* Admin Access Link */}
        <section className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>Admin access:</span>
            <Button variant="link" size="sm" onClick={() => window.location.href = '/admin'}>
              Login to Admin Panel
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
