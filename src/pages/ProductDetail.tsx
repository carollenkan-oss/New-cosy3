import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Building2, BedDouble, Bath, Ruler, Move, Maximize2,
  Truck, ShieldCheck, CreditCard, Pencil, Calculator,
  ChevronLeft, ChevronRight, Check, Star, ChevronDown, ChevronUp, Share2, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Layout from '@/components/layout/Layout';
import { samplePlans } from '@/data/samplePlans';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// ─── FAQ DATA ────────────────────────────────────────────────────
const faqs = [
  { q: 'Can I view more pictures of this house plan?', a: 'Our team is working to create more images for existing and upcoming designs. If you need extra images for a specific plan, reach out to us and we will advise on any additional fees.' },
  { q: 'How long will it take to get my order?', a: 'Orders are typically delivered to your email within 10 minutes to 12 hours of payment. In rare cases we may need extra information to process your order.' },
  { q: 'What are PDF and CAD (DWG) formats?', a: 'PDF is a universal format that can be printed at full quality but cannot be edited. CAD/DWG files are editable using software like AutoCAD — ideal if your contractor needs to make adjustments.' },
  { q: 'Are your plans ready to submit for a building permit?', a: 'Requirements vary by location. Our plans contain detailed information sufficient for a qualified contractor to build from. Contact your local authorities to confirm submission requirements before applying for a permit.' },
  { q: 'How do I know if the plan will fit my plot?', a: 'Every plan includes exact dimensions (width × length). If you are unsure, contact our support team with your plot dimensions and the plan ID and we will advise you.' },
  { q: 'Can I modify the house plan?', a: 'Yes — we are happy to adjust any of our plans. The cost depends on the extent of changes required. Contact us with the plan ID and a list of changes for a quick quote.' },
  { q: 'Does the plan come with a Bill of Quantities (BOQ)?', a: 'Some plans include a BOQ. Check the Drawing Sets section on this page. If your chosen plan does not include a BOQ you can order it separately at an additional fee.' },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────
const testimonials = [
  { name: 'J.E. Ofuono', text: "Wasn't impressed with my house plan purchase at first. Requested an edit and it was done at no extra cost. I recommend Cosy Structures." },
  { name: 'R.D. Ofwono', role: 'Engineer', text: "At Shinka Furaha we love working with people that understand what they do. These guys got it." },
  { name: 'K. Jonathan', role: 'Contractor', text: 'Efficient, timely and money well spent. I received the house plan immediately upon making payment. Highly recommended.' },
  { name: 'W. Asumani', text: 'The company was very responsive when I enquired about services. The website is easy to navigate.' },
  { name: 'J. Aketch', role: 'MD', text: 'Comprehensive and fast response to my concern. Received the plans as detailed as promised. Bravo.' },
];

// ─── CONSTRUCTION COST RATES ($ per m²) ─────────────────────────
// Based on typical East African construction costs
const constructionRates = {
  Basic:    { substructure: 55,  superstructure: 95,  roof: 22,  doors: 9,  windows: 7,  finishes: 14, decorations: 6,  plumbing: 9,  electrical: 5  },
  Standard: { substructure: 75,  superstructure: 135, roof: 30,  doors: 14, windows: 10, finishes: 22, decorations: 10, plumbing: 15, electrical: 9  },
  Luxury:   { substructure: 110, superstructure: 195, roof: 45,  doors: 25, windows: 20, finishes: 40, decorations: 20, plumbing: 25, electrical: 15 },
};
const costLabels = [
  ['substructure',  'Substructure'],
  ['superstructure','Superstructure'],
  ['roof',          'Roof'],
  ['doors',         'Doors'],
  ['windows',       'Windows'],
  ['finishes',      'Finishes'],
  ['decorations',   'Decorations'],
  ['plumbing',      'Plumbing Installations'],
  ['electrical',    'Electrical Installations'],
] as const;

// ─── FAQ ITEM ────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left text-sm font-medium hover:text-primary transition-colors"
      >
        {q}
        {open ? <ChevronUp className="h-4 w-4 flex-shrink-0 ml-4" /> : <ChevronDown className="h-4 w-4 flex-shrink-0 ml-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────
export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const plan = samplePlans.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [fileType, setFileType] = useState<'PDF_ONLY' | 'CAD_PDF'>('CAD_PDF');
  const [drawingSets, setDrawingSets] = useState({
    architectural: true,
    structural: false,
    mechanical: false,
    electrical: false,
    boq: false,
    interior: false,
  });
  const [costTier, setCostTier] = useState<'Basic' | 'Standard' | 'Luxury'>('Standard');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const price = useMemo(() => {
    if (!plan) return 0;
    let p = fileType === 'CAD_PDF' ? plan.cad_pdf_price : plan.base_price;
    if (drawingSets.structural && plan.structural_price) p += plan.structural_price;
    if (drawingSets.mechanical && plan.mechanical_price) p += plan.mechanical_price;
    if (drawingSets.electrical && plan.electrical_price) p += plan.electrical_price;
    if (drawingSets.boq && plan.boq_price) p += plan.boq_price;
    if (drawingSets.interior && plan.interior_price) p += plan.interior_price;
    return p;
  }, [plan, fileType, drawingSets]);

  const costEstimates = useMemo(() => {
    if (!plan) return [];
    const rates = constructionRates[costTier];
    const area = plan.area;
    return costLabels.map(([key, label]) => ({
      label,
      value: rates[key] * area,
      formatted: `$${(rates[key] * area).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
    }));
  }, [plan, costTier]);

  const totalCost = useMemo(() => {
    return costEstimates.reduce((sum, r) => sum + r.value, 0);
  }, [costEstimates]);

  if (!plan) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Plan not found</h1>
          <Button asChild className="mt-4"><Link to="/shop">Back to Shop</Link></Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: `${plan.id}-${fileType}-${Date.now()}`,
      housePlanId: plan.id,
      title: plan.title,
      planId: plan.plan_id,
      mainImage: plan.main_image,
      fileType,
      drawingSets,
      price,
      quantity: 1,
    });
    toast.success('Added to cart!');
  };

  const specs = [
    { icon: Building2, value: plan.floors, label: plan.floors === 1 ? 'Floor' : 'Floors' },
    { icon: BedDouble, value: plan.bedrooms, label: plan.bedrooms === 1 ? 'Bedroom' : 'Bedrooms' },
    { icon: Bath, value: plan.bathrooms, label: plan.bathrooms === 1 ? 'Bathroom' : 'Bathrooms' },
    { icon: Ruler, value: `${plan.width}m`, label: 'Width' },
    { icon: Move, value: `${plan.length}m`, label: 'Length' },
    { icon: Maximize2, value: `${plan.area}m²`, label: 'Area' },
  ];

  const drawingOptions = [
    { key: 'architectural', label: 'Architectural Drawings', price: plan.architectural_price, available: plan.has_architectural },
    { key: 'structural', label: 'Structural Drawings', price: plan.structural_price, available: plan.has_structural },
    { key: 'mechanical', label: 'Mechanical Drawings', price: plan.mechanical_price, available: plan.has_mechanical },
    { key: 'electrical', label: 'Electrical Drawings', price: plan.electrical_price, available: plan.has_electrical },
    { key: 'boq', label: 'Bill of Quantities (BOQ)', price: plan.boq_price, available: plan.has_boq },
    { key: 'interior', label: 'Interior Design', price: plan.interior_price, available: plan.has_interior },
  ].filter(d => d.available);

  const relatedPlans = samplePlans.filter(p => p.id !== plan.id && (p.category === plan.category || p.bedrooms === plan.bedrooms)).slice(0, 4);

  // What's included in the architectural set
  const archDrawings = ['Foundation Plan', 'Floor Plan', 'Roof Plan', 'Sections & Elevations', 'Door & Window Schedule', 'Construction Details', 'Schematic Electrical Layout', 'Waste Water Drainage Layout', 'Furniture & Fixture Layout'];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">House Plans</Link>
          <span>/</span>
          <span className="text-foreground">{plan.title}</span>
        </nav>

        {/* ── TOP: Gallery + Purchase Panel ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">

          {/* LEFT: Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden bg-muted aspect-[4/3]">
              <img
                src={plan.images[selectedImage] || plan.main_image}
                alt={plan.title}
                className="w-full h-full object-cover"
              />
              {plan.is_featured && (
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded">
                  Best Seller
                </span>
              )}
              <span className="absolute top-4 right-4 bg-foreground/70 text-background text-xs font-medium px-2 py-1 rounded">
                ID {plan.plan_id}
              </span>
              {/* Prev / Next arrows */}
              {plan.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(i => Math.max(0, i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(i => Math.min(plan.images.length - 1, i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnail strip */}
            {plan.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {plan.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-primary' : 'border-transparent hover:border-border'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            {/* Specs strip */}
            <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2">
              {specs.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center py-3 bg-secondary rounded-lg text-center">
                  <Icon className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="font-bold text-sm">{value}</span>
                  <span className="text-[11px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Purchase panel */}
          <div className="lg:sticky lg:top-24 self-start space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold leading-tight">{plan.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {Array(5).fill(null).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                </div>
                <span className="text-sm text-muted-foreground">5 reviews</span>
              </div>
            </div>

            {/* File Type */}
            <div className="border rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">File Type</p>
              <div className="flex gap-2">
                {[
                  { value: 'CAD_PDF' as const, label: 'CAD + PDF' },
                  { value: 'PDF_ONLY' as const, label: 'PDF Only' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFileType(opt.value)}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${fileType === opt.value ? 'border-primary bg-primary text-white' : 'border-border hover:border-primary/50 hover:bg-primary/5'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawing Sets */}
            <div className="border rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Drawing Sets</p>
              <div className="space-y-2">
                {drawingOptions.map(({ key, label, price: drawPrice }) => {
                  const checked = drawingSets[key as keyof typeof drawingSets];
                  return (
                    <label
                      key={key}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${checked ? 'border-primary bg-primary/5' : 'hover:bg-secondary border-border'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${checked ? 'bg-primary border-primary' : 'border-border'}`}>
                          {checked && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (key === 'architectural' && !e.target.checked) return;
                            setDrawingSets({ ...drawingSets, [key]: e.target.checked });
                          }}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                      {drawPrice && (
                        <span className="text-xs text-muted-foreground font-semibold">
                          {key === 'architectural' ? 'Included' : `+$${drawPrice.toFixed(0)}`}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {[
                { icon: Truck, text: 'Instant digital delivery' },
                { icon: ShieldCheck, text: '100% Money Guarantee' },
                { icon: CreditCard, text: 'Multiple payment options' },
                { icon: Pencil, text: 'Customizable plans' },
                { icon: Calculator, text: 'Cost estimates included' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary" /> {text}
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="pt-2 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">${price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">{fileType === 'CAD_PDF' ? 'CAD + PDF' : 'PDF only'}</span>
              </div>
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full text-base font-bold py-6 bg-primary hover:bg-primary/90"
              >
                Buy Now — ${price.toFixed(2)}
              </Button>
              <Button
                onClick={handleAddToCart}
                size="lg"
                variant="outline"
                className="w-full text-base font-semibold py-6"
              >
                Add to Cart
              </Button>
            </div>

            {/* Share / Wishlist */}
            <div className="flex gap-3 pt-1">
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <Heart className="h-4 w-4" /> Add to Wishlist
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground ml-auto">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </div>
        </div>

        {/* ── DESCRIPTION ──────────────────────────────────────────── */}
        <div className="mt-12 bg-card border rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-display font-bold mb-3">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
        </div>

        {/* ── TESTIMONIAL CAROUSEL ────────────────────────────────── */}
        <div className="mt-10 bg-secondary/40 rounded-xl p-6 md:p-8">
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="flex gap-0.5 justify-center mb-4">
              {Array(5).fill(null).map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
            </div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={testimonialIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-base md:text-lg text-foreground italic mb-4"
              >
                "{testimonials[testimonialIdx].text}"
              </motion.blockquote>
            </AnimatePresence>
            <p className="font-semibold text-sm">{testimonials[testimonialIdx].name}</p>
            {testimonials[testimonialIdx].role && (
              <p className="text-xs text-muted-foreground">{testimonials[testimonialIdx].role}</p>
            )}
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => setTestimonialIdx(i => Math.max(0, i - 1))}
                className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-background"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === testimonialIdx ? 'bg-primary w-6' : 'bg-border w-2'}`} />
              ))}
              <button
                onClick={() => setTestimonialIdx(i => Math.min(testimonials.length - 1, i + 1))}
                className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-background"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── DRAWING SETS & ROOMS ────────────────────────────────── */}
        <div className="mt-10 border rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-display font-bold mb-6">Drawing Sets & Rooms Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rooms */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">Rooms Included</h3>
              <ul className="space-y-2">
                {plan.rooms_included.map((room) => (
                  <li key={room} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" /> {room}
                  </li>
                ))}
              </ul>
            </div>
            {/* Arch drawings */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">Architectural Drawings</h3>
              <ul className="space-y-2">
                {archDrawings.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" /> {d}
                  </li>
                ))}
              </ul>
            </div>
            {/* BOQ */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">Bills of Quantity</h3>
              <ul className="space-y-2">
                {plan.has_boq ? (
                  <>
                    <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> Bills of Quantity (BOQ)</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> Schedule of Materials</li>
                  </>
                ) : (
                  <li className="text-sm text-muted-foreground">BOQ not included — available as an add-on.</li>
                )}
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── YOU MAY ALSO LIKE ───────────────────────────────────── */}
        {relatedPlans.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-display font-bold mb-5">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedPlans.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group block">
                  <div className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img src={p.main_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-medium line-clamp-2 group-hover:text-primary transition-colors">{p.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{p.bedrooms} bed · {p.area}m²</span>
                        <span className="text-sm font-bold text-primary">${p.base_price.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── CONSTRUCTION COST CALCULATOR ────────────────────────── */}
        <div className="mt-12 bg-card border rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-display font-bold mb-2">Construction Cost Calculator</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Auto-calculated for <strong>{plan.area} m²</strong> — switch tiers to see how finish quality affects total cost.
          </p>

          {/* Tier toggle */}
          <div className="flex gap-2 mb-6 border rounded-lg p-1 w-fit">
            {(['Basic', 'Standard', 'Luxury'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setCostTier(tier)}
                className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${costTier === tier ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tier}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-semibold">Item</th>
                  <th className="text-right py-2 font-semibold">Cost Estimate</th>
                </tr>
              </thead>
              <tbody>
                {costEstimates.map(({ label, formatted }, i) => (
                  <tr key={label} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-secondary/30' : ''}`}>
                    <td className="py-2.5 px-1">{i + 1}. {label}</td>
                    <td className="py-2.5 px-1 text-right font-medium">{formatted}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-foreground/20">
                  <td className="py-3 font-bold">TOTAL</td>
                  <td className="py-3 text-right font-bold text-primary text-base">
                    ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            These are estimates only. Actual costs depend on location, contractor rates, material costs and site conditions.
          </p>

          {/* Customize CTA */}
          <div className="mt-6 bg-secondary/60 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Want a plan tailored to your budget?</p>
              <p className="text-sm text-muted-foreground mt-0.5">Customize rooms, finishes and budget — and see it come to life.</p>
            </div>
            <Button asChild className="flex-shrink-0">
              <Link to="/custom-plan">Customize Your Plan</Link>
            </Button>
          </div>
        </div>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <div className="mt-12">
          <h2 className="text-xl font-display font-bold mb-2">FAQ</h2>
          <p className="text-sm text-muted-foreground mb-4">Our support team is available Mon–Fri, 7:00 AM – 5:00 PM EAT.</p>
          <div className="border rounded-xl px-5 divide-y">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY BAR ───────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-lg p-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground truncate">{plan.title}</p>
          <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
        </div>
        <Button onClick={handleAddToCart} className="font-bold px-6 bg-primary">
          Buy Now
        </Button>
      </div>
      {/* Bottom padding so sticky bar doesn't cover content on mobile */}
      <div className="lg:hidden h-20" />
    </Layout>
  );
}
