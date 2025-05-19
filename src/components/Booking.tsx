
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

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:30 AM - 1:30 PM',
    '2:00 PM - 4:00 PM',
    '4:30 PM - 6:30 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the booking data to a server
    console.log({ name, email, phone, service, date, timeSlot });
    setBookingSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setTimeSlot('');
      setBookingSubmitted(false);
    }, 3000);
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
              {bookingSubmitted ? (
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <h3 className="text-xl font-medium text-green-600 mb-2">Booking Request Submitted!</h3>
                  <p className="text-green-600">
                    Thank you for your booking request. We will contact you soon to confirm your session.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="John Doe" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="your@email.com" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="+91 12345 67890" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Type</Label>
                      <Select value={service} onValueChange={setService} required>
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding Photography</SelectItem>
                          <SelectItem value="event">Event Coverage</SelectItem>
                          <SelectItem value="portrait">Portrait Session</SelectItem>
                          <SelectItem value="commercial">Commercial Photography</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                      <Label htmlFor="timeSlot">Preferred Time</Label>
                      <Select value={timeSlot} onValueChange={setTimeSlot} required>
                        <SelectTrigger id="timeSlot">
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="mt-6 space-y-4">
                        <div className="p-4 bg-primary/5 rounded-md">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Booking Details
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            <p>Selected Date: {date ? date.toLocaleDateString() : 'None'}</p>
                            <p>Time Slot: {timeSlot || 'None'}</p>
                            <p>Service: {service || 'None'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">Submit Booking Request</Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Booking;
