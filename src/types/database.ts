export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          url: string;
          description: string | null;
          category: string;
          docs_url: string | null;
          price_amount: number | null;
          price_token: string | null;
          price_chain: string | null;
          logo_url: string | null;
          owner_wallet: string | null;
          verified: boolean;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          url: string;
          description?: string | null;
          category: string;
          docs_url?: string | null;
          price_amount?: number | null;
          price_token?: string | null;
          price_chain?: string | null;
          logo_url?: string | null;
          owner_wallet?: string | null;
          verified?: boolean;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          url?: string;
          description?: string | null;
          category?: string;
          docs_url?: string | null;
          price_amount?: number | null;
          price_token?: string | null;
          price_chain?: string | null;
          logo_url?: string | null;
          owner_wallet?: string | null;
          verified?: boolean;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      health_checks: {
        Row: {
          id: string;
          service_id: string;
          status: string;
          response_time_ms: number | null;
          status_code: number | null;
          error_message: string | null;
          checked_at: string;
        };
        Insert: {
          id?: string;
          service_id: string;
          status: string;
          response_time_ms?: number | null;
          status_code?: number | null;
          error_message?: string | null;
          checked_at?: string;
        };
        Update: {
          id?: string;
          service_id?: string;
          status?: string;
          response_time_ms?: number | null;
          status_code?: number | null;
          error_message?: string | null;
          checked_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "health_checks_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          }
        ];
      };
      service_stats: {
        Row: {
          id: string;
          service_id: string;
          date: string;
          uptime_pct: number | null;
          avg_response_ms: number | null;
          total_checks: number | null;
        };
        Insert: {
          id?: string;
          service_id: string;
          date: string;
          uptime_pct?: number | null;
          avg_response_ms?: number | null;
          total_checks?: number | null;
        };
        Update: {
          id?: string;
          service_id?: string;
          date?: string;
          uptime_pct?: number | null;
          avg_response_ms?: number | null;
          total_checks?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "service_stats_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Insertable<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type Updatable<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
