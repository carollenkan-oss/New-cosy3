export interface HousePlan {
  id: string;
  plan_id: string;
  title: string;
  slug: string;
  description: string;
  short_desc?: string;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  width: number;
  length: number;
  area: number;
  base_price: number;
  cad_pdf_price: number;
  category: string;
  style?: string;
  budget_range?: string;
  main_image: string;
  images: string[];
  has_architectural: boolean;
  has_structural: boolean;
  has_mechanical: boolean;
  has_electrical: boolean;
  has_boq: boolean;
  has_interior: boolean;
  architectural_price?: number;
  structural_price?: number;
  mechanical_price?: number;
  electrical_price?: number;
  boq_price?: number;
  interior_price?: number;
  rooms_included: string[];
  features: string[];
  is_active: boolean;
  is_featured: boolean;
  is_customizable: boolean;
  view_count: number;
  sales_count: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  housePlanId: string;
  title: string;
  planId: string;
  mainImage: string;
  fileType: 'PDF_ONLY' | 'CAD_PDF';
  drawingSets: {
    architectural: boolean;
    structural: boolean;
    mechanical: boolean;
    electrical: boolean;
    boq: boolean;
    interior: boolean;
  };
  price: number;
  quantity: number;
  isCustomPlan?: boolean;
  customSpecs?: Record<string, unknown>;
}

export type FileType = 'PDF_ONLY' | 'CAD_PDF';

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  subtotal: number;
  tax: number;
  total: number;
  payment_status: PaymentStatus;
  payment_method?: string;
  pesapal_order_id?: string;
  paid_at?: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  house_plan_id: string;
  file_type: string;
  include_architectural: boolean;
  include_structural: boolean;
  include_mechanical: boolean;
  include_electrical: boolean;
  include_boq: boolean;
  unit_price: number;
  total_price: number;
  house_plan?: HousePlan;
}
