import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Youtube, Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = [
  {
    title: 'House Plans',
    links: [
      { label: 'Browse All Plans', href: '/shop' },
      { label: 'Custom Plan', href: '/custom-plan' },
      { label: 'Best Sellers', href: '/shop?sort=best-selling' },
      { label: '1 Bedroom', href: '/shop?bedrooms=1' },
      { label: '2 Bedrooms', href: '/shop?bedrooms=2' },
      { label: '3+ Bedrooms', href: '/shop?bedrooms=3' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Architectural Design', href: '/services/architectural-design' },
      { label: 'Construction & Build', href: '/services/construction' },
      { label: 'Project Management', href: '/services/project-management' },
      { label: 'Training & Academy', href: '/services/academy' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
            <div className="lg:col-span-2">
            <div className="mb-5">
              <img src="/logo.png" alt="Cosy Structures Limited" className="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed opacity-80 max-w-xs">
              Your Reliable Construction & Design Partners. We visualize, create & maintain beautiful homes across Uganda and beyond.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center gap-2 opacity-80">
                <Mail className="h-4 w-4 flex-shrink-0" /> info@cosystructures.com
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <Phone className="h-4 w-4 flex-shrink-0" /> +256 778 790 851
              </div>
              <div className="flex items-start gap-2 opacity-80">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Makerere Kavule, Basiima Building,<br />Kampala, Uganda</span>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: Youtube, href: 'https://youtube.com/@cosystructures', label: 'YouTube' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'X / Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Sign Up For Newsletter</p>
              <p className="text-xs opacity-60 mt-0.5">Receive special offers, exclusive discounts and more!</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/20 rounded-md px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary w-full md:w-64"
              />
              <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs opacity-50">
          <span>© {new Date().getFullYear()} Cosy Structures Limited. All rights reserved. Reg. No. 80020003291703</span>
          <span>Mon–Fri, 7:00 AM – 5:00 PM EAT</span>
        </div>
      </div>
    </footer>
  );
}
