
-- Create page_views table for tracking visitor behavior
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page TEXT NOT NULL,
  section TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (visitors aren't logged in)
CREATE POLICY "Anyone can insert page views"
ON public.page_views FOR INSERT
WITH CHECK (true);

-- No public select - only via service role or admin  
CREATE POLICY "No public select on page views"
ON public.page_views FOR SELECT
USING (false);

-- Create indexes for analytics queries
CREATE INDEX idx_page_views_created_at ON public.page_views (created_at);
CREATE INDEX idx_page_views_session_page ON public.page_views (session_id, page);
CREATE INDEX idx_page_views_section ON public.page_views (section);
