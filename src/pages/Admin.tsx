import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Edit, Trash2, Package, ShoppingBag,
  LayoutDashboard, X, Save, ImagePlus, ChevronDown, ChevronUp, Eye,
  Mail, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { samplePlans } from '@/data/samplePlans';
import type { HousePlan } from '@/types';
import { toast } from 'sonner';

// ── Empty plan template ───────────────────────────────────────────
const EMPTY_PLAN: Omit<HousePlan, 'id' | 'created_at' | 'updated_at'> = {
  plan_id: '', title: '', slug: '', description: '', short_desc: '',
  floors: 1, bedrooms: 1, bathrooms: 1, width: 0, length: 0, area: 0,
  base_price: 0, cad_pdf_price: 0,
  category: 'Residential', style: 'Modern', budget_range: '',
  main_image: '', images: [],
  has_architectural: true, has_structural: false, has_mechanical: false,
  has_electrical: false, has_boq: false, has_interior: false,
  architectural_price: 0, structural_price: 0, mechanical_price: 0,
  electrical_price: 0, boq_price: 0, interior_price: 0,
  rooms_included: [], features: [],
  is_active: true, is_featured: false, is_customizable: false,
  view_count: 0, sales_count: 0,
};

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ── Collapsible section ───────────────────────────────────────────
function Section({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl overflow-hidden">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3 bg-secondary/50 hover:bg-secondary text-sm font-semibold transition-colors">
        {title}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</Label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

// ── Plan Form ─────────────────────────────────────────────────────
function PlanForm({ initial, onSave, onCancel }: {
  initial: Partial<HousePlan>;
  onSave: (plan: Partial<HousePlan>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<HousePlan>>({ ...EMPTY_PLAN, ...initial });
  const [newImage, setNewImage] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const set = (key: keyof HousePlan, value: unknown) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleTitleChange = (v: string) => {
    set('title', v);
    if (!initial.slug) set('slug', slugify(v));
  };

  const addImage = () => {
    const url = newImage.trim();
    if (!url) return;
    const imgs = [...(form.images || []), url];
    set('images', imgs);
    if (!form.main_image) set('main_image', url);
    setNewImage('');
  };

  const removeImage = (i: number) => {
    const imgs = (form.images || []).filter((_, idx) => idx !== i);
    set('images', imgs);
    if (form.main_image === (form.images || [])[i]) set('main_image', imgs[0] || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim() || !form.plan_id?.trim()) {
      toast.error('Plan ID and Title are required');
      return;
    }
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── Identity ── */}
      <Section title="Plan Identity">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Plan ID *" hint="Unique identifier e.g. 24411">
            <Input value={form.plan_id || ''} onChange={e => set('plan_id', e.target.value)} placeholder="e.g. 24411" required />
          </Field>
          <Field label="Title *">
            <Input value={form.title || ''} onChange={e => handleTitleChange(e.target.value)} placeholder="e.g. 3 Bedroom Modern Bungalow" required />
          </Field>
          <Field label="URL Slug" hint="Auto-generated from title — used in the page URL">
            <Input value={form.slug || ''} onChange={e => set('slug', e.target.value)} placeholder="3-bedroom-modern-bungalow" />
          </Field>
          <Field label="Category">
            <Select value={form.category || 'Residential'} onValueChange={v => set('category', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Residential', 'Commercial', 'Apartments', 'Hotels & Lodges'].map(c =>
                  <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Style">
            <Select value={form.style || 'Modern'} onValueChange={v => set('style', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Modern', 'Contemporary', 'Traditional', 'Farmhouse', 'Bungalow', 'Luxury'].map(s =>
                  <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Budget Range" hint="Optional — e.g. $50,000–$80,000">
            <Input value={form.budget_range || ''} onChange={e => set('budget_range', e.target.value)} placeholder="e.g. $50,000–$80,000" />
          </Field>
        </div>
        <Field label="Short Description" hint="One-liner shown on plan cards (max ~120 characters)">
          <Input value={form.short_desc || ''} onChange={e => set('short_desc', e.target.value)} placeholder="e.g. Spacious 3-bed family home with open-plan kitchen and double garage" />
        </Field>
        <Field label="Full Description">
          <textarea
            value={form.description || ''}
            onChange={e => set('description', e.target.value)}
            rows={5}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            placeholder="Detailed description — layout, rooms, who this plan suits, special features..."
          />
        </Field>
      </Section>

      {/* ── Dimensions ── */}
      <Section title="Dimensions & Specifications">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {([
            ['floors',    'Floors',      '1'],
            ['bedrooms',  'Bedrooms',    '3'],
            ['bathrooms', 'Bathrooms',   '2'],
            ['width',     'Width (m)',   '12'],
            ['length',    'Length (m)',  '14'],
            ['area',      'Area (m²)',   '168'],
          ] as [keyof HousePlan, string, string][]).map(([key, label, ph]) => (
            <Field key={key} label={label}>
              <Input type="number" min="0" step="0.01"
                value={(form[key] as number) || ''}
                onChange={e => set(key, parseFloat(e.target.value) || 0)}
                placeholder={ph} />
            </Field>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          💡 <strong>Area</strong> is used to automatically calculate construction costs on the product page — enter accurately.
        </p>
      </Section>

      {/* ── Pricing ── */}
      <Section title="Pricing">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="PDF Only Price ($)" hint="Customer receives PDF drawings by email">
            <Input type="number" min="0" step="0.01"
              value={form.base_price || ''}
              onChange={e => set('base_price', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 150" />
          </Field>
          <Field label="CAD + PDF Price ($)" hint="Customer receives both CAD/DWG and PDF files by email">
            <Input type="number" min="0" step="0.01"
              value={form.cad_pdf_price || ''}
              onChange={e => set('cad_pdf_price', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 200" />
          </Field>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 flex gap-2">
          <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>After a customer pays and selects their drawing sets, you will receive an order notification email with all their details — name, email, plan ID, file format (PDF/CAD), and exactly which drawing sets they selected. You then email them the files manually.</span>
        </div>
      </Section>

      {/* ── Drawing Sets ── */}
      <Section title="Drawing Sets Available for This Plan">
        <p className="text-xs text-muted-foreground -mt-1">
          Tick which drawing sets exist for this plan. Customers will see these as options to add to their order. Any you leave unticked will be hidden from customers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {([
            ['has_architectural', 'architectural_price', '🏛️', 'Architectural Drawings', 'Floor plans, elevations, sections'],
            ['has_structural',    'structural_price',    '🏗️', 'Structural Drawings',   'Columns, beams, reinforcement'],
            ['has_mechanical',    'mechanical_price',    '🔧', 'Mechanical / Plumbing', 'Plumbing and drainage layout'],
            ['has_electrical',    'electrical_price',    '⚡', 'Electrical Drawings',   'Wiring, sockets, load schedule'],
            ['has_boq',           'boq_price',           '📊', 'Bill of Quantities',    'Itemised materials and costs'],
            ['has_interior',      'interior_price',      '🛋️', 'Interior Design',       'Furniture layout and finishes'],
          ] as [keyof HousePlan, keyof HousePlan, string, string, string][]).map(([toggle, priceKey, icon, label, desc]) => (
            <div key={toggle}
              className={`border rounded-xl p-4 space-y-3 transition-colors ${form[toggle] ? 'border-primary bg-primary/5' : 'hover:border-border/80'}`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={!!form[toggle]}
                  onChange={e => set(toggle, e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-primary" />
                <div>
                  <p className="text-sm font-semibold">{icon} {label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </label>
              {form[toggle] && (
                <div>
                  <Label className="text-xs text-muted-foreground">Add-on price ($) — leave 0 if included in base price</Label>
                  <Input type="number" min="0" step="0.01"
                    value={(form[priceKey] as number) || ''}
                    onChange={e => set(priceKey, parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="mt-1 h-8 text-sm" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Images ── */}
      <Section title="Product Images">
        <p className="text-xs text-muted-foreground -mt-1">
          Paste the URL of each image (renders, photos, floor plan drawings). The first image — or whichever you mark as Main — becomes the cover shown in search results. You can add as many as you like, or skip images you don't have yet.
        </p>

        {/* Add URL input */}
        <div className="flex gap-2">
          <Input
            value={newImage}
            onChange={e => setNewImage(e.target.value)}
            placeholder="https://example.com/render-front.jpg"
            className="text-sm"
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage(); }}}
          />
          <Button type="button" onClick={addImage} variant="outline" className="flex-shrink-0 gap-1.5">
            <ImagePlus className="h-4 w-4" /> Add
          </Button>
        </div>

        {/* Image grid */}
        {(form.images || []).length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {(form.images || []).map((img, i) => (
              <div key={i}
                className={`relative group rounded-xl overflow-hidden border-2 aspect-square bg-muted transition-all
                  ${form.main_image === img ? 'border-primary shadow-md' : 'border-transparent hover:border-border'}`}>
                <img src={img} alt="" className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                  {form.main_image !== img && (
                    <button type="button" onClick={() => set('main_image', img)}
                      className="text-[10px] text-white bg-primary w-full py-1 rounded font-medium">
                      Set as Main
                    </button>
                  )}
                  <button type="button" onClick={() => removeImage(i)}
                    className="text-[10px] text-white bg-destructive/90 w-full py-1 rounded font-medium">
                    Remove
                  </button>
                </div>

                {form.main_image === img && (
                  <span className="absolute top-1.5 left-1.5 text-[9px] bg-primary text-white px-1.5 py-0.5 rounded font-bold">MAIN</span>
                )}
                <span className="absolute bottom-1 right-1.5 text-[9px] text-white/60">{i + 1}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground">
            <ImagePlus className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No images yet — paste a URL above to add your first image</p>
            <p className="text-xs mt-1">You can always add images later</p>
          </div>
        )}
      </Section>

      {/* ── Rooms ── */}
      <Section title="Rooms Included" defaultOpen={false}>
        <p className="text-xs text-muted-foreground -mt-1">These appear in the "What's Included" section on the product page.</p>
        <div className="flex gap-2">
          <Input value={newRoom} onChange={e => setNewRoom(e.target.value)}
            placeholder="e.g. Master Bedroom with En-suite"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (newRoom.trim()) { set('rooms_included', [...(form.rooms_included || []), newRoom.trim()]); setNewRoom(''); }
              }
            }} />
          <Button type="button" variant="outline" className="flex-shrink-0"
            onClick={() => { if (newRoom.trim()) { set('rooms_included', [...(form.rooms_included || []), newRoom.trim()]); setNewRoom(''); } }}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(form.rooms_included || []).map((r, i) => (
            <span key={i} className="flex items-center gap-1 bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
              {r}
              <button type="button" onClick={() => set('rooms_included', (form.rooms_included || []).filter((_, idx) => idx !== i))}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Common: Living Room · Kitchen · Dining · Master Bedroom · Bedroom · Bathroom · WC · Veranda · Store · Garage · Study · Laundry</p>
      </Section>

      {/* ── Features ── */}
      <Section title="Features & Highlights" defaultOpen={false}>
        <p className="text-xs text-muted-foreground -mt-1">Key selling points shown as bullet points on the product page.</p>
        <div className="flex gap-2">
          <Input value={newFeature} onChange={e => setNewFeature(e.target.value)}
            placeholder="e.g. Open-plan kitchen and dining"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (newFeature.trim()) { set('features', [...(form.features || []), newFeature.trim()]); setNewFeature(''); }
              }
            }} />
          <Button type="button" variant="outline" className="flex-shrink-0"
            onClick={() => { if (newFeature.trim()) { set('features', [...(form.features || []), newFeature.trim()]); setNewFeature(''); } }}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(form.features || []).map((f, i) => (
            <span key={i} className="flex items-center gap-1 bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
              {f}
              <button type="button" onClick={() => set('features', (form.features || []).filter((_, idx) => idx !== i))}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </Section>

      {/* ── Visibility ── */}
      <Section title="Visibility & Status" defaultOpen={false}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {([
            ['is_active',       'Active',        'Visible on the shop and searchable'],
            ['is_featured',     'Best Seller',   'Shown in the homepage featured section'],
            ['is_customizable', 'Customizable',  'Can be ordered as a custom/modified plan'],
          ] as [keyof HousePlan, string, string][]).map(([key, label, hint]) => (
            <label key={key}
              className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${form[key] ? 'border-primary bg-primary/5' : 'hover:border-border/80'}`}>
              <input type="checkbox" checked={!!form[key]}
                onChange={e => set(key, e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-primary" />
              <div>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground">{hint}</p>
              </div>
            </label>
          ))}
        </div>
      </Section>

      {/* ── Sticky save bar ── */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t py-4 flex gap-3">
        <Button type="submit" className="sm:px-10 font-semibold gap-2">
          <Save className="h-4 w-4" /> Save Plan
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────
export default function Admin() {
  const { isAdmin, loading } = useAuth();
  const [plans, setPlans] = useState<HousePlan[]>(samplePlans as HousePlan[]);
  const [editing, setEditing] = useState<Partial<HousePlan> | null>(null);
  const [isNew, setIsNew] = useState(false);

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    </Layout>
  );

  if (!isAdmin) return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">You need admin privileges to access this page.</p>
        <Button asChild className="mt-4"><Link to="/">Go Home</Link></Button>
      </div>
    </Layout>
  );

  const handleSave = (updated: Partial<HousePlan>) => {
    if (isNew) {
      const newPlan: HousePlan = {
        ...EMPTY_PLAN, ...updated,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as HousePlan;
      setPlans(p => [newPlan, ...p]);
      toast.success('Plan created!');
    } else {
      setPlans(p => p.map(plan =>
        plan.id === updated.id
          ? { ...plan, ...updated, updated_at: new Date().toISOString() }
          : plan
      ));
      toast.success('Plan updated!');
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this plan? This cannot be undone.')) return;
    setPlans(p => p.filter(plan => plan.id !== id));
    toast.success('Plan deleted');
  };

  const handleToggleActive = (id: string) => {
    setPlans(p => p.map(plan =>
      plan.id === id ? { ...plan, is_active: !plan.is_active } : plan
    ));
  };

  // ── Edit / Create form view ───────────────────────────────────
  if (editing !== null) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <button onClick={() => { setEditing(null); setIsNew(false); }}
              className="text-muted-foreground hover:text-foreground transition-colors">
              ← Dashboard
            </button>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold">{isNew ? 'New Plan' : `Editing: ${editing.title || 'Plan'}`}</span>
          </div>
          <PlanForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => { setEditing(null); setIsNew(false); }}
          />
        </div>
      </Layout>
    );
  }

  // ── Dashboard list view ───────────────────────────────────────
  const activePlans  = plans.filter(p => p.is_active).length;
  const featuredPlans = plans.filter(p => p.is_featured).length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage house plans and view orders</p>
          </div>
          <Button onClick={() => { setIsNew(true); setEditing({ ...EMPTY_PLAN }); }} className="gap-2">
            <Plus className="h-4 w-4" /> Add New Plan
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Package,         label: 'Total Plans',    value: plans.length,    sub: `${activePlans} active` },
            { icon: Eye,             label: 'Featured',       value: featuredPlans,   sub: 'on homepage' },
            { icon: ShoppingBag,     label: 'Orders',         value: 0,               sub: 'pending fulfilment' },
            { icon: LayoutDashboard, label: 'Revenue',        value: '$0',            sub: 'all time' },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="bg-card border rounded-xl p-5">
              <div className="flex items-start justify-between">
                <Icon className="h-7 w-7 text-primary" />
                <span className="text-2xl font-bold">{value}</span>
              </div>
              <p className="mt-2 text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>

        {/* How fulfilment works */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
          <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-0.5">How order fulfilment works</p>
            <p>When a customer completes checkout, you receive an email with their name, email address, plan ID, file format (PDF or CAD+PDF), and the exact drawing sets they selected. Simply email them the relevant files. No automatic delivery — fully manual and in your control.</p>
          </div>
        </div>

        <Tabs defaultValue="plans">
          <TabsList>
            <TabsTrigger value="plans">House Plans ({plans.length})</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Plans table */}
          <TabsContent value="plans" className="mt-6">
            <div className="border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      <th className="p-3">Image</th>
                      <th className="p-3">Plan</th>
                      <th className="p-3">Specs</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Drawing Sets</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan) => (
                      <tr key={plan.id} className="border-t hover:bg-secondary/30 transition-colors">
                        {/* Thumbnail */}
                        <td className="p-3">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {plan.main_image
                              ? <img src={plan.main_image} alt="" className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-[10px] text-center p-1">No image</div>
                            }
                          </div>
                        </td>
                        {/* Plan info */}
                        <td className="p-3">
                          <p className="font-semibold line-clamp-1 max-w-[180px]">{plan.title}</p>
                          <p className="text-xs font-mono text-primary mt-0.5">#{plan.plan_id}</p>
                          <p className="text-xs text-muted-foreground">{plan.category} · {plan.style}</p>
                        </td>
                        {/* Specs */}
                        <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                          {plan.bedrooms} bed · {plan.bathrooms} bath<br />
                          {plan.area} m² · {plan.floors} floor{plan.floors !== 1 ? 's' : ''}
                        </td>
                        {/* Price */}
                        <td className="p-3 whitespace-nowrap">
                          <p className="font-semibold">${plan.base_price.toFixed(0)} <span className="text-xs font-normal text-muted-foreground">PDF</span></p>
                          <p className="text-xs text-muted-foreground">${plan.cad_pdf_price.toFixed(0)} CAD+PDF</p>
                        </td>
                        {/* Drawing sets */}
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {[
                              plan.has_architectural && 'Arch',
                              plan.has_structural    && 'Struct',
                              plan.has_electrical    && 'Elec',
                              plan.has_mechanical    && 'Mech',
                              plan.has_boq           && 'BOQ',
                              plan.has_interior      && 'Interior',
                            ].filter(Boolean).map(tag => (
                              <span key={tag as string} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        {/* Status */}
                        <td className="p-3">
                          <div className="flex flex-col gap-1">
                            <button onClick={() => handleToggleActive(plan.id)}
                              className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium w-fit transition-colors
                                ${plan.is_active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                              {plan.is_active ? '● Active' : '○ Inactive'}
                            </button>
                            {plan.is_featured && (
                              <span className="text-[10px] bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full font-medium w-fit">
                                ★ Featured
                              </span>
                            )}
                          </div>
                        </td>
                        {/* Actions */}
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" className="h-8 px-2.5 text-xs gap-1"
                              onClick={() => { setIsNew(false); setEditing(plan); }}>
                              <Edit className="h-3 w-3" /> Edit
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-red-50"
                              onClick={() => handleDelete(plan.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Orders tab */}
          <TabsContent value="orders" className="mt-6">
            <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-xl">
              <ShoppingBag className="mx-auto h-12 w-12 mb-3 opacity-20" />
              <p className="font-semibold text-foreground">No orders yet</p>
              <p className="text-sm mt-1 max-w-sm mx-auto">
                When customers complete a purchase, their order details (name, email, plan, drawing sets selected) will appear here so you can fulfil by email.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
