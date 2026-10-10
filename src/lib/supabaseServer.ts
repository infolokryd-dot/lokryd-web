import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Database record type for contact_enquiries table.
 */
export interface ContactEnquiryRow {
  id?: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  status?: string;
  created_at?: string;
}

let cachedServerClient: SupabaseClient | null = null;

/**
 * Returns a server-side Supabase client using the service-role key.
 *
 * SECURITY:
 * This client runs only on the server to bypass RLS and perform verified operations.
 * Never expose the SUPABASE_SERVICE_ROLE_KEY or use this in client components.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !secretKey) {
    return null;
  }

  if (cachedServerClient) {
    return cachedServerClient;
  }

  cachedServerClient = createClient(supabaseUrl, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedServerClient;
}
