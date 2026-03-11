import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Wrench, Droplets, Hammer, RefreshCw } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const offerings = [
  { icon: Hammer, title: 'Design & Build', desc: 'Full documentation and physical execution from concept to creation. We manage every phase so you don\'t have to.' },
  { icon: Droplets, title: 'Waste Management Systems', desc: 'Specialized construction of bio-digesters, soak pits, and septic tanks for residential and commercial properties.' },
  { icon: RefreshCw, title: 'Maintenance & Renovation', desc: 'Upkeep, refurbishment, and renovation for both commercial and residential premises. We bring old spaces back to life.' },
  { icon: Wrench, title: 'Structural Works', desc: 'From foundations to roofing, our skilled teams deliver quality workmanship on every structural element.' },
];

export default function Construction() {
  return (
    <Layout>
      <section className="relative h-64 md:h-96 overflow-hidden">
        <img src="https://www.maramani.com/cdn/shop/files/ID39801_1.jpg?v=1739617697&width=1920"
          alt="Construction" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary uppercase tracking-widest text-sm font-semibold mb-2">Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold text-white">Construction & Build</motion.h1>
          <p className="mt-3 text-white/80 max-w-xl">From the ground up — we design and build quality structures for generations.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Built to Last, Built with Care</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our construction service delivers on the full promise of design-and-build: we don't just draw your structure, we bring it to life. Our skilled teams work across Kampala and Uganda, maintaining the highest standards of quality on every site.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We value every penny of our client's investment and always strive to deliver quality on time, as planned. Whether it's a family home or a commercial complex, Cosy Structures is your trusted building partner.
            </p>
            <ul className="space-y-2">
              {['Residential & commercial construction', 'Full project documentation included', 'Qualified site supervisors on every project', 'Transparent cost reporting', 'Post-construction support'].map(h => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span>{h}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6"><a href="mailto:info@cosystructures.com">Get a Quote</a></Button>
          </div>
          <img src="https://www.maramani.com/cdn/shop/files/House_Plan_ID_22302_pp1_jpg.jpg?v=1728944911&width=800"
            alt="Construction project" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((o) => (
            <div key={o.title} className="bg-card border rounded-xl p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <o.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">{o.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold text-white">Ready to Break Ground?</h2>
          <p className="mt-2 text-white/80">Contact us today to discuss your construction project.</p>
          <div className="mt-6 flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="secondary" className="font-semibold"><a href="tel:+256778790851">Call Us Now</a></Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold"><a href="mailto:info@cosystructures.com">Email Us</a></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
