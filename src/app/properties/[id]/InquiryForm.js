'use client';

import posthog from 'posthog-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export default function InquiryForm({ propertyId, propertyTitle }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    posthog.capture('property_inquiry_submitted', { property_id: propertyId, title: propertyTitle });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input label="Full Name" type="text" required />
      <Input label="Email Address" type="email" required />
      <div className="relative">
        <textarea
          id="inquiry-message"
          rows={4}
          required
          placeholder="Your Message"
          className="peer w-full rounded-xl border-2 border-border bg-card px-4 pt-6 pb-3 text-sm font-medium text-card-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-0 placeholder-transparent resize-none"
        />
        <label
          htmlFor="inquiry-message"
          className="absolute left-4 top-5 text-sm font-medium text-muted-foreground transition-all duration-200 pointer-events-none peer-focus:top-3 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-primary"
        >
          Message
        </label>
      </div>
      <Button type="submit" size="lg" className="w-full gap-2">
        <Send size={14} />
        Send Inquiry
      </Button>
    </form>
  );
}
