
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    
    let emailContent = {};
    
    if (type === "contact") {
      emailContent = {
        from: "Capture Sangli <onboarding@resend.dev>",
        to: "info@capturesangli.com", // Replace with your actual email
        subject: "New Contact Form Submission",
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        `,
      };
    } else if (type === "booking") {
      emailContent = {
        from: "Capture Sangli <onboarding@resend.dev>",
        to: "info@capturesangli.com", // Replace with your actual email
        subject: "New Photography Session Booking",
        html: `
          <h1>New Photography Session Booking</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Date:</strong> ${data.booking_date}</p>
          <p><strong>Time Slot:</strong> ${data.time_slot}</p>
        `,
      };
    } else {
      throw new Error("Invalid notification type");
    }
    
    const { data: emailResponse, error } = await resend.emails.send(emailContent);
    
    if (error) {
      throw error;
    }
    
    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
