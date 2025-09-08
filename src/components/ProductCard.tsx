import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  category: 'GHAGRA' | 'JEWELLERY';
  image: string;
  available: boolean;
  hoverImage?: string;
}

export const ProductCard = ({ id, name, category, image, available, hoverImage }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div 
      className="group relative glass-card overflow-hidden rounded-lg hover-lift transition-luxury"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`}>
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={isHovered && hoverImage ? hoverImage : image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="absolute top-3 left-3 right-3 flex justify-between">
        <Button
          variant="glass"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="glass"
          size="icon"
          onClick={() => setIsFavorited(!isFavorited)}
          className={`transition-colors ${isFavorited ? 'text-destructive' : ''}`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Availability Badge */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${available ? 'bg-success' : 'bg-muted-foreground'}`} />
          <span className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm ${
            available 
              ? 'bg-success/20 text-success' 
              : 'bg-muted/20 text-muted-foreground'
          }`}>
            {available ? 'Available' : 'Booked'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Badge 
          variant="outline" 
          className="mb-2 text-xs text-primary border-primary/30"
        >
          {category}
        </Badge>
        <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Preview only
        </p>
        
        {/* View Product CTA - appears on hover */}
        <Link to={`/product/${id}`}>
          <Button 
            variant="hero" 
            className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            View Product
          </Button>
        </Link>
      </div>
    </div>
  );
};