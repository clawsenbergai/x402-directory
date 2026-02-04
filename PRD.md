# x402.directory — Product Requirements Document

**Version:** 1.0
**Date:** 2026-02-04
**Owner:** Clawsenberg + Ferdi

---

## 1. Vision

**x402.directory** is the trusted discovery platform for x402-enabled APIs. Unlike simple listings, we provide real-time health monitoring, pricing intelligence, and trust signals — making it easy for agents and developers to find reliable paid services.

**Tagline:** "Find. Trust. Pay. Use."

---

## 2. Problem Statement

**Current state:**
- x402index.com exists but has limited entries and no quality signals
- Developers can't easily discover which APIs support x402
- No uptime monitoring, pricing comparison, or reviews
- Agents waste money on unreliable services

**Our solution:**
- Comprehensive directory with health monitoring
- Real pricing scraper (cost per call)
- Trust signals (uptime %, response time, reviews)
- SDK snippets for instant integration

---

## 3. Target Users

1. **AI Agent Developers** — Need reliable x402 services for their agents
2. **Agent Operators** — Want to monitor costs and find alternatives
3. **API Providers** — Want visibility and traffic for their x402 services

---

## 4. Core Features (MVP)

### 4.1 Service Directory
- List of all x402-enabled services
- Categories: AI, Data, Finance, Gaming, Tools, Other
- Search + filters (price, chain, category, uptime)
- Service detail pages

### 4.2 Health Monitoring
- Ping every 5-15 minutes
- Track: uptime %, avg response time, last checked
- Status badges: 🟢 Healthy, 🟡 Degraded, 🔴 Down
- Historical uptime graph (7/30 days)

### 4.3 Pricing Intelligence
- Parse 402 response for pricing info
- Display: price per call, accepted tokens, chains
- Price history tracking
- "Cheapest in category" badges

### 4.4 Trust Signals
- Uptime score (last 30 days)
- Response time average
- "Verified" badge (manual review)
- Future: user reviews, dispute rate

### 4.5 Developer Tools
- cURL example for each service
- SDK snippets (TypeScript, Python)
- "Test this API" button (dry run)
- Postman collection export

### 4.6 Service Submission
- "Add your service" form
- Required: URL, description, category, docs link
- Verification: must return valid 402 response
- Manual moderation queue

---

## 5. Technical Architecture

### 5.1 Stack
```
Frontend: Next.js 14 + Tailwind + shadcn/ui
Backend: Next.js API routes
Database: Supabase (Postgres)
Monitoring: Vercel Cron + custom pinger
Hosting: Vercel
Payments: x402 (dogfooding) + Stripe fallback
```

### 5.2 Database Schema

```sql
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
  service_id UUID REFERENCES services(id),
  status TEXT NOT NULL, -- 'healthy', 'degraded', 'down'
  response_time_ms INTEGER,
  status_code INTEGER,
  error_message TEXT,
  checked_at TIMESTAMPTZ DEFAULT now()
);

-- Daily aggregates
CREATE TABLE service_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id),
  date DATE NOT NULL,
  uptime_pct DECIMAL,
  avg_response_ms INTEGER,
  total_checks INTEGER,
  UNIQUE(service_id, date)
);
```

### 5.3 Monitoring Flow
```
1. Cron job runs every 5 min
2. For each service:
   a. GET request to URL
   b. Expect 402 response
   c. Parse payment-required header
   d. Record: status, response_time, pricing
3. Aggregate stats daily
4. Alert on status changes (future)
```

---

## 6. Pages

### 6.1 Homepage (/)
- Hero: "Discover x402-Enabled APIs"
- Search bar
- Featured services (3-6)
- Category grid
- Stats: X services, Y total uptime checks

### 6.2 Browse (/browse)
- Filter sidebar: category, price range, chain, uptime
- Service cards grid
- Sort: popularity, price, uptime, newest

### 6.3 Service Detail (/service/[slug])
- Service info: name, description, pricing
- Health status + uptime graph
- SDK snippets (tabs: cURL, TypeScript, Python)
- "Test API" button
- Related services

### 6.4 Submit (/submit)
- Form: URL, name, description, category, docs
- Auto-validation: ping URL, check 402 response
- Terms acceptance
- Success → pending review

### 6.5 Admin (/admin) [Protected]
- Moderation queue
- Edit services
- Feature/verify toggles
- Health check logs

---

## 7. Monetization

| Revenue Stream | Price | Notes |
|----------------|-------|-------|
| Featured Listing | $25/mo | Top placement + badge |
| Verified Badge | $50 one-time | Manual review |
| API Access | $9/mo | Bulk data, webhooks |
| Sponsorship | Custom | Category sponsors |

**Phase 1 (MVP):** Featured listings only, manual billing
**Phase 2:** Stripe subscriptions
**Phase 3:** x402 payments for everything

---

## 8. MVP Milestones

### Week 1: Foundation
- [ ] Project setup (Next.js, Supabase, Vercel)
- [ ] Database schema + migrations
- [ ] Seed data from x402index.com API
- [ ] Basic service listing page

### Week 2: Health Monitoring
- [ ] Pinger service (Vercel Cron)
- [ ] Health check recording
- [ ] Status badges on listings
- [ ] Uptime graphs

### Week 3: Polish + Launch
- [ ] Service detail pages
- [ ] SDK snippets
- [ ] Submit form + moderation
- [ ] Featured listings
- [ ] Launch on HN + Twitter

---

## 9. Success Metrics

| Metric | Target (30 days) |
|--------|------------------|
| Services listed | 50+ |
| Daily visitors | 500+ |
| Featured listings sold | 3+ |
| Uptime checks/day | 10,000+ |

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Services block our pinger | Rotate IPs, respect rate limits |
| Low initial listings | Seed from x402index, outreach |
| Copied by x402index | Move fast, add trust features |
| Fake submissions | Manual moderation, verification fee |

---

## 11. Future Features (Post-MVP)

- User reviews + ratings
- Price alerts ("notify when < $X")
- API comparison tool
- "Cheapest alternative" suggestions
- Dispute tracking integration
- LiveBuild integration ("used in X sessions")
- Moltscape marketplace sync

---

## 12. Open Questions

1. Should we charge for submissions? (prevents spam but reduces listings)
2. How aggressive should pinging be? (5 min vs 15 min)
3. Partner with x402index or compete?
