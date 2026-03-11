import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Monitor, ShieldAlert, Code, Award } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const courses = [
  {
    icon: Monitor,
    title: 'Engineering CAD Training',
    tag: 'Most Popular',
    desc: 'Hands-on training in industry-standard CAD software used by professional architects and engineers.',
    modules: ['AutoCAD for Architecture', 'ArchiCAD', 'Revit (BIM)', 'Orion Structural Software'],
    color: 'border-primary bg-primary/5',
  },
  {
    icon: ShieldAlert,
    title: 'Operational Safety & Health',
    tag: 'Certified',
    desc: 'Foundational training in construction site safety, hazard identification, and OSH compliance.',
    modules: ['Site Safety Fundamentals', 'Hazard Identification', 'PPE & Procedures', 'Partnered Certification'],
    color: 'border-border bg-card',
  },
  {
    icon: Code,
    title: 'Programming for Engineers',
    tag: 'New',
    desc: 'An introduction to Python programming tailored for engineering applications and data handling.',
    modules: ['Python Basics', 'Engineering Calculations in Python', 'Data Analysis', 'Automation Scripts'],
    color: 'border-border bg-card',
  },
];

export default function Academy() {
  return (
    <Layout>
      <section className="relative h-64 md:h-96 overflow-hidden">
        <img src="https://www.maramani.com/cdn/shop/files/ID_13404_House_plan_picture1.jpg_cleanup.webp?v=1728943109&width=1920"
          alt="Academy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary uppercase tracking-widest text-sm font-semibold mb-2">Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold text-white">Training & Academy</motion.h1>
          <p className="mt-3 text-white/80 max-w-xl">Building the next generation of engineers and construction professionals.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Learn From Industry Practitioners</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Cosy Structures Academy offers practical, career-focused training for aspiring engineers, architects, and construction professionals. Our courses are taught by experienced practitioners — people who use these tools on real projects every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {courses.map((c) => (
            <div key={c.title} className={`rounded-xl border-2 p-6 ${c.color}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <c.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">{c.tag}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{c.desc}</p>
              <ul className="space-y-1.5">
                {c.modules.map(m => (
                  <li key={m} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />{m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-secondary/40 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-4">
              <Award className="h-4 w-4" /> Why Train With Us
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Practical Skills, Real Results</h3>
            <ul className="space-y-3">
              {[
                'Taught by working architects and engineers',
                'Hands-on software training from day one',
                'Small class sizes for personalised learning',
                'Flexible scheduling for working professionals',
                'Partnered certification programs available',
                'Career guidance and industry networking',
              ].map(h => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-muted-foreground text-sm mb-6">Ready to advance your career in construction and engineering? Get in touch to find out about our next intake.</p>
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
              <Button asChild size="lg"><a href="mailto:info@cosystructures.com">Enrol Now</a></Button>
              <Button asChild size="lg" variant="outline"><a href="tel:+256778790851">Call to Learn More</a></Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
