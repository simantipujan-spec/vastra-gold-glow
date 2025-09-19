import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { ProductGrid } from '@/components/ProductGrid';

const Index = () => {

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
        </section>

        {/* Product Gallery */}
        <section>
          <ProductGrid />
        </section>
      </main>
    </div>
  );
};

export default Index;
