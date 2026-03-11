import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

const roomTypes = ['Bedroom', 'Bathroom', 'Kitchen', 'Dining Room', 'Living Room', 'Pantry', 'Veranda', 'Terrace', 'Office', 'Garage'];

const drawingSetOptions = [
  { key: 'architectural', label: 'Architectural Drawings', pricePerSqm: 3.90 },
  { key: 'structural', label: 'Structural Drawings', pricePerSqm: 0.85 },
  { key: 'mechanical', label: 'Mechanical Drawings', pricePerSqm: 0.72 },
  { key: 'electrical', label: 'Electrical Drawings', pricePerSqm: 0.78 },
  { key: 'boq', label: 'Bills of Quantities', pricePerSqm: 3.25 },
];

const constructionRates = { basic: 350, standard: 500, luxury: 800 };

export default function CustomPlan() {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [floors, setFloors] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [rooms, setRooms] = useState([
    { type: 'Bedroom', count: 1 },
    { type: 'Bathroom', count: 1 },
    { type: 'Kitchen', count: 1 },
  ]);
  const [drawingSets, setDrawingSets] = useState({
    architectural: true,
    structural: false,
    mechanical: false,
    electrical: false,
    boq: false,
  });
  const [quality, setQuality] = useState<'basic' | 'standard' | 'luxury'>('standard');

  // Calculate area based on rooms
  const area = useMemo(() => {
    const roomAreas: Record<string, number> = {
      Bedroom: 16, Bathroom: 6, Kitchen: 12, 'Dining Room': 14, 'Living Room': 20,
      Pantry: 4, Veranda: 10, Terrace: 15, Office: 12, Garage: 18,
    };
    return rooms.reduce((sum, r) => sum + (roomAreas[r.type] || 12) * r.count, 0) * floors;
  }, [rooms, floors]);

  const costs = useMemo(() => {
    let drawingCost = 0;
    drawingSetOptions.forEach(opt => {
      if (drawingSets[opt.key as keyof typeof drawingSets]) {
        drawingCost += opt.pricePerSqm * area;
      }
    });
    const constructionCost = area * constructionRates[quality];
    return { drawingCost, constructionCost };
  }, [drawingSets, area, quality]);

  const handleBuy = () => {
    addItem({
      id: `custom-${Date.now()}`,
      housePlanId: 'custom-plan',
      title: `Custom ${floors}-Story House Plan`,
      planId: 'CUSTOM',
      mainImage: '',
      fileType: 'CAD_PDF',
      drawingSets: { ...drawingSets, interior: false },
      price: costs.drawingCost,
      quantity: 1,
      isCustomPlan: true,
      customSpecs: { floors, bedrooms, rooms, area, quality },
    });
    toast.success('Custom plan added to cart!');
    navigate('/cart');
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-card border-b py-12 text-center">
        <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
          <Home className="h-8 w-8 text-primary" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto px-4 text-sm">
          Customize your dream home with the highest quality, the best layout, and a budget that suits you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Configuration */}
          <div className="space-y-6">
            {/* Custom Plan Form */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-display font-bold text-center mb-6">Custom plan</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Number of Floors</Label>
                  <Input type="number" min={1} max={5} value={floors} onChange={e => setFloors(+e.target.value)} className="w-20 text-center" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Number of Bedrooms</Label>
                  <Select value={String(bedrooms)} onValueChange={v => setBedrooms(+v)}>
                    <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Rooms */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">Want to add another room?</p>
                  <Button variant="link" size="sm" onClick={() => setRooms([...rooms, { type: 'Bedroom', count: 1 }])} className="text-accent">
                    <Plus className="h-3 w-3 mr-1" /> Add a room
                  </Button>
                </div>
                <div className="space-y-2">
                  {rooms.map((room, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Select value={room.type} onValueChange={v => { const r = [...rooms]; r[i].type = v; setRooms(r); }}>
                        <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {roomTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input type="number" min={1} max={10} value={room.count} onChange={e => { const r = [...rooms]; r[i].count = +e.target.value; setRooms(r); }} className="w-16 text-center" />
                      <Button variant="ghost" size="icon" onClick={() => setRooms(rooms.filter((_, j) => j !== i))} className="text-destructive h-8 w-8">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-muted-foreground">Area: {area} m²</p>

              {/* Drawing Sets */}
              <div className="mt-6">
                <h3 className="font-semibold text-sm mb-3">Drawing Sets</h3>
                <div className="space-y-2">
                  {drawingSetOptions.map(opt => (
                    <label key={opt.key} className="flex items-center justify-between text-sm cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span>{opt.label}</span>
                        <span className="text-muted-foreground">(${opt.pricePerSqm.toFixed(2)}/m²):</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={drawingSets[opt.key as keyof typeof drawingSets]}
                        onChange={e => setDrawingSets({ ...drawingSets, [opt.key]: e.target.checked })}
                        className="h-4 w-4 rounded text-primary"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <Button onClick={handleBuy} size="lg" className="w-full mt-6 font-semibold bg-primary hover:bg-primary/90">
                BUY NOW, ${costs.drawingCost.toFixed(2)}
              </Button>
            </div>
          </div>

          {/* Right: Construction Cost Calculator */}
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-display font-bold text-center mb-6">Construction Cost Calculator</h2>

              {/* Quality Selection */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {(['basic', 'standard', 'luxury'] as const).map(q => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`p-4 border rounded-lg text-center capitalize transition-colors ${quality === q ? 'border-primary bg-primary/5 font-semibold' : 'hover:bg-secondary'}`}
                  >
                    <div className="text-sm font-medium">{q}</div>
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground mb-6">Area: {area} m²</p>

              {/* Cost Breakdown Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="text-left p-3 font-semibold">Item</th>
                      <th className="text-right p-3 font-semibold">Cost Estimates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: '1. Substructure', pct: 0.12 },
                      { item: '2. Superstructure', pct: 0.25 },
                      { item: '3. Roof', pct: 0.15 },
                      { item: '4. Doors', pct: 0.05 },
                      { item: '5. Windows', pct: 0.06 },
                      { item: '6. Finishes', pct: 0.12 },
                      { item: '7. Decorations', pct: 0.05 },
                      { item: '8. Plumbing', pct: 0.08 },
                      { item: '9. Electrical', pct: 0.07 },
                    ].map(({ item, pct }) => (
                      <tr key={item} className="border-t">
                        <td className="p-3">{item}</td>
                        <td className="p-3 text-right font-medium">${(costs.constructionCost * pct).toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="border-t bg-secondary font-bold">
                      <td className="p-3">TOTAL</td>
                      <td className="p-3 text-right text-primary">${costs.constructionCost.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
