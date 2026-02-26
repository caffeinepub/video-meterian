import { useState } from 'react';
import { Mail, MessageSquare, HelpCircle, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useGetFAQs, useSubmitSupportMessage } from '@/hooks/useQueries';

const DEFAULT_FAQS = [
  {
    question: 'How do I access the courses on Video Meterian?',
    answer:
      'Simply browse our course catalog, click on any course that interests you, and press "Watch Now" to start learning immediately. No account required to watch.',
  },
  {
    question: 'Are the courses free to watch?',
    answer:
      'Yes! Video Meterian is committed to making quality education accessible. All courses in our catalog are freely available to watch.',
  },
  {
    question: 'How often is new content added?',
    answer:
      'We add new courses and video lessons regularly. Our team of expert instructors is constantly creating fresh content across all subject categories.',
  },
  {
    question: 'Can I suggest a topic or course?',
    answer:
      'Absolutely! We love hearing from our learners. Use the contact form on this page to send us your course suggestions, and our curriculum team will review them.',
  },
  {
    question: 'What subjects does Video Meterian cover?',
    answer:
      'We currently offer courses in Science, Mathematics, History, and Technology. We are continuously expanding our catalog to cover more subjects.',
  },
  {
    question: 'How can I report a technical issue?',
    answer:
      'If you encounter any technical issues, please use the contact form below or email us directly at support@videometerian.edu. We aim to respond within 24 hours.',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const { data: backendFaqs = [] } = useGetFAQs();
  const submitMutation = useSubmitSupportMessage();

  // Merge backend FAQs with defaults (backend FAQs take priority)
  const faqs = backendFaqs.length > 0 ? backendFaqs : DEFAULT_FAQS;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;

    try {
      await submitMutation.mutateAsync({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Failed to submit message:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-charcoal py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-4">
            Get in <span className="text-amber">Touch</span>
          </h1>
          <p className="text-white/65 max-w-lg mx-auto">
            Have a question, suggestion, or need support? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {/* Contact Info */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                <div className="w-11 h-11 rounded-lg bg-amber/10 flex items-center justify-center mb-4">
                  <Mail className="h-5 w-5 text-amber" />
                </div>
                <h3 className="font-serif font-bold text-charcoal text-base mb-1">
                  Email Support
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Reach us directly at:
                </p>
                <a
                  href="mailto:support@videometerian.edu"
                  className="text-amber font-medium text-sm hover:underline"
                >
                  support@videometerian.edu
                </a>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                <div className="w-11 h-11 rounded-lg bg-amber/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-5 w-5 text-amber" />
                </div>
                <h3 className="font-serif font-bold text-charcoal text-base mb-1">
                  Response Time
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We typically respond to all inquiries within{' '}
                  <span className="font-semibold text-charcoal">24 hours</span> on business
                  days.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                <div className="w-11 h-11 rounded-lg bg-amber/10 flex items-center justify-center mb-4">
                  <HelpCircle className="h-5 w-5 text-amber" />
                </div>
                <h3 className="font-serif font-bold text-charcoal text-base mb-1">
                  Quick Help
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Check our FAQ section below for answers to the most common questions.
                </p>
              </div>
            </aside>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-8 border border-border shadow-card">
                {submitted ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="h-16 w-16 text-amber mx-auto mb-4" />
                    <h3 className="font-serif font-bold text-2xl text-charcoal mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Thank you for reaching out. We've received your message and will get
                      back to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="border-amber text-amber hover:bg-amber/5"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif font-bold text-2xl text-charcoal mb-6">
                      Send Us a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-charcoal font-medium text-sm">
                            Full Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-charcoal font-medium text-sm">
                            Email Address <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="subject" className="text-charcoal font-medium text-sm">
                          Subject <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="What is your message about?"
                          value={form.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-charcoal font-medium text-sm">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Write your message here..."
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          className="resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="w-full bg-amber text-charcoal hover:bg-amber-light font-bold gap-2 shadow-amber"
                        size="lg"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                      {submitMutation.isError && (
                        <p className="text-destructive text-sm text-center">
                          Failed to send message. Please try again.
                        </p>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <HelpCircle className="h-10 w-10 text-amber mx-auto mb-3" />
            <h2 className="font-serif font-bold text-3xl text-charcoal mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions about Video Meterian.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border rounded-xl px-5 shadow-xs"
              >
                <AccordionTrigger className="font-serif font-bold text-charcoal text-left hover:text-amber hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
