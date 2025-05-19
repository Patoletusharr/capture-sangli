
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
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

type BookingFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  timeSlot: string;
};

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<BookingFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      timeSlot: '',
    }
  });

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:30 AM - 1:30 PM',
    '2:00 PM - 4:00 PM',
    '4:30 PM - 6:30 PM',
  ];

  const onSubmit = async (values: BookingFormValues) => {
    if (!date) {
      toast({
        title: "Missing date",
        description: "Please select a booking date",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('booking_requests')
        .insert([
          {
            name: values.name,
            email: values.email,
            phone: values.phone,
            service: values.service,
            booking_date: date.toISOString().split('T')[0],
            time_slot: values.timeSlot,
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Booking Submitted!",
        description: "Thank you for your booking request. We will contact you soon to confirm your session.",
      });
      
      form.reset();
      setDate(new Date());
    } catch (error) {
      console.error('Error submitting booking form:', error);
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
    <section id="booking" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Book a Session</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Schedule your photography session with us. Select a date, time, and service that works for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Booking Information</CardTitle>
              <CardDescription>Fill out the form below to book your photography session</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="John Doe" required />
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="+91 12345 67890" 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="wedding">Wedding Photography</SelectItem>
                              <SelectItem value="event">Event Coverage</SelectItem>
                              <SelectItem value="portrait">Portrait Session</SelectItem>
                              <SelectItem value="commercial">Commercial Photography</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <div className="border rounded-md p-2">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border pointer-events-auto"
                          disabled={(date) => {
                            // Disable dates in the past
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot} value={slot}>
                                    {slot}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-6 space-y-4">
                        <div className="p-4 bg-primary/5 rounded-md">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Booking Details
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            <p>Selected Date: {date ? date.toLocaleDateString() : 'None'}</p>
                            <p>Time Slot: {form.watch("timeSlot") || 'None'}</p>
                            <p>Service: {form.watch("service") || 'None'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Booking;
