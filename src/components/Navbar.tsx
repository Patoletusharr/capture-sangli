
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm py-3 shadow-sm'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold text-white">
          <span className={isScrolled ? 'text-primary' : 'text-white'}>Capture</span>
          <span className={cn(isScrolled ? 'text-muted-foreground' : 'text-white/80')}> Sangli</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {['Home', 'Gallery', 'Services', 'Booking', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                'font-medium transition-colors hover:text-primary/80',
                isScrolled ? 'text-foreground' : 'text-white'
              )}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className={cn('md:hidden', isScrolled ? 'text-foreground' : 'text-white')}
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full right-0 mt-2 w-48 bg-background shadow-lg rounded-md py-2 px-3 z-50">
            {['Home', 'Gallery', 'Services', 'Booking', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 px-4 text-foreground hover:bg-muted rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
