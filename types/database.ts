export interface Database {
  public: {
    Tables: {
      frustrations: {
        Row: {
          id: string;
          created_at: string;
          user_id: string | null;
          description: string;
          solution: string;
          likes: number;
          shares: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id?: string | null;
          description: string;
          solution: string;
          likes?: number;
          shares?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string | null;
          description?: string;
          solution?: string;
          likes?: number;
          shares?: number;
        };
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          badge_id?: string;
          created_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon_url: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon_url: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon_url?: string;
        };
      };
    };
  };
} 