import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';
import { ShoppingCart, Mail, CheckCircle2, FileText, FileCode, Package } from 'lucide-react';

const SET_LABELS: Record<string, string> = {
  architectural: 'Architectural Drawings',
  structural:    'Structural Drawings',
  mechanical:    'Mechanical / Plumbing',
  electrical:    'Electrical Drawings',
  boq:           'Bill of Quantities (BOQ)',
  interior:      'Interior Design',
};

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name:  '',
    email: user?.email || '',
    phone: '',
  });

  if (items.length === 0 && !placed) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
          <Button asChild className="mt-6"><Link to="/shop">Browse Plans</Link></Button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Please fill in your name and email address');
      return;
    }
    setLoading(true);
    // TODO: integrate payment gateway (PesaPal / Flutterwave)
    await new Promise(r => setTimeout(r, 1000)); // simulate
    setPlaced(true);
    clearCart();
    setLoading(false);
  };

  // ── Order placed confirmation ─────────────────────────────────
  if (placed) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-9 w-9 text-green-600" />
          </div>
          <h1 className="text-2xl font-display font-bold">Order Received!</h1>
          <p className="text-muted-foreground mt-2">
            Thank you, <strong>{form.name}</strong>. We've received your order and will email your drawings to <strong>{form.email}</strong> as soon as possible.
          </p>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5 text-left">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <p className="font-semibold text-blue-800">What happens next?</p>
            </div>
            <ol className="text-sm text-blue-800 space-y-1.5 list-decimal list-inside">
              <li>Our team receives your order with full details of what you selected.</li>
              <li>We prepare and send the requested drawing files to <strong>{form.email}</strong>.</li>
              <li>You'll typically receive your files within <strong>1–2 business hours</strong> during working hours (Mon–Fri, 7am–5pm EAT).</li>
              <li>If you need them urgently or have questions, call us on <strong>+256 778 790 851</strong>.</li>
            </ol>
          </div>

          <Button asChild className="mt-8"><Link to="/shop">Browse More Plans</Link></Button>
        </div>
      </Layout>
    );
  }

  // ── Checkout form ─────────────────────────────────────────────
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Customer details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card border rounded-xl p-6 space-y-5">
              <h2 className="font-semibold text-lg">Your Details</h2>
              <p className="text-sm text-muted-foreground -mt-2">
                Your drawing files will be emailed to the address below after payment.
              </p>
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. John Doe" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com" required className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">
                  ✉️ Your drawings will be sent to this email — double-check it's correct.
                </p>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input id="phone" value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+256 700 000 000" className="mt-1" />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full font-semibold text-base" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2"><span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> Processing...</span>
              ) : (
                `Place Order — $${totalPrice.toFixed(2)}`
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Payment integration coming soon. Orders are currently confirmed manually. Our team will contact you with payment details.
            </p>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-xl p-6 sticky top-24 space-y-5">
              <h2 className="font-semibold text-lg">Order Summary</h2>

              {items.map((item) => {
                const selectedSets = Object.entries(item.drawingSets)
                  .filter(([, chosen]) => chosen)
                  .map(([key]) => SET_LABELS[key] || key);

                return (
                  <div key={item.id} className="space-y-3 pb-4 border-b last:border-0 last:pb-0">
                    {/* Plan header */}
                    <div className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {item.mainImage && <img src={item.mainImage} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-tight line-clamp-2">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Plan ID: #{item.planId}</p>
                        <p className="text-base font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* File format */}
                    <div className="flex items-center gap-2 text-xs bg-secondary rounded-lg px-3 py-2">
                      {item.fileType === 'CAD_PDF'
                        ? <><FileCode className="h-3.5 w-3.5 text-primary" /><span><strong>CAD + PDF</strong> — editable files included</span></>
                        : <><FileText className="h-3.5 w-3.5 text-primary" /><span><strong>PDF Only</strong> — print-ready drawings</span></>
                      }
                    </div>

                    {/* Drawing sets */}
                    {selectedSets.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
                          <Package className="h-3 w-3" /> Drawing sets to be emailed:
                        </p>
                        <ul className="space-y-1">
                          {selectedSets.map(s => (
                            <li key={s} className="flex items-center gap-2 text-xs">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Total */}
              <div className="flex items-center justify-between pt-1 border-t font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>

              {/* Delivery note */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-800 flex gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 mt-0.5 text-green-600" />
                <span>Files will be emailed to your address within <strong>1–2 business hours</strong> of payment confirmation.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
