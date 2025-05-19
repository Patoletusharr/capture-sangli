
import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")',
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        <div className="animate-fade-in max-w-4xl mx-auto">
          <div className="mb-8 inline-block p-2 rounded-full bg-primary/10 backdrop-blur-sm">
            <Camera className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Capturing Moments, <br />
            <span className="text-3xl md:text-5xl lg:text-6xl text-white/80">Creating Memories</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Professional photography services in Sangli, Maharashtra. 
            We specialize in weddings, events, portraits and more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-md text-lg" asChild>
              <a href="#booking">Book a Session</a>
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 rounded-md text-lg" asChild>
              <a href="#gallery">View Gallery</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/70 text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
