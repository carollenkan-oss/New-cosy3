import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Search, User, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { label: 'House Plans', href: '/shop' },
  { label: 'Best Sellers', href: '/shop?sort=best-selling' },
  {
    label: 'By Size',
    children: [
      { label: '1 Bedroom', href: '/shop?bedrooms=1' },
      { label: '2 Bedrooms', href: '/shop?bedrooms=2' },
      { label: '3 Bedrooms', href: '/shop?bedrooms=3' },
      { label: '4 Bedrooms', href: '/shop?bedrooms=4' },
      { label: '5+ Bedrooms', href: '/shop?bedrooms=5' },
    ],
  },
  {
    label: 'By Style',
    children: [
      { label: 'Modern', href: '/shop?style=Modern' },
      { label: 'Contemporary', href: '/shop?style=Contemporary' },
      { label: 'Traditional', href: '/shop?style=Traditional' },
      { label: 'Farmhouse', href: '/shop?style=Farmhouse' },
    ],
  },
  {
    label: 'By Category',
    children: [
      { label: 'Residential', href: '/shop?category=Residential' },
      { label: 'Apartments', href: '/shop?category=Apartments' },
      { label: 'Commercial', href: '/shop?category=Commercial' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Architectural Design', href: '/services/architectural-design' },
      { label: 'Construction & Build', href: '/services/construction' },
      { label: 'Project Management', href: '/services/project-management' },
      { label: 'Training & Academy', href: '/services/academy' },
    ],
  },
  { label: 'Custom Plan', href: '/custom-plan' },
];

export default function Header() {
  const { totalItems } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Top Banner */}
      <div className="bg-banner text-banner-foreground overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap py-2 text-sm">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Where Vision Becomes Structure — Kampala, Uganda
            </span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Cosy Structures Limited"
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                      {item.label} <ChevronDown className="h-3.5 w-3.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.label} onClick={() => navigate(child.href)}>
                          {child.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link key={item.label} to={item.href!} className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user ? (
                    <>
                      <DropdownMenuItem className="text-xs text-muted-foreground">{user.email}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {isAdmin && (
                        <DropdownMenuItem onClick={() => navigate('/admin')}>Admin Dashboard</DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => navigate('/orders')}>My Orders</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/signin')}>Sign In</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/signup')}>Create Account</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-card">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">{item.label}</div>
                    {item.children.map((child) => (
                      <Link key={child.label} to={child.href} onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-sm text-foreground hover:text-primary">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={item.label} to={item.href!} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary">
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
