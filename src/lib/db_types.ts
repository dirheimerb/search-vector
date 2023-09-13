export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  auth: {
    Tables: {
      audit_log_entries: {
        Row: {
          created_at: string | null;
          id: string;
          instance_id: string | null;
          ip_address: string;
          payload: Json | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          instance_id?: string | null;
          ip_address?: string;
          payload?: Json | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          instance_id?: string | null;
          ip_address?: string;
          payload?: Json | null;
        };
        Relationships: [];
      };
      flow_state: {
        Row: {
          auth_code: string;
          authentication_method: string;
          code_challenge: string;
          code_challenge_method: Database["auth"]["Enums"]["code_challenge_method"];
          created_at: string | null;
          id: string;
          provider_access_token: string | null;
          provider_refresh_token: string | null;
          provider_type: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          auth_code: string;
          authentication_method: string;
          code_challenge: string;
          code_challenge_method: Database["auth"]["Enums"]["code_challenge_method"];
          created_at?: string | null;
          id: string;
          provider_access_token?: string | null;
          provider_refresh_token?: string | null;
          provider_type: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          auth_code?: string;
          authentication_method?: string;
          code_challenge?: string;
          code_challenge_method?: Database["auth"]["Enums"]["code_challenge_method"];
          created_at?: string | null;
          id?: string;
          provider_access_token?: string | null;
          provider_refresh_token?: string | null;
          provider_type?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      identities: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: string;
          identity_data: Json;
          last_sign_in_at: string | null;
          provider: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id: string;
          identity_data: Json;
          last_sign_in_at?: string | null;
          provider: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          identity_data?: Json;
          last_sign_in_at?: string | null;
          provider?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "identities_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      instances: {
        Row: {
          created_at: string | null;
          id: string;
          raw_base_config: string | null;
          updated_at: string | null;
          uuid: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          raw_base_config?: string | null;
          updated_at?: string | null;
          uuid?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          raw_base_config?: string | null;
          updated_at?: string | null;
          uuid?: string | null;
        };
        Relationships: [];
      };
      mfa_amr_claims: {
        Row: {
          authentication_method: string;
          created_at: string;
          id: string;
          session_id: string;
          updated_at: string;
        };
        Insert: {
          authentication_method: string;
          created_at: string;
          id: string;
          session_id: string;
          updated_at: string;
        };
        Update: {
          authentication_method?: string;
          created_at?: string;
          id?: string;
          session_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mfa_amr_claims_session_id_fkey";
            columns: ["session_id"];
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      mfa_challenges: {
        Row: {
          created_at: string;
          factor_id: string;
          id: string;
          ip_address: unknown;
          verified_at: string | null;
        };
        Insert: {
          created_at: string;
          factor_id: string;
          id: string;
          ip_address: unknown;
          verified_at?: string | null;
        };
        Update: {
          created_at?: string;
          factor_id?: string;
          id?: string;
          ip_address?: unknown;
          verified_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "mfa_challenges_auth_factor_id_fkey";
            columns: ["factor_id"];
            referencedRelation: "mfa_factors";
            referencedColumns: ["id"];
          },
        ];
      };
      mfa_factors: {
        Row: {
          created_at: string;
          factor_type: Database["auth"]["Enums"]["factor_type"];
          friendly_name: string | null;
          id: string;
          secret: string | null;
          status: Database["auth"]["Enums"]["factor_status"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at: string;
          factor_type: Database["auth"]["Enums"]["factor_type"];
          friendly_name?: string | null;
          id: string;
          secret?: string | null;
          status: Database["auth"]["Enums"]["factor_status"];
          updated_at: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          factor_type?: Database["auth"]["Enums"]["factor_type"];
          friendly_name?: string | null;
          id?: string;
          secret?: string | null;
          status?: Database["auth"]["Enums"]["factor_status"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mfa_factors_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      refresh_tokens: {
        Row: {
          created_at: string | null;
          id: number;
          instance_id: string | null;
          parent: string | null;
          revoked: boolean | null;
          session_id: string | null;
          token: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          instance_id?: string | null;
          parent?: string | null;
          revoked?: boolean | null;
          session_id?: string | null;
          token?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          instance_id?: string | null;
          parent?: string | null;
          revoked?: boolean | null;
          session_id?: string | null;
          token?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "refresh_tokens_session_id_fkey";
            columns: ["session_id"];
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      saml_providers: {
        Row: {
          attribute_mapping: Json | null;
          created_at: string | null;
          entity_id: string;
          id: string;
          metadata_url: string | null;
          metadata_xml: string;
          sso_provider_id: string;
          updated_at: string | null;
        };
        Insert: {
          attribute_mapping?: Json | null;
          created_at?: string | null;
          entity_id: string;
          id: string;
          metadata_url?: string | null;
          metadata_xml: string;
          sso_provider_id: string;
          updated_at?: string | null;
        };
        Update: {
          attribute_mapping?: Json | null;
          created_at?: string | null;
          entity_id?: string;
          id?: string;
          metadata_url?: string | null;
          metadata_xml?: string;
          sso_provider_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "saml_providers_sso_provider_id_fkey";
            columns: ["sso_provider_id"];
            referencedRelation: "sso_providers";
            referencedColumns: ["id"];
          },
        ];
      };
      saml_relay_states: {
        Row: {
          created_at: string | null;
          for_email: string | null;
          from_ip_address: unknown | null;
          id: string;
          redirect_to: string | null;
          request_id: string;
          sso_provider_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          for_email?: string | null;
          from_ip_address?: unknown | null;
          id: string;
          redirect_to?: string | null;
          request_id: string;
          sso_provider_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          for_email?: string | null;
          from_ip_address?: unknown | null;
          id?: string;
          redirect_to?: string | null;
          request_id?: string;
          sso_provider_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "saml_relay_states_sso_provider_id_fkey";
            columns: ["sso_provider_id"];
            referencedRelation: "sso_providers";
            referencedColumns: ["id"];
          },
        ];
      };
      schema_migrations: {
        Row: {
          version: string;
        };
        Insert: {
          version: string;
        };
        Update: {
          version?: string;
        };
        Relationships: [];
      };
      sessions: {
        Row: {
          aal: Database["auth"]["Enums"]["aal_level"] | null;
          created_at: string | null;
          factor_id: string | null;
          id: string;
          not_after: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          aal?: Database["auth"]["Enums"]["aal_level"] | null;
          created_at?: string | null;
          factor_id?: string | null;
          id: string;
          not_after?: string | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          aal?: Database["auth"]["Enums"]["aal_level"] | null;
          created_at?: string | null;
          factor_id?: string | null;
          id?: string;
          not_after?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      sso_domains: {
        Row: {
          created_at: string | null;
          domain: string;
          id: string;
          sso_provider_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          domain: string;
          id: string;
          sso_provider_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          domain?: string;
          id?: string;
          sso_provider_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sso_domains_sso_provider_id_fkey";
            columns: ["sso_provider_id"];
            referencedRelation: "sso_providers";
            referencedColumns: ["id"];
          },
        ];
      };
      sso_providers: {
        Row: {
          created_at: string | null;
          id: string;
          resource_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          resource_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          resource_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          aud: string | null;
          banned_until: string | null;
          confirmation_sent_at: string | null;
          confirmation_token: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          deleted_at: string | null;
          email: string | null;
          email_change: string | null;
          email_change_confirm_status: number | null;
          email_change_sent_at: string | null;
          email_change_token_current: string | null;
          email_change_token_new: string | null;
          email_confirmed_at: string | null;
          encrypted_password: string | null;
          id: string;
          instance_id: string | null;
          invited_at: string | null;
          is_sso_user: boolean;
          is_super_admin: boolean | null;
          last_sign_in_at: string | null;
          phone: string | null;
          phone_change: string | null;
          phone_change_sent_at: string | null;
          phone_change_token: string | null;
          phone_confirmed_at: string | null;
          raw_app_meta_data: Json | null;
          raw_user_meta_data: Json | null;
          reauthentication_sent_at: string | null;
          reauthentication_token: string | null;
          recovery_sent_at: string | null;
          recovery_token: string | null;
          role: string | null;
          updated_at: string | null;
        };
        Insert: {
          aud?: string | null;
          banned_until?: string | null;
          confirmation_sent_at?: string | null;
          confirmation_token?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          email_change?: string | null;
          email_change_confirm_status?: number | null;
          email_change_sent_at?: string | null;
          email_change_token_current?: string | null;
          email_change_token_new?: string | null;
          email_confirmed_at?: string | null;
          encrypted_password?: string | null;
          id: string;
          instance_id?: string | null;
          invited_at?: string | null;
          is_sso_user?: boolean;
          is_super_admin?: boolean | null;
          last_sign_in_at?: string | null;
          phone?: string | null;
          phone_change?: string | null;
          phone_change_sent_at?: string | null;
          phone_change_token?: string | null;
          phone_confirmed_at?: string | null;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          reauthentication_sent_at?: string | null;
          reauthentication_token?: string | null;
          recovery_sent_at?: string | null;
          recovery_token?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Update: {
          aud?: string | null;
          banned_until?: string | null;
          confirmation_sent_at?: string | null;
          confirmation_token?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          email_change?: string | null;
          email_change_confirm_status?: number | null;
          email_change_sent_at?: string | null;
          email_change_token_current?: string | null;
          email_change_token_new?: string | null;
          email_confirmed_at?: string | null;
          encrypted_password?: string | null;
          id?: string;
          instance_id?: string | null;
          invited_at?: string | null;
          is_sso_user?: boolean;
          is_super_admin?: boolean | null;
          last_sign_in_at?: string | null;
          phone?: string | null;
          phone_change?: string | null;
          phone_change_sent_at?: string | null;
          phone_change_token?: string | null;
          phone_confirmed_at?: string | null;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          reauthentication_sent_at?: string | null;
          reauthentication_token?: string | null;
          recovery_sent_at?: string | null;
          recovery_token?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      email: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      jwt: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      aal_level: "aal1" | "aal2" | "aal3";
      code_challenge_method: "s256" | "plain";
      factor_status: "unverified" | "verified";
      factor_type: "totp" | "webauthn";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      ai_interaction: {
        Row: {
          chat_message: string | null;
          chat_response: string | null;
          conversation: string[] | null;
          conversation_id: string | null;
          created_at: string;
          id: string;
          keyword_id: string | null;
          keyword_message: string | null;
          keyword_response: string | null;
          user_id: string | null;
        };
        Insert: {
          chat_message?: string | null;
          chat_response?: string | null;
          conversation?: string[] | null;
          conversation_id?: string | null;
          created_at?: string;
          id?: string;
          keyword_id?: string | null;
          keyword_message?: string | null;
          keyword_response?: string | null;
          user_id?: string | null;
        };
        Update: {
          chat_message?: string | null;
          chat_response?: string | null;
          conversation?: string[] | null;
          conversation_id?: string | null;
          created_at?: string;
          id?: string;
          keyword_id?: string | null;
          keyword_message?: string | null;
          keyword_response?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ai_interaction_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      category: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string;
          post_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name: string;
          post_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
          post_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "category_post_id_fkey";
            columns: ["post_id"];
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
        ];
      };
      city: {
        Row: {
          city: string;
          created_at: string;
          id: string;
          user_id: string | null;
        };
        Insert: {
          city: string;
          created_at?: string;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          city?: string;
          created_at?: string;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "city_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      contact: {
        Row: {
          city: string | null;
          country: string | null;
          created_at: string;
          email: string | null;
          first_name: string;
          id: string;
          last_name: string | null;
          notes: string | null;
          phone_number: string;
          phone_type: string | null;
          postal_code: string | null;
          state: string | null;
          street: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          city?: string | null;
          country?: string | null;
          created_at?: string;
          email?: string | null;
          first_name: string;
          id?: string;
          last_name?: string | null;
          notes?: string | null;
          phone_number: string;
          phone_type?: string | null;
          postal_code?: string | null;
          state?: string | null;
          street?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          city?: string | null;
          country?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string | null;
          notes?: string | null;
          phone_number?: string;
          phone_type?: string | null;
          postal_code?: string | null;
          state?: string | null;
          street?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "contact_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      countries: {
        Row: {
          abbr: string;
          created_at: string;
          id: number;
          name: string;
          updated_at: string;
        };
        Insert: {
          abbr: string;
          created_at?: string;
          id?: number;
          name: string;
          updated_at?: string;
        };
        Update: {
          abbr?: string;
          created_at?: string;
          id?: number;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      daily_tasks: {
        Row: {
          color: string | null;
          created_at: string;
          id: number;
          is_completed: boolean;
          title: string;
          user_id: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          id?: number;
          is_completed?: boolean;
          title: string;
          user_id: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          id?: number;
          is_completed?: boolean;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "daily_tasks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      embeddings: {
        Row: {
          content: string;
          created_at: string;
          embedding: string | null;
          heading: string;
          id: number;
          slug: string | null;
          token: number;
          user_id: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          embedding?: string | null;
          heading: string;
          id?: number;
          slug?: string | null;
          token: number;
          user_id?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          embedding?: string | null;
          heading?: string;
          id?: number;
          slug?: string | null;
          token?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "embeddings_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          all_day: boolean;
          created_at: string;
          description: string | null;
          end_date: string;
          end_time: string;
          id: string;
          location: string | null;
          start_date: string;
          start_time: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          all_day?: boolean;
          created_at?: string;
          description?: string | null;
          end_date: string;
          end_time: string;
          id?: string;
          location?: string | null;
          start_date: string;
          start_time: string;
          title: string;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          all_day?: boolean;
          created_at?: string;
          description?: string | null;
          end_date?: string;
          end_time?: string;
          id?: string;
          location?: string | null;
          start_date?: string;
          start_time?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      folders: {
        Row: {
          created_at: string;
          folder_name: string;
          id: string;
          owner_id: string;
          parent_id: string | null;
        };
        Insert: {
          created_at?: string;
          folder_name: string;
          id?: string;
          owner_id?: string;
          parent_id?: string | null;
        };
        Update: {
          created_at?: string;
          folder_name?: string;
          id?: string;
          owner_id?: string;
          parent_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "folders_owner_id_fkey";
            columns: ["owner_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "folders_parent_id_fkey";
            columns: ["parent_id"];
            referencedRelation: "folders";
            referencedColumns: ["id"];
          },
        ];
      };
      goal: {
        Row: {
          completed: boolean;
          created_at: string;
          id: string;
          name: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          completed?: boolean;
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          completed?: boolean;
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "goal_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      goal_category: {
        Row: {
          created_at: string;
          goal_id: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          goal_id?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          goal_id?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "goal_category_goal_id_fkey";
            columns: ["goal_id"];
            referencedRelation: "goal";
            referencedColumns: ["id"];
          },
        ];
      };
      goal_comments: {
        Row: {
          created_at: string | null;
          goal_id: string | null;
          id: number;
          note: string | null;
        };
        Insert: {
          created_at?: string | null;
          goal_id?: string | null;
          id?: number;
          note?: string | null;
        };
        Update: {
          created_at?: string | null;
          goal_id?: string | null;
          id?: number;
          note?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "goal_comments_goal_id_fkey";
            columns: ["goal_id"];
            referencedRelation: "goal";
            referencedColumns: ["id"];
          },
        ];
      };
      goal_settings: {
        Row: {
          created_at: string;
          id: number;
          notifications: boolean;
          show_completed: boolean;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          notifications?: boolean;
          show_completed?: boolean;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          notifications?: boolean;
          show_completed?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "goal_settings_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      goal_task: {
        Row: {
          created_at: string;
          goal_id: string;
          id: number;
          is_completed: boolean;
          name: string;
        };
        Insert: {
          created_at?: string;
          goal_id: string;
          id?: number;
          is_completed?: boolean;
          name: string;
        };
        Update: {
          created_at?: string;
          goal_id?: string;
          id?: number;
          is_completed?: boolean;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "goal_task_goal_id_fkey";
            columns: ["goal_id"];
            referencedRelation: "goal";
            referencedColumns: ["id"];
          },
        ];
      };
      images: {
        Row: {
          bucket_name: string | null;
          created_at: string;
          id: number;
          user_id: string | null;
        };
        Insert: {
          bucket_name?: string | null;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          bucket_name?: string | null;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "images_bucket_name_fkey";
            columns: ["bucket_name"];
            referencedRelation: "buckets";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "images_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      locations: {
        Row: {
          country: string | null;
          created_at: string;
          id: string;
          lat: number | null;
          lon: number | null;
          name: string | null;
          region: string | null;
          updated_at: string;
          url: string | null;
        };
        Insert: {
          country?: string | null;
          created_at?: string;
          id?: string;
          lat?: number | null;
          lon?: number | null;
          name?: string | null;
          region?: string | null;
          updated_at?: string;
          url?: string | null;
        };
        Update: {
          country?: string | null;
          created_at?: string;
          id?: string;
          lat?: number | null;
          lon?: number | null;
          name?: string | null;
          region?: string | null;
          updated_at?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      newsletter: {
        Row: {
          created_at: string;
          email: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
        };
        Relationships: [];
      };
      nods_page: {
        Row: {
          checksum: string | null;
          id: number;
          meta: Json | null;
          parent_page_id: number | null;
          path: string;
          source: string | null;
          type: string | null;
        };
        Insert: {
          checksum?: string | null;
          id?: number;
          meta?: Json | null;
          parent_page_id?: number | null;
          path: string;
          source?: string | null;
          type?: string | null;
        };
        Update: {
          checksum?: string | null;
          id?: number;
          meta?: Json | null;
          parent_page_id?: number | null;
          path?: string;
          source?: string | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "nods_page_parent_page_id_fkey";
            columns: ["parent_page_id"];
            referencedRelation: "nods_page";
            referencedColumns: ["id"];
          },
        ];
      };
      nods_page_section: {
        Row: {
          content: string | null;
          embedding: string | null;
          heading: string | null;
          id: number;
          page_id: number;
          slug: string | null;
          token_count: number | null;
        };
        Insert: {
          content?: string | null;
          embedding?: string | null;
          heading?: string | null;
          id?: number;
          page_id: number;
          slug?: string | null;
          token_count?: number | null;
        };
        Update: {
          content?: string | null;
          embedding?: string | null;
          heading?: string | null;
          id?: number;
          page_id?: number;
          slug?: string | null;
          token_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "nods_page_section_page_id_fkey";
            columns: ["page_id"];
            referencedRelation: "nods_page";
            referencedColumns: ["id"];
          },
        ];
      };
      note_document: {
        Row: {
          category: string | null;
          content: string | null;
          created_at: string;
          id: number;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category?: string | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          title: string;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          category?: string | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "note_document_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      notes: {
        Row: {
          content: string;
          created_at: string;
          display_public: boolean;
          id: string;
          owner_id: string;
          tags: string[] | null;
          title: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          display_public?: boolean;
          id?: string;
          owner_id?: string;
          tags?: string[] | null;
          title: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          display_public?: boolean;
          id?: string;
          owner_id?: string;
          tags?: string[] | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notes_owner_id_fkey";
            columns: ["owner_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          account: boolean;
          created_at: string;
          id: string;
          tasks: boolean;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          account?: boolean;
          created_at?: string;
          id?: string;
          tasks?: boolean;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          account?: boolean;
          created_at?: string;
          id?: string;
          tasks?: boolean;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      photos: {
        Row: {
          created_at: string;
          height: number;
          id: string;
          name: string | null;
          public: boolean;
          src: string | null;
          updated_at: string | null;
          url: string | null;
          user_id: string | null;
          width: number;
        };
        Insert: {
          created_at?: string;
          height?: number;
          id?: string;
          name?: string | null;
          public?: boolean;
          src?: string | null;
          updated_at?: string | null;
          url?: string | null;
          user_id?: string | null;
          width?: number;
        };
        Update: {
          created_at?: string;
          height?: number;
          id?: string;
          name?: string | null;
          public?: boolean;
          src?: string | null;
          updated_at?: string | null;
          url?: string | null;
          user_id?: string | null;
          width?: number;
        };
        Relationships: [
          {
            foreignKeyName: "photos_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      post: {
        Row: {
          author_id: string;
          content: string;
          created_at: string;
          html: string | null;
          id: number;
          is_published: boolean;
          markdown: Json | null;
          published_date: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          author_id?: string;
          content: string;
          created_at?: string;
          html?: string | null;
          id?: number;
          is_published?: boolean;
          markdown?: Json | null;
          published_date?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string;
          content?: string;
          created_at?: string;
          html?: string | null;
          id?: number;
          is_published?: boolean;
          markdown?: Json | null;
          published_date?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_author_id_fkey";
            columns: ["author_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          about: string | null;
          avatar_url: string | null;
          city: string | null;
          comments: boolean;
          country: string | null;
          cover_photo: string | null;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          mobile: string;
          postal_code: string | null;
          state: string | null;
          street: string | null;
          updated_at: string | null;
          user_id: string;
          username: string;
        };
        Insert: {
          about?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          comments?: boolean;
          country?: string | null;
          cover_photo?: string | null;
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          mobile: string;
          postal_code?: string | null;
          state?: string | null;
          street?: string | null;
          updated_at?: string | null;
          user_id?: string;
          username: string;
        };
        Update: {
          about?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          comments?: boolean;
          country?: string | null;
          cover_photo?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          mobile?: string;
          postal_code?: string | null;
          state?: string | null;
          street?: string | null;
          updated_at?: string | null;
          user_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      project: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      states: {
        Row: {
          created_at: string;
          id: string;
          state_abbv: string;
          state_name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          state_abbv: string;
          state_name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          state_abbv?: string;
          state_name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      stylist_appointments: {
        Row: {
          client_id: string;
          created_at: string;
          date: string;
          duration: unknown;
          id: number;
          notes: string | null;
          service_id: string;
          stylist_id: string;
          time: string;
          updated_at: string | null;
        };
        Insert: {
          client_id?: string;
          created_at?: string;
          date: string;
          duration: unknown;
          id?: number;
          notes?: string | null;
          service_id: string;
          stylist_id: string;
          time: string;
          updated_at?: string | null;
        };
        Update: {
          client_id?: string;
          created_at?: string;
          date?: string;
          duration?: unknown;
          id?: number;
          notes?: string | null;
          service_id?: string;
          stylist_id?: string;
          time?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "stylist_appointments_client_id_fkey";
            columns: ["client_id"];
            referencedRelation: "stylist_clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stylist_appointments_service_id_fkey";
            columns: ["service_id"];
            referencedRelation: "stylist_services";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stylist_appointments_stylist_id_fkey";
            columns: ["stylist_id"];
            referencedRelation: "stylists";
            referencedColumns: ["id"];
          },
        ];
      };
      stylist_availability: {
        Row: {
          created_at: string;
          date: string;
          end_time: string;
          id: string;
          start_time: string;
          stylist_id: string;
        };
        Insert: {
          created_at?: string;
          date: string;
          end_time: string;
          id?: string;
          start_time: string;
          stylist_id?: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          end_time?: string;
          id?: string;
          start_time?: string;
          stylist_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stylist_availability_stylist_id_fkey";
            columns: ["stylist_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      stylist_clients: {
        Row: {
          city: string | null;
          country: string;
          created_at: string;
          email: string | null;
          first_name: string;
          id: string;
          last_name: string;
          notes: string | null;
          phone: string;
          postal_code: string | null;
          state: string | null;
          street: string | null;
          stylist_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          city?: string | null;
          country?: string;
          created_at?: string;
          email?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          notes?: string | null;
          phone: string;
          postal_code?: string | null;
          state?: string | null;
          street?: string | null;
          stylist_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          city?: string | null;
          country?: string;
          created_at?: string;
          email?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          notes?: string | null;
          phone?: string;
          postal_code?: string | null;
          state?: string | null;
          street?: string | null;
          stylist_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "stylist_clients_stylist_id_fkey";
            columns: ["stylist_id"];
            referencedRelation: "stylists";
            referencedColumns: ["id"];
          },
        ];
      };
      stylist_recurring_availability: {
        Row: {
          day_of_week: number;
          end_time: string;
          id: string;
          start_time: string;
          stylist_id: string;
        };
        Insert: {
          day_of_week: number;
          end_time: string;
          id?: string;
          start_time: string;
          stylist_id: string;
        };
        Update: {
          day_of_week?: number;
          end_time?: string;
          id?: string;
          start_time?: string;
          stylist_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stylist_recurring_availability_stylist_id_fkey";
            columns: ["stylist_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      stylist_schedule: {
        Row: {
          created_at: string;
          date: string;
          day_name: string;
          end_time: string;
          id: string;
          start_time: string;
          stylist_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          day_name: string;
          end_time: string;
          id?: string;
          start_time: string;
          stylist_id?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          day_name?: string;
          end_time?: string;
          id?: string;
          start_time?: string;
          stylist_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "stylist_schedule_stylist_id_fkey";
            columns: ["stylist_id"];
            referencedRelation: "stylists";
            referencedColumns: ["id"];
          },
        ];
      };
      stylist_services: {
        Row: {
          created_at: string;
          id: string;
          service_duration: unknown;
          service_name: string;
          service_price: number;
          stylist_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          service_duration: unknown;
          service_name: string;
          service_price: number;
          stylist_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          service_duration?: unknown;
          service_name?: string;
          service_price?: number;
          stylist_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "stylist_services_stylist_id_fkey";
            columns: ["stylist_id"];
            referencedRelation: "stylists";
            referencedColumns: ["id"];
          },
        ];
      };
      stylist_temporary_adjustments: {
        Row: {
          date: string;
          end_time: string | null;
          id: string;
          is_available: boolean | null;
          start_time: string | null;
          stylist_id: string;
        };
        Insert: {
          date: string;
          end_time?: string | null;
          id?: string;
          is_available?: boolean | null;
          start_time?: string | null;
          stylist_id: string;
        };
        Update: {
          date?: string;
          end_time?: string | null;
          id?: string;
          is_available?: boolean | null;
          start_time?: string | null;
          stylist_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stylist_temporary_adjustments_stylist_id_fkey";
            columns: ["stylist_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      stylist_weekly_schedule: {
        Row: {
          created_at: string;
          day_name: Database["public"]["Enums"]["days"];
          id: string;
          stylist_id: string;
          times: string[];
        };
        Insert: {
          created_at?: string;
          day_name: Database["public"]["Enums"]["days"];
          id?: string;
          stylist_id: string;
          times?: string[];
        };
        Update: {
          created_at?: string;
          day_name?: Database["public"]["Enums"]["days"];
          id?: string;
          stylist_id?: string;
          times?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "stylist_weekly_schedule_stylist_id_fkey";
            columns: ["stylist_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      stylists: {
        Row: {
          city: string;
          country: string | null;
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone: string;
          postal_code: string;
          services_provided: string;
          specialties: string | null;
          state: string;
          street: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          city: string;
          country?: string | null;
          created_at?: string;
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          phone: string;
          postal_code: string;
          services_provided?: string;
          specialties?: string | null;
          state: string;
          street: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          city?: string;
          country?: string | null;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          phone?: string;
          postal_code?: string;
          services_provided?: string;
          specialties?: string | null;
          state?: string;
          street?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stylists_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stylists_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tag: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          post_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          post_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "tag_post_id_fkey";
            columns: ["post_id"];
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          calculation: number;
          category_id: number | null;
          completed: boolean;
          created_at: string;
          date_completed: string | null;
          description: string | null;
          difficulty: number;
          due_date: string;
          id: number;
          priority: string;
          priority_score: number;
          project_id: string | null;
          send_email: boolean | null;
          status: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          calculation: number;
          category_id?: number | null;
          completed?: boolean;
          created_at?: string;
          date_completed?: string | null;
          description?: string | null;
          difficulty?: number;
          due_date: string;
          id?: number;
          priority: string;
          priority_score?: number;
          project_id?: string | null;
          send_email?: boolean | null;
          status: string;
          title: string;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          calculation?: number;
          category_id?: number | null;
          completed?: boolean;
          created_at?: string;
          date_completed?: string | null;
          description?: string | null;
          difficulty?: number;
          due_date?: string;
          id?: number;
          priority?: string;
          priority_score?: number;
          project_id?: string | null;
          send_email?: boolean | null;
          status?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "project";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      trip: {
        Row: {
          created_at: string;
          date: string;
          end_time: string;
          id: string;
          in_progress: boolean;
          instructor: string;
          start_time: string;
          total_time: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          date: string;
          end_time: string;
          id?: string;
          in_progress?: boolean;
          instructor: string;
          start_time: string;
          total_time?: string | null;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          end_time?: string;
          id?: string;
          in_progress?: boolean;
          instructor?: string;
          start_time?: string;
          total_time?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trip_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      weather: {
        Row: {
          created_at: string;
          detailedForecast: string | null;
          endTime: string | null;
          icon: string | null;
          id: string;
          isDaytime: boolean | null;
          lat: number | null;
          lon: number | null;
          name: string | null;
          number: number | null;
          postal_code: string | null;
          probabilityOfPrecipitation: Json | null;
          shortForecast: string | null;
          startTime: string | null;
          temperature: number | null;
          temperatureTrend: string | null;
          temperatureUnit: string | null;
          updated_at: string;
          windDirection: string | null;
          windSpeed: string | null;
        };
        Insert: {
          created_at?: string;
          detailedForecast?: string | null;
          endTime?: string | null;
          icon?: string | null;
          id?: string;
          isDaytime?: boolean | null;
          lat?: number | null;
          lon?: number | null;
          name?: string | null;
          number?: number | null;
          postal_code?: string | null;
          probabilityOfPrecipitation?: Json | null;
          shortForecast?: string | null;
          startTime?: string | null;
          temperature?: number | null;
          temperatureTrend?: string | null;
          temperatureUnit?: string | null;
          updated_at?: string;
          windDirection?: string | null;
          windSpeed?: string | null;
        };
        Update: {
          created_at?: string;
          detailedForecast?: string | null;
          endTime?: string | null;
          icon?: string | null;
          id?: string;
          isDaytime?: boolean | null;
          lat?: number | null;
          lon?: number | null;
          name?: string | null;
          number?: number | null;
          postal_code?: string | null;
          probabilityOfPrecipitation?: Json | null;
          shortForecast?: string | null;
          startTime?: string | null;
          temperature?: number | null;
          temperatureTrend?: string | null;
          temperatureUnit?: string | null;
          updated_at?: string;
          windDirection?: string | null;
          windSpeed?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string;
        };
        Returns: Record<string, unknown>;
      };
      delete_storage_object: {
        Args: {
          bucket: string;
          object: string;
        };
        Returns: Record<string, unknown>;
      };
      get_page_parents: {
        Args: {
          page_id: number;
        };
        Returns: {
          id: number;
          parent_page_id: number;
          path: string;
          meta: Json;
        }[];
      };
      match_documents: {
        Args: {
          query_embedding: string;
          match_count?: number;
          filter?: Json;
        };
        Returns: {
          id: number;
          content: string;
          metadata: Json;
          similarity: number;
        }[];
      };
      match_page_sections: {
        Args: {
          embedding: string;
          match_threshold: number;
          match_count: number;
          min_content_length: number;
        };
        Returns: {
          id: number;
          page_id: number;
          slug: string;
          heading: string;
          content: string;
          similarity: number;
        }[];
      };
    };
    Enums: {
      app_permission: "channels.delete" | "messages.delete";
      app_role: "admin" | "moderator";
      days:
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
        | "Sunday";
      user_status: "ONLINE" | "OFFLINE";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "objects_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
