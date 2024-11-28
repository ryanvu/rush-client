export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      businesses: {
        Row: {
          address: string | null
          auth_id: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          auth_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          auth_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      claims: {
        Row: {
          claimed_at: string | null
          created_at: string | null
          customer_id: string
          id: string
          promotion_id: string
          redeemed_at: string | null
          redemption_code: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          claimed_at?: string | null
          created_at?: string | null
          customer_id: string
          id?: string
          promotion_id: string
          redeemed_at?: string | null
          redemption_code?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          claimed_at?: string | null
          created_at?: string | null
          customer_id?: string
          id?: string
          promotion_id?: string
          redeemed_at?: string | null
          redemption_code?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      onboarding_progress: {
        Row: {
          created_at: string | null
          current_step: number | null
          is_complete: boolean | null
          steps: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_step?: number | null
          is_complete?: boolean | null
          steps?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_step?: number | null
          is_complete?: boolean | null
          steps?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          business_id: string
          created_at: string | null
          current_claims: number | null
          description: string | null
          end_date: string
          id: string
          max_claims: number | null
          start_date: string
          status: string | null
          terms_conditions: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          current_claims?: number | null
          description?: string | null
          end_date: string
          id?: string
          max_claims?: number | null
          start_date: string
          status?: string | null
          terms_conditions?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          current_claims?: number | null
          description?: string | null
          end_date?: string
          id?: string
          max_claims?: number | null
          start_date?: string
          status?: string | null
          terms_conditions?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promotions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          first_name: string | null
          last_name: string | null
          preferences: Json | null
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          preferences?: Json | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          preferences?: Json | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      clean_test_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_claim: {
        Args: {
          p_promotion_id: string
          p_customer_email: string
        }
        Returns: Json
      }
      reset_demo_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
