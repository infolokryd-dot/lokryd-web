-- Migration: 20261009000000_create_contact_enquiries.sql
-- Description: Create contact_enquiries table with Row Level Security (RLS) enabled.

-- 1. Create contact_enquiries table
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

  -- Sensible field length constraints
  CONSTRAINT check_name_length CHECK (char_length(name) >= 2 AND char_length(name) <= 150),
  CONSTRAINT check_email_length CHECK (char_length(email) >= 5 AND char_length(email) <= 255),
  CONSTRAINT check_message_length CHECK (char_length(message) >= 5 AND char_length(message) <= 5000),
  CONSTRAINT check_phone_length CHECK (phone IS NULL OR char_length(phone) <= 50),
  CONSTRAINT check_company_length CHECK (company IS NULL OR char_length(company) <= 200),
  CONSTRAINT check_service_length CHECK (service IS NULL OR char_length(service) <= 150)
);

-- 2. Add documentation comments
COMMENT ON TABLE public.contact_enquiries IS 'Stores customer and corporate contact inquiries submitted via the LOKRYD website.';
COMMENT ON COLUMN public.contact_enquiries.id IS 'Unique identifier for the enquiry.';
COMMENT ON COLUMN public.contact_enquiries.name IS 'Full name of the contact person.';
COMMENT ON COLUMN public.contact_enquiries.company IS 'Organization or company name (optional).';
COMMENT ON COLUMN public.contact_enquiries.email IS 'Email address of the sender.';
COMMENT ON COLUMN public.contact_enquiries.phone IS 'Contact phone number (optional).';
COMMENT ON COLUMN public.contact_enquiries.service IS 'Selected service of interest (optional).';
COMMENT ON COLUMN public.contact_enquiries.message IS 'Enquiry or message body.';
COMMENT ON COLUMN public.contact_enquiries.status IS 'Status lifecycle: new, contacted, in_progress, closed, archived.';
COMMENT ON COLUMN public.contact_enquiries.created_at IS 'Timestamp when the enquiry was submitted.';

-- 3. Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON public.contact_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON public.contact_enquiries (status);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_email ON public.contact_enquiries (email);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

-- 5. Row Level Security policies
-- By default in Postgres/Supabase, enabling RLS with no permissive policies for 'anon' or 'authenticated'
-- blocks all public read, write, update, and delete access.
-- Server-side operations using the SUPABASE_SECRET_KEY (service role) automatically bypass RLS.
-- We explicitly revoke public permissions on this table to prevent direct anon interaction.
REVOKE ALL ON TABLE public.contact_enquiries FROM anon, authenticated;
