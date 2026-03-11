import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, CreditCard, Pencil, Calculator, ArrowRight, Star, Wrench, BookOpen, HardHat, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlanCard from '@/components/shop/PlanCard';
import { samplePlans } from '@/data/samplePlans';
import Layout from '@/components/layout/Layout';

const features = [
  { icon: Truck, label: 'Instant digital delivery' },
  { icon: ShieldCheck, label: '100% Satisfaction Guarantee' },
  { icon: CreditCard, label: 'Multiple payment options' },
  { icon: Pencil, label: 'Customizable house plans' },
  { icon: Calculator, label: 'Construction cost estimates' },
];

const categories = [
  { title: 'Duplex & Multi-Family', image: 'https://www.maramani.com/cdn/shop/files/House_Plan_ID_22302_pp1_jpg.jpg?v=1728944911&width=720', href: '/shop?category=Apartments' },
  { title: 'Apartment Plans', image: 'https://www.maramani.com/cdn/shop/files/Perspective_1_1.jpg?v=1728940993&width=720', href: '/shop?category=Apartments' },
  { title: 'Modern Farm House', image: 'https://www.maramani.com/cdn/shop/files/ID_13404_House_plan_picture1.jpg_cleanup.webp?v=1728943109&width=720', href: '/shop?style=Farmhouse' },
  { title: 'Garage House Plans', image: 'https://www.maramani.com/cdn/shop/files/04__cleanup.webp?v=1728944458&width=720', href: '/shop?style=Traditional' },
  { title: 'Modern House Plans', image: 'https://www.maramani.com/cdn/shop/files/ID_13403_pp1_cleanup.webp?v=1728944599&width=720', href: '/shop?style=Modern' },
];

const testimonials = [
  { name: 'J.E. Ofuono', role: 'Home Owner', text: "Wasn't impressed with my house plan purchase at first. Requested an edit and it was done at no extra cost. I recommend Cosy Structures." },
  { name: 'R.D. Ofwono', role: 'Engineer – Shinka Furaha', text: "At Shinka Furaha we love working with people that understand what they do. These guys got it." },
  { name: 'K. Jonathan', role: 'Contractor – Hamit Structures', text: 'Professional, responsive and highly knowledgeable. Our go-to design partner for every project we take on.' },
  { name: 'W. Asumani', role: 'Social Worker – DIHOFU', text: 'The team made the whole process seamless. From the first meeting to final delivery, everything was handled with care.' },
  { name: 'J. Aketch', role: 'MD – Aketch Fashions', text: 'High quality plans delivered on time. Cosy Structures understood our commercial needs perfectly.' },
];

const bedroomCategories = [
  { title: '1 Bedroom', image: 'https://www.maramani.com/cdn/shop/collections/Perspective_1_befc8dde-aea8-4e45-a8bd-aa615415e92f.jpg?v=1714127776&width=720', href: '/shop?bedrooms=1' },
  { title: '2 Bedrooms', image: 'https://www.maramani.com/cdn/shop/collections/Perspective_1_ID12209-Maramani_fc7ee819-9de6-419c-9153-4c61814aab02.jpg?v=1714130880&width=720', href: '/shop?bedrooms=2' },
  { title: '3 Bedrooms', image: 'https://www.maramani.com/cdn/shop/collections/1_0468cdfc-5072-43f4-8b8a-90621f8bfe20.jpg?v=1714128200&width=720', href: '/shop?bedrooms=3' },
  { title: '4 Bedrooms', image: 'https://www.maramani.com/cdn/shop/collections/Pers-1_3d08d602-6611-4f2d-894a-ca784fcbe2c3.jpg?v=1714128418&width=720', href: '/shop?bedrooms=4' },
  { title: '5+ Bedrooms', image: 'https://www.maramani.com/cdn/shop/collections/5-bedroom-plan-ID-25503-pp3_08c1b083-c238-462d-8b65-cf65b6a770e8.jpg?v=1714128491&width=720', href: '/shop?bedrooms=5' },
];

const services = [
  {
    icon: Pencil,
    title: 'Architectural Design & Plans',
    desc: 'Bespoke and readymade floor plans, 3D visualizations, and video walkthroughs. From Basic floor plans to full Architectural & Structural sets.',
    href: '/services/architectural-design',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: HardHat,
    title: 'Construction & Build',
    desc: 'Full design-and-build execution from concept to creation. We also specialize in bio-digesters, soak pits, septic tanks, and renovation works.',
    href: '/services/construction',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Layers,
    title: 'Project Management',
    desc: 'Expert supervision of construction works and site expenditure control. Professional consultation for architectural and engineering projects.',
    href: '/services/project-management',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: BookOpen,
    title: 'Training & Academy',
    desc: 'Engineering CAD training (AutoCAD, ArchiCAD, Revit), Operational Safety & Health (OSH), and Python programming for engineers.',
    href: '/services/academy',
    color: 'bg-purple-50 text-purple-600',
  },
];

export default function Index() {
  const featuredPlans = samplePlans.filter(p => p.is_featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[65vh] md:h-[75vh] overflow-hidden">
        <img
          src="https://www.maramani.com/cdn/shop/files/Untitled_design_8_9cef7877-c64e-4ba6-83f4-2bd031e82918.webp?v=1721506831&width=1920"
          alt="Cosy Structures – modern home construction"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold text-sm md:text-base uppercase tracking-widest mb-3"
          >
            5 Years of Construction & Design Excellence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white max-w-3xl leading-tight"
          >
            Where Vision Becomes Structure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-lg md:text-xl text-white/85 max-w-xl"
          >
            Your reliable construction & design partners in Uganda. Quality structures, built for generations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              <Link to="/shop">Browse House Plans</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
              <Link to="/custom-plan">Get a Custom Plan</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 md:gap-12">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-5 w-5 text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-14 md:py-20 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold">Everything You Need, Under One Roof</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              From readymade floor plans to full construction management — Cosy Structures is your end-to-end design and build partner.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <Link key={s.title} to={s.href} className="group bg-card border rounded-xl p-6 hover:shadow-md transition-all duration-300">
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg ${s.color} mb-4`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-medium">
                  Learn more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Browse by Style</h2>
            <Link to="/shop" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.href}
                className="relative flex-shrink-0 w-52 h-64 rounded-xl overflow-hidden group"
              >
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-sm">{cat.title}</h3>
                  <span className="text-white/80 text-xs">View More</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About / Expertise */}
      <section className="py-14 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-primary font-semibold uppercase text-sm tracking-widest mb-3">About Cosy Structures</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                Because We Are Experts of Our Craft
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                You can dream, create, design, and build the most wonderful place in the world — but it requires people to make the dream a reality. And not just anybody, but the best. We are a skilled, experienced and dependable house design and construction partner you can trust.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We value to the smallest penny of our client's money and always strive to offer quality in time as planned. From first-time homeowners to large commercial developers, everyone that lives in or uses any form of building deserves excellence.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { value: '5+', label: 'Years Experience' },
                  { value: '500+', label: 'Plans Delivered' },
                  { value: '24/7', label: 'Support' },
                ].map(({ value, label }) => (
                  <div key={label} className="border rounded-lg py-4">
                    <p className="text-2xl font-bold text-primary">{value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8">
                <Link to="/services/architectural-design">Explore Our Services</Link>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <img
                src="https://www.maramani.com/cdn/shop/files/ID39801_1.jpg?v=1739617697&width=800"
                alt="Cosy Structures project"
                className="rounded-2xl w-full object-cover shadow-lg aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans by Bedroom */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Plans for Every Family Size</h2>
              <p className="mt-1 text-muted-foreground">Every family deserves a home that fits their needs</p>
            </div>
            <Link to="/shop" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {bedroomCategories.map((cat) => (
              <Link key={cat.title} to={cat.href} className="group relative aspect-[3/4] rounded-xl overflow-hidden">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white font-semibold">{cat.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold">What Our Clients Say</h2>
            <p className="mt-1 text-muted-foreground">Real results from real homeowners and professionals</p>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {testimonials.map((t) => (
              <div key={t.name} className="flex-shrink-0 w-80 bg-background border rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array(5).fill(null).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Best Selling Plans</h2>
              <p className="mt-1 text-muted-foreground">A home should be as functional as it is beautiful</p>
            </div>
            <Link to="/shop" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            Can't find what you're looking for?
          </h2>
          <p className="mt-4 text-primary-foreground/80 text-lg">
            We design bespoke house plans from scratch, tailored specifically to your vision, plot, and budget.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="font-semibold px-8">
              <Link to="/custom-plan">Design Your Custom Plan</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
              <Link to="/services/architectural-design">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
