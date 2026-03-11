import { Link } from 'react-router-dom';
import { Building2, BedDouble, Bath, Ruler, Move } from 'lucide-react';
import type { HousePlan } from '@/types';

interface PlanCardProps {
  plan: HousePlan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <Link to={`/product/${plan.id}`} className="group block">
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {plan.main_image ? (
            <img
              src={plan.main_image}
              alt={plan.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
          {plan.is_featured && (
            <span className="absolute top-3 left-3 bg-badge text-badge-foreground text-xs font-semibold px-2.5 py-1 rounded">
              Best Seller
            </span>
          )}
          <span className="absolute bottom-3 right-3 bg-foreground/70 text-background text-xs font-medium px-2 py-1 rounded">
            ID {plan.plan_id}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {plan.title}
          </h3>

          {/* Specs Grid */}
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              { icon: Building2, value: plan.floors, label: plan.floors === 1 ? 'Floor' : 'Floors' },
              { icon: BedDouble, value: plan.bedrooms, label: plan.bedrooms === 1 ? 'Bed' : 'Beds' },
              { icon: Bath, value: plan.bathrooms, label: plan.bathrooms === 1 ? 'Bath' : 'Baths' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center py-2 bg-secondary rounded text-xs">
                <Icon className="h-3.5 w-3.5 text-muted-foreground mb-0.5" />
                <span className="font-semibold">{value}</span>
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{plan.width}m × {plan.length}m</span>
            <span>{plan.area} m²</span>
          </div>

          {/* Price */}
          <div className="mt-3 pt-3 border-t">
            <span className="text-sm text-muted-foreground">From </span>
            <span className="text-lg font-bold text-primary">${plan.base_price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
