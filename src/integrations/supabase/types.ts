export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      house_plans: {
        Row: {
          architectural_price: number | null
          area: number
          base_price: number
          bathrooms: number
          bedrooms: number
          boq_price: number | null
          budget_range: string | null
          cad_pdf_price: number
          category: string
          created_at: string
          description: string
          electrical_price: number | null
          features: string[] | null
          floors: number
          has_architectural: boolean | null
          has_boq: boolean | null
          has_electrical: boolean | null
          has_interior: boolean | null
          has_mechanical: boolean | null
          has_structural: boolean | null
          id: string
          images: string[] | null
          interior_price: number | null
          is_active: boolean | null
          is_customizable: boolean | null
          is_featured: boolean | null
          length: number
          main_image: string | null
          mechanical_price: number | null
          plan_id: string
          rooms_included: string[] | null
          sales_count: number | null
          short_desc: string | null
          slug: string
          structural_price: number | null
          style: string | null
          title: string
          updated_at: string
          view_count: number | null
          width: number
        }
        Insert: {
          architectural_price?: number | null
          area: number
          base_price: number
          bathrooms?: number
          bedrooms?: number
          boq_price?: number | null
          budget_range?: string | null
          cad_pdf_price: number
          category?: string
          created_at?: string
          description: string
          electrical_price?: number | null
          features?: string[] | null
          floors?: number
          has_architectural?: boolean | null
          has_boq?: boolean | null
          has_electrical?: boolean | null
          has_interior?: boolean | null
          has_mechanical?: boolean | null
          has_structural?: boolean | null
          id?: string
          images?: string[] | null
          interior_price?: number | null
          is_active?: boolean | null
          is_customizable?: boolean | null
          is_featured?: boolean | null
          length: number
          main_image?: string | null
          mechanical_price?: number | null
          plan_id: string
          rooms_included?: string[] | null
          sales_count?: number | null
          short_desc?: string | null
          slug: string
          structural_price?: number | null
          style?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
          width: number
        }
        Update: {
          architectural_price?: number | null
          area?: number
          base_price?: number
          bathrooms?: number
          bedrooms?: number
          boq_price?: number | null
          budget_range?: string | null
          cad_pdf_price?: number
          category?: string
          created_at?: string
          description?: string
          electrical_price?: number | null
          features?: string[] | null
          floors?: number
          has_architectural?: boolean | null
          has_boq?: boolean | null
          has_electrical?: boolean | null
          has_interior?: boolean | null
          has_mechanical?: boolean | null
          has_structural?: boolean | null
          id?: string
          images?: string[] | null
          interior_price?: number | null
          is_active?: boolean | null
          is_customizable?: boolean | null
          is_featured?: boolean | null
          length?: number
          main_image?: string | null
          mechanical_price?: number | null
          plan_id?: string
          rooms_included?: string[] | null
          sales_count?: number | null
          short_desc?: string | null
          slug?: string
          structural_price?: number | null
          style?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
          width?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          file_type: string
          house_plan_id: string | null
          id: string
          include_architectural: boolean | null
          include_boq: boolean | null
          include_electrical: boolean | null
          include_mechanical: boolean | null
          include_structural: boolean | null
          order_id: string
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          file_type?: string
          house_plan_id?: string | null
          id?: string
          include_architectural?: boolean | null
          include_boq?: boolean | null
          include_electrical?: boolean | null
          include_mechanical?: boolean | null
          include_structural?: boolean | null
          order_id: string
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          file_type?: string
          house_plan_id?: string | null
          id?: string
          include_architectural?: boolean | null
          include_boq?: boolean | null
          include_electrical?: boolean | null
          include_mechanical?: boolean | null
          include_structural?: boolean | null
          order_id?: string
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_house_plan_id_fkey"
            columns: ["house_plan_id"]
            isOneToOne: false
            referencedRelation: "house_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          order_number: string
          paid_at: string | null
          payment_method: string | null
          payment_status: string
          pesapal_order_id: string | null
          status: string
          subtotal: number
          tax: number | null
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          order_number: string
          paid_at?: string | null
          payment_method?: string | null
          payment_status?: string
          pesapal_order_id?: string | null
          status?: string
          subtotal: number
          tax?: number | null
          total: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          order_number?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_status?: string
          pesapal_order_id?: string | null
          status?: string
          subtotal?: number
          tax?: number | null
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
