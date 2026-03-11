import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PlanCard from '@/components/shop/PlanCard';
import Layout from '@/components/layout/Layout';
import { samplePlans } from '@/data/samplePlans';

const productTypes = ['All', 'Residential', 'Commercial', 'Apartments', 'Hotels & Lodges'];
const bedroomOptions = ['Any', '1', '2', '3', '4', '5'];
const floorOptions = ['Any', '1', '2', '3'];
const styleOptions = ['Any', 'Modern', 'Contemporary', 'Traditional', 'Farmhouse'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // All filter state lives in the URL — nav links work correctly
  const category = searchParams.get('category') || 'All';
  const bedrooms = searchParams.get('bedrooms') || 'Any';
  const style    = searchParams.get('style')    || 'Any';
  const floors   = searchParams.get('floors')   || 'Any';
  const sortBy   = searchParams.get('sort')     || 'featured';

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'All' || value === 'Any' || value === 'featured') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const activeFilterCount = [category !== 'All', bedrooms !== 'Any', style !== 'Any', floors !== 'Any'].filter(Boolean).length;

  const clearAll = () => setSearchParams({}, { replace: true });

  const filteredPlans = useMemo(() => {
    let plans = [...samplePlans];

    if (search) {
      const q = search.toLowerCase();
      plans = plans.filter(p => p.title.toLowerCase().includes(q) || p.plan_id.includes(q));
    }
    if (category !== 'All') plans = plans.filter(p => p.category === category);
    if (style !== 'Any') plans = plans.filter(p => p.style === style);
    if (bedrooms !== 'Any') {
      const b = parseInt(bedrooms);
      plans = plans.filter(p => bedrooms === '5' ? p.bedrooms >= 5 : p.bedrooms === b);
    }
    if (floors !== 'Any') {
      const f = parseInt(floors);
      plans = plans.filter(p => floors === '3' ? p.floors >= 3 : p.floors === f);
    }

    switch (sortBy) {
      case 'best-selling': plans.sort((a, b) => b.sales_count - a.sales_count); break;
      case 'price-low':    plans.sort((a, b) => a.base_price - b.base_price);   break;
      case 'price-high':   plans.sort((a, b) => b.base_price - a.base_price);   break;
      case 'newest':       plans.sort((a, b) => b.id.localeCompare(a.id));      break;
      default:             plans.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    return plans;
  }, [search, category, style, bedrooms, floors, sortBy]);

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://www.maramani.com/cdn/shop/collections/ID-12210_pp1_cleanup.png?v=1715582702&width=1920"
          alt="House Plans"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white">House Plans</h1>
          <p className="mt-3 text-white/80 max-w-2xl text-sm md:text-base">
            Browse our professionally designed house plans — from compact 1-bedroom bungalows to spacious 5+ bedroom family homes. Instant digital delivery.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{activeFilterCount}</span>
              )}
            </Button>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <X className="h-3 w-3" /> Clear all
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plans..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-60"
              />
            </div>
            <Select value={sortBy} onValueChange={(v) => setParam('sort', v)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="best-selling">Best Selling</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-56 flex-shrink-0 space-y-6">
              {/* Category */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Category</h3>
                <div className="space-y-2">
                  {productTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={category === type}
                        onChange={() => setParam('category', type)}
                        className="h-4 w-4 text-primary"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Bedrooms</h3>
                <div className="space-y-2">
                  {bedroomOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="bedrooms"
                        checked={bedrooms === opt}
                        onChange={() => setParam('bedrooms', opt)}
                        className="h-4 w-4 text-primary"
                      />
                      {opt === 'Any' ? 'Any' : opt === '5' ? '5+ Bedrooms' : `${opt} Bedroom${opt !== '1' ? 's' : ''}`}
                    </label>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Style</h3>
                <div className="space-y-2">
                  {styleOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="style"
                        checked={style === opt}
                        onChange={() => setParam('style', opt)}
                        className="h-4 w-4 text-primary"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Floors */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Floors</h3>
                <div className="space-y-2">
                  {floorOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="floors"
                        checked={floors === opt}
                        onChange={() => setParam('floors', opt)}
                        className="h-4 w-4 text-primary"
                      />
                      {opt === 'Any' ? 'Any' : opt === '3' ? '3+ Floors' : `${opt} Floor${opt !== '1' ? 's' : ''}`}
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filteredPlans.length} plans</p>
            {filteredPlans.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-semibold">No plans found</p>
                <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
                <Button variant="outline" className="mt-4" onClick={clearAll}>Clear filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
