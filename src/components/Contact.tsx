
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: values.name,
            email: values.email,
            message: values.message
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Your Name" required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="your@email.com" 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about your requirements..."
                              rows={5}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
