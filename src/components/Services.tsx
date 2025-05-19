
import React from 'react';
import { Camera, Video, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const servicesData = [
  {
    icon: <Camera className="h-10 w-10" />,
    title: 'Wedding Photography',
    description:
      'Capture your special day with our professional wedding photography services. We focus on candid moments and emotions.',
  },
  {
    icon: <Video className="h-10 w-10" />,
    title: 'Event Videography',
    description:
      'High-quality video coverage for all types of events. We provide cinematic editing and storytelling.',
  },
  {
    icon: <ImageIcon className="h-10 w-10" />,
    title: 'Portrait Sessions',
    description:
      'Individual or family portrait sessions in studio or at outdoor locations of your choice.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a wide range of photography and videography services to meet all your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg border-none bg-white">
              <CardHeader className="flex items-center text-center">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center bg-primary/5 p-8 rounded-lg">
          <h3 className="text-2xl font-serif font-bold mb-4">Custom Photography Packages</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We understand that every client has unique needs. Contact us to create a customized photography package
            that suits your specific requirements and budget.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
