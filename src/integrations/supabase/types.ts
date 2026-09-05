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
      board_posts: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          author_display_name: string
          author_id: string
          body: string
          created_at: string
          id: string
          moderation_note: string | null
          status: string
          title: string
          topic: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          author_display_name: string
          author_id: string
          body: string
          created_at?: string
          id?: string
          moderation_note?: string | null
          status?: string
          title: string
          topic?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          author_display_name?: string
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          moderation_note?: string | null
          status?: string
          title?: string
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      board_replies: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          author_display_name: string
          author_id: string
          body: string
          created_at: string
          id: string
          moderation_note: string | null
          post_id: string
          status: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          author_display_name: string
          author_id: string
          body: string
          created_at?: string
          id?: string
          moderation_note?: string | null
          post_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          author_display_name?: string
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          moderation_note?: string | null
          post_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "board_posts"
            referencedColumns: ["id"]
          },
        ]
      }
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
      emergency_contacts: {
        Row: {
          created_at: string
          email: string | null
          family_id: string
          id: string
          is_authorized_pickup: boolean
          name: string
          phone: string
          relationship: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          family_id: string
          id?: string
          is_authorized_pickup?: boolean
          name: string
          phone: string
          relationship: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          family_id?: string
          id?: string
          is_authorized_pickup?: boolean
          name?: string
          phone?: string
          relationship?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      families: {
        Row: {
          city: string | null
          created_at: string
          enrolled_at: string | null
          family_name: string
          first_participation_date: string | null
          handbook_due_at: string | null
          id: string
          mailing_address: string | null
          owner_id: string
          payment_due_at: string | null
          poc_email: string
          poc_name: string
          postal_code: string | null
          program: string | null
          staff_notes: string | null
          state: string | null
          status: string
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          enrolled_at?: string | null
          family_name?: string
          first_participation_date?: string | null
          handbook_due_at?: string | null
          id?: string
          mailing_address?: string | null
          owner_id: string
          payment_due_at?: string | null
          poc_email?: string
          poc_name?: string
          postal_code?: string | null
          program?: string | null
          staff_notes?: string | null
          state?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          enrolled_at?: string | null
          family_name?: string
          first_participation_date?: string | null
          handbook_due_at?: string | null
          id?: string
          mailing_address?: string | null
          owner_id?: string
          payment_due_at?: string | null
          poc_email?: string
          poc_name?: string
          postal_code?: string | null
          program?: string | null
          staff_notes?: string | null
          state?: string | null
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
      handbook_signatures: {
        Row: {
          agreed: boolean
          created_at: string
          family_id: string
          handbook_version_id: string
          id: string
          relationship: string | null
          signed_at: string
          signed_by: string
          signed_name: string
        }
        Insert: {
          agreed?: boolean
          created_at?: string
          family_id: string
          handbook_version_id: string
          id?: string
          relationship?: string | null
          signed_at?: string
          signed_by: string
          signed_name: string
        }
        Update: {
          agreed?: boolean
          created_at?: string
          family_id?: string
          handbook_version_id?: string
          id?: string
          relationship?: string | null
          signed_at?: string
          signed_by?: string
          signed_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "handbook_signatures_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "handbook_signatures_handbook_version_id_fkey"
            columns: ["handbook_version_id"]
            isOneToOne: false
            referencedRelation: "handbook_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      handbook_versions: {
        Row: {
          body: string | null
          created_at: string
          external_url: string | null
          id: string
          is_current: boolean
          published_at: string
          storage_path: string | null
          summary: string | null
          updated_at: string
          version_label: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          external_url?: string | null
          id?: string
          is_current?: boolean
          published_at?: string
          storage_path?: string | null
          summary?: string | null
          updated_at?: string
          version_label: string
        }
        Update: {
          body?: string | null
          created_at?: string
          external_url?: string | null
          id?: string
          is_current?: boolean
          published_at?: string
          storage_path?: string | null
          summary?: string | null
          updated_at?: string
          version_label?: string
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
      message_threads: {
        Row: {
          created_at: string
          family_id: string
          id: string
          last_message_at: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          family_id: string
          id?: string
          last_message_at?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          family_id?: string
          id?: string
          last_message_at?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_threads_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          created_at: string
          id: string
          read_by_parent: boolean
          read_by_staff: boolean
          sender_id: string
          sender_role: string
          thread_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          read_by_parent?: boolean
          read_by_staff?: boolean
          sender_id: string
          sender_role?: string
          thread_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          read_by_parent?: boolean
          read_by_staff?: boolean
          sender_id?: string
          sender_role?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "message_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          due_at: string | null
          family_id: string
          id: string
          label: string
          sort_order: number
          status: string
          task_key: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_at?: string | null
          family_id: string
          id?: string
          label: string
          sort_order?: number
          status?: string
          task_key: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_at?: string | null
          family_id?: string
          id?: string
          label?: string
          sort_order?: number
          status?: string
          task_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_tasks_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
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
      orientation_registrations: {
        Row: {
          attendees: number
          created_at: string
          family_id: string
          id: string
          mode: string
          note: string | null
          session_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          attendees?: number
          created_at?: string
          family_id: string
          id?: string
          mode?: string
          note?: string | null
          session_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          attendees?: number
          created_at?: string
          family_id?: string
          id?: string
          mode?: string
          note?: string | null
          session_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orientation_registrations_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orientation_registrations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "orientation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      orientation_resources: {
        Row: {
          created_at: string
          description: string | null
          external_url: string | null
          id: string
          is_active: boolean
          is_required: boolean
          kind: string
          sort_order: number
          storage_path: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          is_active?: boolean
          is_required?: boolean
          kind?: string
          sort_order?: number
          storage_path?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          is_active?: boolean
          is_required?: boolean
          kind?: string
          sort_order?: number
          storage_path?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      orientation_sessions: {
        Row: {
          capacity: number | null
          created_at: string
          duration_minutes: number
          format: string
          id: string
          is_published: boolean
          location_or_link: string | null
          notes: string | null
          starts_at: string
          title: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          duration_minutes?: number
          format?: string
          id?: string
          is_published?: boolean
          location_or_link?: string | null
          notes?: string | null
          starts_at: string
          title: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          duration_minutes?: number
          format?: string
          id?: string
          is_published?: boolean
          location_or_link?: string | null
          notes?: string | null
          starts_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      post_reports: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          reason: string
          reply_id: string | null
          reporter_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          reason: string
          reply_id?: string | null
          reporter_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          reason?: string
          reply_id?: string | null
          reporter_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "board_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_reports_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "board_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          email: string
          full_name: string
          id: string
          phone: string | null
          preferred_contact: string | null
          sms_opt_in: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string
          email?: string
          full_name?: string
          id: string
          phone?: string | null
          preferred_contact?: string | null
          sms_opt_in?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          preferred_contact?: string | null
          sms_opt_in?: boolean
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
      resource_completions: {
        Row: {
          completed_at: string
          created_at: string
          family_id: string
          id: string
          resource_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          family_id: string
          id?: string
          resource_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          family_id?: string
          id?: string
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_completions_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_completions_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "orientation_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          allergies: string | null
          created_at: string
          date_of_birth: string | null
          family_id: string
          first_name: string
          grade: string | null
          id: string
          last_name: string
          photo_release: boolean
          program: string | null
          school: string | null
          shirt_size: string | null
          support_needs: string | null
          updated_at: string
        }
        Insert: {
          allergies?: string | null
          created_at?: string
          date_of_birth?: string | null
          family_id: string
          first_name: string
          grade?: string | null
          id?: string
          last_name: string
          photo_release?: boolean
          program?: string | null
          school?: string | null
          shirt_size?: string | null
          support_needs?: string | null
          updated_at?: string
        }
        Update: {
          allergies?: string | null
          created_at?: string
          date_of_birth?: string | null
          family_id?: string
          first_name?: string
          grade?: string | null
          id?: string
          last_name?: string
          photo_release?: boolean
          program?: string | null
          school?: string | null
          shirt_size?: string | null
          support_needs?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
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
      videos: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          external_url: string | null
          id: string
          is_active: boolean
          kind: string
          slot: string
          storage_path: string | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          external_url?: string | null
          id?: string
          is_active?: boolean
          kind: string
          slot: string
          storage_path?: string | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          external_url?: string | null
          id?: string
          is_active?: boolean
          kind?: string
          slot?: string
          storage_path?: string | null
          title?: string
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
      is_smla_staff: { Args: { _user_id: string }; Returns: boolean }
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
      app_role: "admin" | "staff"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "staff"],
    },
  },
} as const
