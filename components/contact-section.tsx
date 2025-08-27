"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    childAge: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setResponseMessage("✅ Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          childAge: "",
          message: "",
        });
      } else {
        setResponseMessage(`❌ ${data.error || "Failed to send message"}`);
      }
    } catch (error) {
      setResponseMessage("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to give your child the best start? Contact us today to learn
            more or schedule a visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Address</h4>
                  <p className="text-muted-foreground">
                    123 Learning Lane
                    <br />
                    Sunshine City, SC 12345
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Phone</h4>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Email</h4>
                  <p className="text-muted-foreground">
                    info@prarambhlearners.com
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Hours</h4>
                  <p className="text-muted-foreground">
                    Monday - Friday: 7:00 AM - 6:00 PM
                    <br />
                    Saturday: 8:00 AM - 12:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Google Map Embed */}
            {/* Google Map Embed - India */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4866681.744258868!2d72.57974222341308!3d22.35111483323278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff336f5a6f7%3A0x62f8f3bfe0a4baf3!2sIndia!5e0!3m2!1sen!2sin!4v1693423999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">
                Send us a Message
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="childAge"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Child's Age
                  </label>
                  <Input
                    id="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="Enter your child's age"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your needs and any questions you have..."
                    rows={4}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>

              {/* Response Message */}
              {responseMessage && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  {responseMessage}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
