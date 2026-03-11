import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Pencil, FileImage, Layers, Package } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const packages = [
  {
    name: 'Basic',
    desc: 'Floor Plan & 3D Visualizations',
    includes: ['2D Floor Plan', '3D Exterior Renders', 'Basic Room Layout'],
    icon: FileImage,
    highlight: false,
  },
  {
    name: 'Architectural Plan',
    desc: 'Full architectural drawing set',
    includes: ['Floor Plans', 'Elevation Drawings', 'Section Drawings', 'Site Plan', '3D Renders'],
    icon: Pencil,
    highlight: true,
  },
  {
    name: 'Structural Plan',
    desc: 'Engineering & structural drawings',
    includes: ['Foundation Plan', 'Column Schedules', 'Beam Layouts', 'Structural Details'],
    icon: Layers,
    highlight: false,
  },
  {
    name: 'Full Set',
    desc: 'Architectural & Structural combined',
    includes: ['Everything in Architectural', 'Everything in Structural', 'Coordination Drawings', 'Priority Support'],
    icon: Package,
    highlight: false,
  },
];

const process = [
  { step: '01', title: 'Consultation', desc: 'We discuss your vision, plot size, budget, and lifestyle requirements.' },
  { step: '02', title: 'Concept Design', desc: 'We produce initial floor plan concepts for your review and feedback.' },
  { step: '03', title: 'Design Development', desc: 'Approved concepts are developed into full working drawings.' },
  { step: '04', title: 'Final Delivery', desc: 'You receive your digital files (PDF and/or CAD) instantly upon payment.' },
];

export default function ArchitecturalDesign() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <img src="https://www.maramani.com/cdn/shop/files/Two-story4bedroomhouse-ID2441101.jpg?v=1715872374&width=1920"
          alt="Architectural Design" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary uppercase tracking-widest text-sm font-semibold mb-2">Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold text-white">Architectural Design & Plans</motion.h1>
          <p className="mt-3 text-white/80 max-w-xl text-sm md:text-base">
            Bespoke and readymade floor plans, 3D visualizations, and complete drawing sets — designed to build your dream.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Design That Tells Your Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Whether you're building your first home or expanding a commercial portfolio, our architectural design service puts your vision at the centre. We combine creativity with technical precision to produce plans that are both beautiful and buildable.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Choose from our growing library of readymade plans or commission a completely custom design from scratch. Every plan can be delivered as PDF-only or as a full CAD + PDF package.
            </p>
            <ul className="space-y-2">
              {['Custom house plans designed from scratch', 'Readymade plans: 1 to 5+ bedrooms', '3D models and video walkthroughs', 'Fast turnaround on custom orders', 'Revisions included at no extra cost'].map(h => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4 flex-wrap">
              <Button asChild><Link to="/shop">Browse Readymade Plans</Link></Button>
              <Button asChild variant="outline"><Link to="/custom-plan">Request Custom Plan</Link></Button>
            </div>
          </div>
          <img src="https://www.maramani.com/cdn/shop/files/ID_13403_pp1_cleanup.webp?v=1728944599&width=800"
            alt="Architectural design" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" />
        </div>
      </section>

      {/* Packages */}
      <section className="bg-secondary/40 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold">Our Plan Packages</h2>
            <p className="mt-2 text-muted-foreground">Choose the right level of detail for your project</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`rounded-xl border p-6 ${pkg.highlight ? 'border-primary bg-primary/5 shadow-md' : 'bg-card'}`}>
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg mb-4 ${pkg.highlight ? 'bg-primary text-white' : 'bg-secondary text-foreground'}`}>
                  <pkg.icon className="h-5 w-5" />
                </div>
                {pkg.highlight && <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-1 block">Most Popular</span>}
                <h3 className="font-semibold text-lg mb-1">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.desc}</p>
                <ul className="space-y-1.5">
                  {pkg.includes.map(i => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />{i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((p) => (
            <div key={p.step} className="text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary text-xl font-bold mb-4">{p.step}</div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold text-white">Start Your Design Today</h2>
          <p className="mt-2 text-white/80">Browse our readymade library or request a fully custom plan.</p>
          <div className="mt-6 flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="secondary" className="font-semibold"><Link to="/shop">Browse Plans</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold"><Link to="/custom-plan">Custom Plan</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
