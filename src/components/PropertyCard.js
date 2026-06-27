'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Heart, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PropertyCard = ({ property }) => {
  const { id, title, price, location, type, bedrooms, bathrooms, area, status, property_images } = property;
  const imageUrl = property_images?.[0]?.image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop';
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="group relative">
      <Link href={`/properties/${id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-muted border border-border shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1 aspect-[4/3]">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <Badge variant={status === 'sold' ? 'secondary' : 'success'}>
              {status || 'available'}
            </Badge>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {type}
            </Badge>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFavorited(!favorited);
            }}
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Favorite"
          >
            <Heart
              size={18}
              className={cn(
                'transition-colors duration-300',
                favorited ? 'fill-red-500 text-red-500' : 'text-secondary/60'
              )}
            />
          </button>

          <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <Button variant="primary" size="sm" className="w-full backdrop-blur-sm bg-white/90 text-secondary hover:bg-white shadow-lg gap-2">
              View Details
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </Link>

      <div className="mt-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-lg font-bold text-secondary line-clamp-1">{title}</span>
            <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
              <MapPin size={12} />
              <span className="text-xs font-medium truncate">{location}</span>
            </div>
          </div>
          <span className="text-lg font-bold text-primary shrink-0 whitespace-nowrap">
            ${price?.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Bed size={14} className="text-muted-foreground/60" />
            <span className="font-medium">{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={14} className="text-muted-foreground/60" />
            <span className="font-medium">{bathrooms} Baths</span>
          </div>
          {area && (
            <div className="flex items-center gap-1.5">
              <Maximize2 size={14} className="text-muted-foreground/60" />
              <span className="font-medium">{area} sqft</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
