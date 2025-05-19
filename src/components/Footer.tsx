
import React from 'react';
import { Camera } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-10 border-t">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Camera className="h-6 w-6 mr-2" />
            <span className="text-xl font-serif font-bold">
              <span className="text-primary">Capture</span>
              <span className="text-muted-foreground"> Sangli</span>
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['Home', 'Gallery', 'Services', 'Booking', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {currentYear} Capture Sangli. All rights reserved.</p>
          
          <div className="flex mt-4 md:mt-0 gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p>Follow us: <a href="https://instagram.com/capture_sangli" target="_blank" className="font-medium hover:text-primary transition-colors">@capture_sangli</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
