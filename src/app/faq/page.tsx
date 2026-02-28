
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, FileText, ShieldCheck, CreditCard } from 'lucide-react';

const FAQS = [
  {
    category: 'Bookings & Payments',
    icon: CreditCard,
    items: [
      { q: 'How do I book a holiday?', a: 'You can book directly through our website, visit any of our 500+ branches, or call our expert travel consultants at 0800 123 4567.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards, including Visa, Mastercard, and American Express. We also offer flexible direct debit payment plans for many holidays.' },
      { q: 'When do I need to pay the balance of my holiday?', a: 'Balance payment deadlines vary by holiday type and tour operator, but typically it is required 12-14 weeks before departure. You can check your specific balance due date in your booking confirmation.' },
    ]
  },
  {
    category: 'Travel Protection',
    icon: ShieldCheck,
    items: [
      { q: 'Is my holiday ATOL protected?', a: 'Yes, every flight-inclusive holiday booked with Elite Escapes is fully ATOL protected. This means your money is safe and you won\'t be stranded abroad in the unlikely event of supplier failure.' },
      { q: 'Do I need travel insurance?', a: 'We strongly recommend that all customers have adequate travel insurance from the moment of booking to cover potential cancellations or medical emergencies.' },
    ]
  },
  {
    category: 'Manage My Booking',
    icon: FileText,
    items: [
      { q: 'Can I change my booking?', a: 'Changes can often be made, though they may be subject to amendment fees from both Elite Escapes and the travel providers. Please contact your local branch or our customer service team to discuss any changes.' },
      { q: 'How do I receive my travel documents?', a: 'Your tickets and final travel documents are typically sent via email 7-14 days before departure. If you prefer paper documents, these can be collected from your booking branch.' },
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      
      <main className="flex-grow bg-muted/30">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">How can we help?</h1>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search our help centre..." 
                className="pl-12 h-14 rounded-2xl bg-white text-primary border-none shadow-xl"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { label: 'Booking Help', icon: HelpCircle },
                { label: 'Travel Advice', icon: FileText },
                { label: 'Your Safety', icon: ShieldCheck }
              ].map((box, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl text-center shadow-sm border border-border/50 hover:border-accent transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                    <box.icon className="w-7 h-7 text-primary group-hover:text-white" />
                  </div>
                  <span className="font-bold text-primary">{box.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-12">
              {FAQS.map((cat, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-6">
                    <cat.icon className="w-6 h-6 text-accent" />
                    <h2 className="text-2xl font-bold text-primary font-headline">{cat.category}</h2>
                  </div>
                  <div className="bg-white rounded-3xl p-4 shadow-sm border border-border/50">
                    <Accordion type="single" collapsible className="w-full">
                      {cat.items.map((item, idx) => (
                        <AccordionItem key={idx} value={`${i}-${idx}`} className="border-none px-4">
                          <AccordionTrigger className="hover:no-underline text-left font-bold text-primary text-lg py-5">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 bg-primary rounded-[40px] p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-3xl font-bold mb-4 font-headline">Still have questions?</h3>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">Our friendly team is available 7 days a week to help you with anything you need.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-accent" />
                  <span className="text-2xl font-bold">0800 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-accent" />
                  <span className="text-xl font-bold">support@eliteescapes.co.uk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
