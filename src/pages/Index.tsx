
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import Booking from '@/components/Booking';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  // Animation on scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('is-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <div className="animate-on-scroll">
        <Gallery />
      </div>
      
      <div className="animate-on-scroll">
        <Services />
      </div>
      
      <div className="animate-on-scroll">
        <Booking />
      </div>
      
      <div className="animate-on-scroll">
        <Contact />
      </div>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
