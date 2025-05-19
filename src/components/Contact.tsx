
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Image as ImageIcon } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log({ name, email, message });
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Get in Touch</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Have questions or want to discuss your photography needs? Reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Phone</h4>
                  <p className="text-white/80">+91 98765 43210</p>
                  <p className="text-white/80">Mon-Sat, 9am-6pm</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Email</h4>
                  <p className="text-white/80">info@capturesangli.com</p>
                  <p className="text-white/80">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Instagram</h4>
                  <p className="text-white/80">@capture_sangli</p>
                  <p className="text-white/80">Follow us for latest updates</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-serif font-semibold mb-4">Studio Location</h3>
              <p className="text-white/80 mb-2">123 Photography Street</p>
              <p className="text-white/80 mb-2">Sangli, Maharashtra 416416</p>
              <p className="text-white/80">India</p>
            </div>
          </div>
          
          <div>
            <Card className="bg-white text-foreground">
              <CardContent className="p-6">
                {submitted ? (
                  <div className="text-center p-6">
                    <h3 className="text-xl font-medium text-green-600 mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-foreground">Name</Label>
                      <Input
                        id="contact-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-foreground">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact-message" className="text-foreground">Message</Label>
                      <Textarea
                        id="contact-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
