
import { ShieldCheck, Trophy, Headphones, Users, Home } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'ATOL Protected',
    description: 'Your financial security is our priority. Travel with complete peace of mind knowing you are fully protected.'
  },
  {
    icon: Trophy,
    title: 'Award Winning',
    description: 'Recognized as the UK\'s leading premium travel agency for five consecutive years.'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our travel experts are available around the clock to assist you, before and during your trip.'
  }
];

const STATS = [
  { icon: Users, label: 'Happy Customers', value: '2M+' },
  { icon: Home, label: 'UK Branches', value: '500+' }
];

export default function WhyBookWithUs() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-4">Why Book With Us</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {FEATURES.map((feature, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-headline">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary rounded-[32px] p-8 md:p-12 text-white flex flex-col md:flex-row justify-around items-center gap-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -left-10 -top-10 w-40 h-40 border-8 border-white rounded-full" />
            <div className="absolute -right-20 -bottom-20 w-60 h-60 border-8 border-white rounded-full" />
          </div>

          {STATS.map((stat, i) => (
            <div key={i} className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold font-headline">{stat.value}</p>
                <p className="text-white/70 font-medium uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
