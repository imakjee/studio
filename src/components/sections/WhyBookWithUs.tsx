import { ShieldCheck, Trophy, Headphones, CreditCard, Tag, MapPin, Users, Building2, Calendar, Star } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'ATOL Protected',
    description: 'All our holidays are fully ATOL protected for your peace of mind.'
  },
  {
    icon: Trophy,
    title: 'Award Winning',
    description: "Recognised as one of the UK's top travel agencies by customers."
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated team is available around the clock to assist you.'
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Low deposits and easy monthly payment plans available.'
  },
  {
    icon: Tag,
    title: 'Best Price Guarantee',
    description: "Found it cheaper? We'll match it and offer added value."
  },
  {
    icon: MapPin,
    title: 'Nationwide Branch Network',
    description: 'Visit us in-store for personal service and expert advice.'
  }
];

const STATS = [
  { icon: Users, label: 'Happy Customers', value: '2M+' },
  { icon: Building2, label: 'Branches', value: '500+' },
  { icon: Calendar, label: 'Years Experience', value: '44+' },
  { icon: Star, label: 'Customer Rating', value: '4.8★' }
];

export default function WhyBookWithUs() {
  return (
    <section className="py-24 bg-muted/30 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-4">Why Book With Us?</h2>
          <p className="text-muted-foreground text-lg">Trusted by millions of holidaymakers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {FEATURES.map((feature, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50 group"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-headline">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-center border border-border/50">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <p className="text-3xl font-bold text-primary font-headline mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
