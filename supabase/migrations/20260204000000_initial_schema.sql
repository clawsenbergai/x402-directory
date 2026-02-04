-- Initial schema for x402.directory
-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  docs_url TEXT,

  -- Pricing (parsed from 402)
  price_amount DECIMAL,
  price_token TEXT,
  price_chain TEXT,

  -- Metadata
  logo_url TEXT,
  owner_wallet TEXT,
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Health checks table
CREATE TABLE health_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  status TEXT NOT NULL, -- 'healthy', 'degraded', 'down'
  response_time_ms INTEGER,
  status_code INTEGER,
  error_message TEXT,
  checked_at TIMESTAMPTZ DEFAULT now()
);

-- Daily aggregates
CREATE TABLE service_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  uptime_pct DECIMAL,
  avg_response_ms INTEGER,
  total_checks INTEGER,
  UNIQUE(service_id, date)
);

-- Indexes for common queries
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_featured ON services(featured) WHERE featured = true;
CREATE INDEX idx_services_verified ON services(verified) WHERE verified = true;
CREATE INDEX idx_health_checks_service_id ON health_checks(service_id);
CREATE INDEX idx_health_checks_checked_at ON health_checks(checked_at);
CREATE INDEX idx_service_stats_service_id ON service_stats(service_id);
CREATE INDEX idx_service_stats_date ON service_stats(date);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for services updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_stats ENABLE ROW LEVEL SECURITY;

-- Public read access for services
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (true);

-- Public read access for health checks
CREATE POLICY "Health checks are viewable by everyone"
  ON health_checks FOR SELECT
  USING (true);

-- Public read access for service stats
CREATE POLICY "Service stats are viewable by everyone"
  ON service_stats FOR SELECT
  USING (true);
