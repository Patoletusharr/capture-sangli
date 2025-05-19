
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image as ImageIcon, Video } from 'lucide-react';

// Example gallery items
const galleryItems = [
  {
    id: 1,
    type: 'image',
    category: 'wedding',
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Wedding photography',
  },
  {
    id: 2,
    type: 'image',
    category: 'portrait',
    src: 'https://images.unsplash.com/photo-1502726299822-6f583f972e02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    alt: 'Portrait photography',
  },
  {
    id: 3,
    type: 'image',
    category: 'event',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    alt: 'Event photography',
  },
  {
    id: 4,
    type: 'image',
    category: 'wedding',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Wedding photography',
  },
  {
    id: 5,
    type: 'video',
    category: 'wedding',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    alt: 'Wedding videography',
  },
  {
    id: 6,
    type: 'image',
    category: 'portrait',
    src: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80',
    alt: 'Portrait photography',
  },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = ['all', 'wedding', 'portrait', 'event'];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse portfolio showcasing our finest photography and videography work
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? 'default' : 'outline'}
              onClick={() => setActiveFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-0 relative">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/70 p-2 rounded-full">
                  {item.type === 'video' ? (
                    <Video className="h-4 w-4 text-white" />
                  ) : (
                    <ImageIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="text-white capitalize font-medium">{item.category}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-10">
          <Button variant="outline" className="px-8 py-6 text-base">
            Load More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
