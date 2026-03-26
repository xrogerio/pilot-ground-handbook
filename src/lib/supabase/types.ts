// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      aircraft: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          image_url: string | null
          language: string | null
          model: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          language?: string | null
          model?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          language?: string | null
          model?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'aircraft_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      enrollments: {
        Row: {
          aircraft_id: string
          completed_sections: string[] | null
          created_at: string | null
          id: string
          progress_percentage: number | null
          student_id: string
        }
        Insert: {
          aircraft_id: string
          completed_sections?: string[] | null
          created_at?: string | null
          id?: string
          progress_percentage?: number | null
          student_id: string
        }
        Update: {
          aircraft_id?: string
          completed_sections?: string[] | null
          created_at?: string | null
          id?: string
          progress_percentage?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'enrollments_aircraft_id_fkey'
            columns: ['aircraft_id']
            isOneToOne: false
            referencedRelation: 'aircraft'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollments_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      graphs: {
        Row: {
          created_at: string | null
          graph_data: Json
          graph_type: string
          id: string
          order_index: number | null
          section_id: string
          subsection_id: string | null
        }
        Insert: {
          created_at?: string | null
          graph_data: Json
          graph_type: string
          id?: string
          order_index?: number | null
          section_id: string
          subsection_id?: string | null
        }
        Update: {
          created_at?: string | null
          graph_data?: Json
          graph_type?: string
          id?: string
          order_index?: number | null
          section_id?: string
          subsection_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'graphs_section_id_fkey'
            columns: ['section_id']
            isOneToOne: false
            referencedRelation: 'sections'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'graphs_subsection_id_fkey'
            columns: ['subsection_id']
            isOneToOne: false
            referencedRelation: 'subsections'
            referencedColumns: ['id']
          },
        ]
      }
      images: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          order_index: number | null
          section_id: string
          subsection_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          order_index?: number | null
          section_id: string
          subsection_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          order_index?: number | null
          section_id?: string
          subsection_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'images_section_id_fkey'
            columns: ['section_id']
            isOneToOne: false
            referencedRelation: 'sections'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'images_subsection_id_fkey'
            columns: ['subsection_id']
            isOneToOne: false
            referencedRelation: 'subsections'
            referencedColumns: ['id']
          },
        ]
      }
      pdfs: {
        Row: {
          aircraft_id: string
          created_at: string | null
          id: string
          pdf_title: string
          pdf_url: string
        }
        Insert: {
          aircraft_id: string
          created_at?: string | null
          id?: string
          pdf_title: string
          pdf_url: string
        }
        Update: {
          aircraft_id?: string
          created_at?: string | null
          id?: string
          pdf_title?: string
          pdf_url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'pdfs_aircraft_id_fkey'
            columns: ['aircraft_id']
            isOneToOne: false
            referencedRelation: 'aircraft'
            referencedColumns: ['id']
          },
        ]
      }
      quiz_results: {
        Row: {
          aircraft_id: string
          created_at: string | null
          difficulty: string
          id: string
          passed: boolean
          score: number
          student_id: string
        }
        Insert: {
          aircraft_id: string
          created_at?: string | null
          difficulty: string
          id?: string
          passed: boolean
          score: number
          student_id: string
        }
        Update: {
          aircraft_id?: string
          created_at?: string | null
          difficulty?: string
          id?: string
          passed?: boolean
          score?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_results_aircraft_id_fkey'
            columns: ['aircraft_id']
            isOneToOne: false
            referencedRelation: 'aircraft'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quiz_results_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      sections: {
        Row: {
          aircraft_id: string
          content: string | null
          created_at: string | null
          id: string
          section_number: number
          section_title: string
        }
        Insert: {
          aircraft_id: string
          content?: string | null
          created_at?: string | null
          id?: string
          section_number: number
          section_title: string
        }
        Update: {
          aircraft_id?: string
          content?: string | null
          created_at?: string | null
          id?: string
          section_number?: number
          section_title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sections_aircraft_id_fkey'
            columns: ['aircraft_id']
            isOneToOne: false
            referencedRelation: 'aircraft'
            referencedColumns: ['id']
          },
        ]
      }
      subsections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          order_index: number | null
          section_id: string
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          order_index?: number | null
          section_id: string
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          order_index?: number | null
          section_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'subsections_section_id_fkey'
            columns: ['section_id']
            isOneToOne: false
            referencedRelation: 'sections'
            referencedColumns: ['id']
          },
        ]
      }
      tables: {
        Row: {
          created_at: string | null
          id: string
          order_index: number | null
          section_id: string
          subsection_id: string | null
          table_data: Json
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_index?: number | null
          section_id: string
          subsection_id?: string | null
          table_data: Json
        }
        Update: {
          created_at?: string | null
          id?: string
          order_index?: number | null
          section_id?: string
          subsection_id?: string | null
          table_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: 'tables_section_id_fkey'
            columns: ['section_id']
            isOneToOne: false
            referencedRelation: 'sections'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tables_subsection_id_fkey'
            columns: ['subsection_id']
            isOneToOne: false
            referencedRelation: 'subsections'
            referencedColumns: ['id']
          },
        ]
      }
      texts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          order_index: number | null
          section_id: string
          subsection_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          order_index?: number | null
          section_id: string
          subsection_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          order_index?: number | null
          section_id?: string
          subsection_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'texts_section_id_fkey'
            columns: ['section_id']
            isOneToOne: false
            referencedRelation: 'sections'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'texts_subsection_id_fkey'
            columns: ['subsection_id']
            isOneToOne: false
            referencedRelation: 'subsections'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: aircraft
//   id: text (not null, default: (nextval('aircraft_short_id_seq'::regclass))::text)
//   name: text (not null)
//   model: text (nullable)
//   image_url: text (nullable)
//   language: text (nullable, default: 'pt-BR'::text)
//   created_by: uuid (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: enrollments
//   id: uuid (not null, default: gen_random_uuid())
//   student_id: uuid (not null)
//   aircraft_id: text (not null)
//   progress_percentage: integer (nullable, default: 0)
//   created_at: timestamp with time zone (nullable, default: now())
//   completed_sections: _text (nullable, default: '{}'::text[])
// Table: graphs
//   id: uuid (not null, default: gen_random_uuid())
//   section_id: uuid (not null)
//   graph_type: text (not null)
//   graph_data: jsonb (not null)
//   created_at: timestamp with time zone (nullable, default: now())
//   subsection_id: uuid (nullable)
//   order_index: integer (nullable, default: 0)
// Table: images
//   id: uuid (not null, default: gen_random_uuid())
//   section_id: uuid (not null)
//   image_url: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
//   subsection_id: uuid (nullable)
//   order_index: integer (nullable, default: 0)
// Table: pdfs
//   id: uuid (not null, default: gen_random_uuid())
//   aircraft_id: text (not null)
//   pdf_url: text (not null)
//   pdf_title: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: quiz_results
//   id: uuid (not null, default: gen_random_uuid())
//   student_id: uuid (not null)
//   aircraft_id: text (not null)
//   score: integer (not null)
//   passed: boolean (not null)
//   difficulty: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: sections
//   id: uuid (not null, default: gen_random_uuid())
//   aircraft_id: text (not null)
//   section_number: integer (not null)
//   section_title: text (not null)
//   content: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: subsections
//   id: uuid (not null, default: gen_random_uuid())
//   section_id: uuid (not null)
//   title: text (nullable)
//   description: text (nullable)
//   order_index: integer (nullable, default: 0)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: tables
//   id: uuid (not null, default: gen_random_uuid())
//   section_id: uuid (not null)
//   table_data: jsonb (not null)
//   created_at: timestamp with time zone (nullable, default: now())
//   subsection_id: uuid (nullable)
//   order_index: integer (nullable, default: 0)
// Table: texts
//   id: uuid (not null, default: gen_random_uuid())
//   section_id: uuid (not null)
//   subsection_id: uuid (nullable)
//   content: text (not null)
//   order_index: integer (nullable, default: 0)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: users
//   id: uuid (not null)
//   email: text (not null)
//   role: text (nullable, default: 'student'::text)
//   created_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: aircraft
//   FOREIGN KEY aircraft_created_by_fkey: FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
//   CHECK aircraft_language_check: CHECK ((language = ANY (ARRAY['pt-BR'::text, 'en-US'::text])))
//   PRIMARY KEY aircraft_pkey: PRIMARY KEY (id)
// Table: enrollments
//   FOREIGN KEY enrollments_aircraft_id_fkey: FOREIGN KEY (aircraft_id) REFERENCES aircraft(id) ON DELETE CASCADE
//   PRIMARY KEY enrollments_pkey: PRIMARY KEY (id)
//   UNIQUE enrollments_student_id_aircraft_id_key: UNIQUE (student_id, aircraft_id)
//   FOREIGN KEY enrollments_student_id_fkey: FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
// Table: graphs
//   PRIMARY KEY graphs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY graphs_section_id_fkey: FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
//   FOREIGN KEY graphs_subsection_id_fkey: FOREIGN KEY (subsection_id) REFERENCES subsections(id) ON DELETE CASCADE
// Table: images
//   PRIMARY KEY images_pkey: PRIMARY KEY (id)
//   FOREIGN KEY images_section_id_fkey: FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
//   FOREIGN KEY images_subsection_id_fkey: FOREIGN KEY (subsection_id) REFERENCES subsections(id) ON DELETE CASCADE
// Table: pdfs
//   FOREIGN KEY pdfs_aircraft_id_fkey: FOREIGN KEY (aircraft_id) REFERENCES aircraft(id) ON DELETE CASCADE
//   PRIMARY KEY pdfs_pkey: PRIMARY KEY (id)
// Table: quiz_results
//   FOREIGN KEY quiz_results_aircraft_id_fkey: FOREIGN KEY (aircraft_id) REFERENCES aircraft(id) ON DELETE CASCADE
//   CHECK quiz_results_difficulty_check: CHECK ((difficulty = ANY (ARRAY['easy'::text, 'medium'::text, 'hard'::text])))
//   PRIMARY KEY quiz_results_pkey: PRIMARY KEY (id)
//   FOREIGN KEY quiz_results_student_id_fkey: FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
// Table: sections
//   FOREIGN KEY sections_aircraft_id_fkey: FOREIGN KEY (aircraft_id) REFERENCES aircraft(id) ON DELETE CASCADE
//   PRIMARY KEY sections_pkey: PRIMARY KEY (id)
// Table: subsections
//   PRIMARY KEY subsections_pkey: PRIMARY KEY (id)
//   FOREIGN KEY subsections_section_id_fkey: FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
// Table: tables
//   PRIMARY KEY tables_pkey: PRIMARY KEY (id)
//   FOREIGN KEY tables_section_id_fkey: FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
//   FOREIGN KEY tables_subsection_id_fkey: FOREIGN KEY (subsection_id) REFERENCES subsections(id) ON DELETE CASCADE
// Table: texts
//   PRIMARY KEY texts_pkey: PRIMARY KEY (id)
//   FOREIGN KEY texts_section_id_fkey: FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
//   FOREIGN KEY texts_subsection_id_fkey: FOREIGN KEY (subsection_id) REFERENCES subsections(id) ON DELETE CASCADE
// Table: users
//   FOREIGN KEY users_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY users_pkey: PRIMARY KEY (id)
//   CHECK users_role_check: CHECK ((role = ANY (ARRAY['admin'::text, 'student'::text])))

// --- ROW LEVEL SECURITY POLICIES ---
// Table: aircraft
//   Policy "Admins can manage aircraft" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))
//   Policy "Authenticated users can read aircraft" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: enrollments
//   Policy "Admins can manage enrollments" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))
//   Policy "Users can read their own enrollments or admins all" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((student_id = auth.uid()) OR (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text)))))
// Table: graphs
//   Policy "Admins can manage graphs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))
//   Policy "Authenticated users can read graphs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: images
//   Policy "Admins can manage images" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))
//   Policy "Authenticated users can read images" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: pdfs
//   Policy "Admins can manage pdfs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))
//   Policy "Authenticated users can read pdfs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: quiz_results
//   Policy "Users can insert their own quiz results" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (student_id = auth.uid())
//   Policy "Users can read their own quiz results" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((student_id = auth.uid()) OR (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text)))))
// Table: sections
//   Policy "Admins can manage sections" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))
//   Policy "Authenticated users can read sections" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: subsections
//   Policy "Admins can manage subsections" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))
//   Policy "Authenticated users can read subsections" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: tables
//   Policy "Admins can manage tables" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))
//   Policy "Authenticated users can read tables" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: texts
//   Policy "Admins can manage texts" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM users   WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))
//   Policy "Authenticated users can read texts" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: users
//   Policy "Users can read all users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Users can update their own data" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = id)

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.users (id, email, role)
//     VALUES (NEW.id, NEW.email, 'student');
//     RETURN NEW;
//   END;
//   $function$
//

// --- INDEXES ---
// Table: enrollments
//   CREATE UNIQUE INDEX enrollments_student_id_aircraft_id_key ON public.enrollments USING btree (student_id, aircraft_id)
