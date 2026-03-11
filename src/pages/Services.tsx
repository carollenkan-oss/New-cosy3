import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pencil, HardHat, Layers, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Pencil,
    title: 'Architectural Design & Plans',
    subtitle: 'From concept sketch to full drawing set',
    desc: 'We offer both readymade and fully bespoke house plans. Whether you need a quick floor plan for a 2-bedroom bungalow or a complete multi-storey commercial drawing set, our team delivers precision and creativity in every design.',
    highlights: ['Custom bespoke designs from scratch', 'Library of readymade floor plans (1–5+ bedrooms)', '3D visualization & video walkthroughs', 'Packages: Basic, Architectural, Structural, Full Set'],
    image: 'https://www.maramani.com/cdn/shop/files/Two-story4bedroomhouse-ID2441101.jpg?v=1715872374&width=800',
    href: '/services/architectural-design',
    color: 'bg-orange-500',
  },
  {
    icon: HardHat,
    title: 'Construction & Build',
    subtitle: 'Concept to creation, physically executed',
    desc: 'Our design-and-build service handles your project end to end — from full documentation through to physical execution on site. We also specialize in waste management systems including bio-digesters, soak pits, and septic tanks.',
    highlights: ['Full design & build execution', 'Bio-digesters, soak pits & septic tanks', 'Commercial & residential maintenance', 'Renovation & refurbishment works'],
    image: 'https://www.maramani.com/cdn/shop/files/ID39801_1.jpg?v=1739617697&width=800',
    href: '/services/construction',
    color: 'bg-blue-500',
  },
  {
    icon: Layers,
    title: 'Project Management',
    subtitle: 'Expert oversight from start to finish',
    desc: 'We provide professional supervision of construction works, site coordination, and expenditure control. Our consultation service gives you expert architectural and engineering guidance at any stage of your project.',
    highlights: ['Supervision of construction works', 'Site expenditure control', 'Architectural & engineering consultation', 'Progress reporting & quality assurance'],
    image: 'https://www.maramani.com/cdn/shop/files/ID_13403_pp1_cleanup.webp?v=1728944599&width=800',
    href: '/services/project-management',
    color: 'bg-green-500',
  },
  {
    icon: BookOpen,
    title: 'Training & Academy',
    subtitle: 'Building the next generation of engineers',
    desc: 'The Cosy Structures Academy offers practical, industry-relevant training for aspiring engineers and construction professionals. Our courses range from CAD software to construction safety and programming.',
    highlights: ['AutoCAD, ArchiCAD, Revit & Orion training', 'Operational Safety & Health (OSH)', 'Python programming for engineers', 'Partnered certification programs'],
    image: 'https://www.maramani.com/cdn/shop/files/ID_13404_House_plan_picture1.jpg_cleanup.webp?v=1728943109&width=800',
    href: '/services/academy',
    color: 'bg-purple-500',
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://www.maramani.com/cdn/shop/collections/ID-12210_pp1_cleanup.png?v=1715582702&width=1920"
          alt="Cosy Structures Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary uppercase tracking-widest text-sm font-semibold mb-2">
            What We Do
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold text-white">
            Our Services
          </motion.h1>
          <p className="mt-3 text-white/80 max-w-xl text-sm md:text-base">
            Everything from architectural drawings to physical construction — Cosy Structures is your full-service design and build partner.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <div className="space-y-20">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${s.color} text-white mb-5`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium mb-1">{s.subtitle}</p>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link to={s.href}>Learn More <ArrowRight className="h-4 w-4 ml-1" /></Link>
                </Button>
              </div>
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <img src={s.image} alt={s.title} className="rounded-2xl w-full object-cover shadow-lg aspect-[4/3]" loading="lazy" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-primary-foreground">Ready to Start Your Project?</h2>
          <p className="mt-3 text-primary-foreground/80">Contact our team or request a custom plan today.</p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="font-semibold px-8">
              <Link to="/custom-plan">Get a Custom Plan</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
              <a href="mailto:info@cosystructures.com">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
