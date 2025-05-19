
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type BookingRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  booking_date: string;
  time_slot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
};

const Admin = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load contact submissions',
        variant: 'destructive',
      });
      return;
    }

    setContacts(data as ContactSubmission[]);
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('booking_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load booking requests',
        variant: 'destructive',
      });
      return;
    }

    setBookings(data as BookingRequest[]);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchContacts(), fetchBookings()]);
      setLoading(false);
    };

    loadData();
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('booking_requests')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update booking status',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Status Updated',
      description: `Booking status changed to ${status}`,
    });

    // Refresh bookings
    fetchBookings();
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="bookings">
        <TabsList className="mb-6">
          <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
          <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
            
            {loading ? (
              <p>Loading bookings...</p>
            ) : (
              <Table>
                <TableCaption>List of photography booking requests</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center">No booking requests found</TableCell>
                    </TableRow>
                  ) : (
                    bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{formatDate(booking.created_at)}</TableCell>
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.email}</TableCell>
                        <TableCell>{booking.phone}</TableCell>
                        <TableCell>
                          {booking.service === 'wedding' ? 'Wedding Photography' :
                           booking.service === 'event' ? 'Event Coverage' :
                           booking.service === 'portrait' ? 'Portrait Session' :
                           booking.service === 'commercial' ? 'Commercial Photography' :
                           booking.service}
                        </TableCell>
                        <TableCell>{formatDate(booking.booking_date)}</TableCell>
                        <TableCell>{booking.time_slot}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            defaultValue={booking.status}
                            onValueChange={(value) => updateBookingStatus(booking.id, value)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirm</SelectItem>
                              <SelectItem value="cancelled">Cancel</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="contacts">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Submissions</h2>
            
            {loading ? (
              <p>Loading contact submissions...</p>
            ) : (
              <Table>
                <TableCaption>List of contact form submissions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">No contact submissions found</TableCell>
                    </TableRow>
                  ) : (
                    contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{formatDate(contact.created_at)}</TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell className="max-w-md">
                          <div className="truncate">{contact.message}</div>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-sm"
                            onClick={() => {
                              toast({
                                title: "Message from " + contact.name,
                                description: contact.message,
                              });
                            }}
                          >
                            Read full message
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
