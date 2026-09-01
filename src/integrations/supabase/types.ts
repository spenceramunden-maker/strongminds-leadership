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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      call_requests: {
        Row: {
          consent: boolean
          created_at: string
          details: Json
          division: string | null
          email: string
          follow_up_date: string | null
          follow_up_owner: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          program_or_service: string | null
          referral_source: string | null
          source_form: string
          status: string
          updated_at: string
        }
        Insert: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email?: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          consent: boolean
          created_at: string
          details: Json
          division: string | null
          email: string
          follow_up_date: string | null
          follow_up_owner: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          program_or_service: string | null
          referral_source: string | null
          source_form: string
          status: string
          updated_at: string
        }
        Insert: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email?: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      family_event_registrations: {
        Row: {
          consent: boolean
          created_at: string
          details: Json
          division: string | null
          email: string
          follow_up_date: string | null
          follow_up_owner: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          program_or_service: string | null
          referral_source: string | null
          source_form: string
          status: string
          updated_at: string
        }
        Insert: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email?: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      general_interests: {
        Row: {
          consent: boolean
          created_at: string
          details: Json
          division: string | null
          email: string
          follow_up_date: string | null
          follow_up_owner: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          program_or_service: string | null
          referral_source: string | null
          source_form: string
          status: string
          updated_at: string
        }
        Insert: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email?: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      information_session_registrations: {
        Row: {
          consent: boolean
          created_at: string
          details: Json
          division: string | null
          email: string
          follow_up_date: string | null
          follow_up_owner: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          program_or_service: string | null
          referral_source: string | null
          source_form: string
          status: string
          updated_at: string
        }
        Insert: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email?: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      mentor_interests: {
        Row: {
          consent: boolean
          created_at: string
          details: Json
          division: string | null
          email: string
          follow_up_date: string | null
          follow_up_owner: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          program_or_service: string | null
          referral_source: string | null
          source_form: string
          status: string
          updated_at: string
        }
        Insert: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email?: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      organization_partnerships: {
        Row: {
          consent: boolean
          created_at: string
          details: Json
          division: string | null
          email: string
          follow_up_date: string | null
          follow_up_owner: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          program_or_service: string | null
          referral_source: string | null
          source_form: string
          status: string
          updated_at: string
        }
        Insert: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email?: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      public_events: {
        Row: {
          attendance: string
          audience: string
          capacity: string | null
          category: string
          cost: string
          created_at: string
          description: string
          division: string
          event_date: string
          event_time: string
          featured_image: string | null
          format: string
          id: string
          location: string
          registration_deadline: string | null
          registration_link: string | null
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          attendance?: string
          audience?: string
          capacity?: string | null
          category: string
          cost?: string
          created_at?: string
          description?: string
          division: string
          event_date?: string
          event_time?: string
          featured_image?: string | null
          format?: string
          id?: string
          location?: string
          registration_deadline?: string | null
          registration_link?: string | null
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          attendance?: string
          audience?: string
          capacity?: string | null
          category?: string
          cost?: string
          created_at?: string
          description?: string
          division?: string
          event_date?: string
          event_time?: string
          featured_image?: string | null
          format?: string
          id?: string
          location?: string
          registration_deadline?: string | null
          registration_link?: string | null
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
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
      workshop_registrations: {
        Row: {
          consent: boolean
          created_at: string
          details: Json
          division: string | null
          email: string
          follow_up_date: string | null
          follow_up_owner: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          program_or_service: string | null
          referral_source: string | null
          source_form: string
          status: string
          updated_at: string
        }
        Insert: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email?: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      youth_program_interests: {
        Row: {
          consent: boolean
          created_at: string
          details: Json
          division: string | null
          email: string
          follow_up_date: string | null
          follow_up_owner: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          program_or_service: string | null
          referral_source: string | null
          source_form: string
          status: string
          updated_at: string
        }
        Insert: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
        }
        Update: {
          consent?: boolean
          created_at?: string
          details?: Json
          division?: string | null
          email?: string
          follow_up_date?: string | null
          follow_up_owner?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          program_or_service?: string | null
          referral_source?: string | null
          source_form?: string
          status?: string
          updated_at?: string
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
      is_valid_lead_submission: {
        Args: {
          _consent: boolean
          _details: Json
          _email: string
          _expected_source: string
          _follow_up_date: string
          _follow_up_owner: string
          _name: string
          _notes: string
          _phone: string
          _source_form: string
          _status: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
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
      app_role: ["admin"],
    },
  },
} as const
