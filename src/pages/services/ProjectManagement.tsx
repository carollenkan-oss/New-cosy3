import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ClipboardList, DollarSign, MessageSquare, BarChart3 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const pillars = [
  { icon: ClipboardList, title: 'Site Supervision', desc: 'Our experienced supervisors are on-site to coordinate teams, enforce quality standards, and keep your project moving.' },
  { icon: DollarSign, title: 'Cost Control', desc: 'We monitor and control site expenditure so your project stays within budget, with transparent reporting at every stage.' },
  { icon: MessageSquare, title: 'Consultation', desc: 'Expert architectural and engineering guidance whether you\'re at the planning stage or midway through a build.' },
  { icon: BarChart3, title: 'Progress Reporting', desc: 'Regular structured updates keep you informed about milestones, challenges, and next steps.' },
];

export default function ProjectManagement() {
  return (
    <Layout>
      <section className="relative h-64 md:h-96 overflow-hidden">
        <img src="https://www.maramani.com/cdn/shop/files/ID_13403_pp1_cleanup.webp?v=1728944599&width=1920"
          alt="Project Management" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary uppercase tracking-widest text-sm font-semibold mb-2">Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold text-white">Project Management</motion.h1>
          <p className="mt-3 text-white/80 max-w-xl">Expert oversight and consultation from start to handover.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <img src="https://www.maramani.com/cdn/shop/files/ID39801_3.jpg?v=1739617697&width=800"
            alt="Project management" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" />
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Your Project, Expertly Managed</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Construction projects are complex. Without experienced management, they go over budget, fall behind schedule, and suffer quality issues. Cosy Structures provides the professional oversight that protects your investment.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our project management service is available as a standalone offering or as part of our full design-and-build package. Whether you already have a contractor and just need supervision, or you want us to manage everything, we adapt to your needs.
            </p>
            <ul className="space-y-2">
              {['Independent site supervision', 'Budget monitoring & expenditure control', 'Contractor coordination', 'Architectural & engineering consultation', 'Risk identification & mitigation'].map(h => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span>{h}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6"><a href="mailto:info@cosystructures.com">Request Consultation</a></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="bg-card border rounded-xl p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600 mb-4">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold text-white">Let's Talk About Your Project</h2>
          <p className="mt-2 text-white/80">Get in touch for a free initial consultation.</p>
          <Button asChild size="lg" variant="secondary" className="mt-6 font-semibold px-8"><a href="mailto:info@cosystructures.com">Contact Us</a></Button>
        </div>
      </section>
    </Layout>
  );
}
