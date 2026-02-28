
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import WhyBookWithUs from '@/components/sections/WhyBookWithUs';
import { Award, Heart, Shield, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      
      <main className="flex-grow">
        {/* Hero */}
        <div className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold font-headline mb-6">Our Journey</h1>
            <p className="text-xl text-white/70 leading-relaxed">
              At Elite Escapes, we don't just book holidays. We curate unforgettable experiences that stay with you forever. From humble beginnings to the UK's leading luxury travel agency.
            </p>
          </div>
        </div>

        {/* Content */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800" 
                  alt="Elite Escapes Office" 
                  className="rounded-[40px] shadow-2xl"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Over 40 Years of Excellence</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 1980, Elite Escapes began with a simple mission: to provide personalized, high-quality travel advice that puts the customer first. Today, we are proud to be an independent, family-owned business with over 500 branches across the UK.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our growth has been fueled by our passion for travel and our commitment to our people. Every one of our travel consultants is a seasoned explorer, bringing first-hand knowledge to help you find your perfect escape.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <span className="font-bold text-primary">Award Winning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-accent" />
                    </div>
                    <span className="font-bold text-primary">Customer First</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhyBookWithUs />

        {/* Values */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do at Elite Escapes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Integrity', icon: Shield, desc: 'We operate with complete honesty and transparency in everything we do.' },
                { title: 'Passion', icon: Heart, desc: 'We love travel, and we want you to love it just as much as we do.' },
                { title: 'Community', icon: Users, desc: 'We are proud of our local roots and committed to supporting our communities.' }
              ].map((val, i) => (
                <div key={i} className="bg-muted/30 p-10 rounded-3xl text-center hover:bg-accent/5 transition-colors border border-transparent hover:border-accent/20">
                  <val.icon className="w-12 h-12 text-accent mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-primary mb-4 font-headline">{val.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
