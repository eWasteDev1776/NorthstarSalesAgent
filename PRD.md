# Product Requirements Document (PRD)
**Project Name:** Northstar – AI Lead Generation & Sales Agent

---

## 1. Objective

Northstar is an AI-powered lead generation and outreach agent that autonomously finds and researches leads, generates custom cold messaging, and learns from results to improve over time. The goal is to build an agentic system that intelligently personalizes itself to each user’s business, helping them grow by automating the top of the sales funnel.

---

## 2. Features (MVP)

### 2.0 Agent Setup & Personalization

#### 2.0.1 Onboarding Conversation
- Guided setup questions:
  - Business name
  - Products/services offered
  - Target customer or industry
  - Location focus (optional)

#### 2.0.2 Context Memory
- Agent stores this info to:
  - Tailor lead searches and messaging
  - Generate strategic recommendations
  - Establish agent identity and tone

#### 2.0.3 Branding Input
- Option to upload logo during setup (or later via Profile page)

#### 2.0.4 UI Personalization
- App reflects user branding:
  - Company name in UI
  - Logo display
  - Agent identity shown as "[Agent Name], sales assistant at [Company]"

---

### 2.1 Natural Language Input for Lead Search

- Users describe what they're looking for in plain English.
  - Example: “Find boutique gyms in Nashville that offer small classes.”
- GPT-4 interprets:
  - Lead type (brick & mortar or SaaS)
  - Keywords and categories
  - Location and radius
  - Best scraping source (ScraperAPI or PhantomBuster)

---

### 2.2 Lead Collection (Scraping)

#### 2.2.1 Brick & Mortar Leads
- Source: ScraperAPI
- Data collected:
  - Name, website, phone, address, category

#### 2.2.2 Online/SaaS Leads
- Source: PhantomBuster (LinkedIn Search Export)
- Data collected:
  - Person name, title, company, website, profile, location

---

### 2.3 Lead Enrichment & Research

- GPT-4 visits websites or parses summaries
- Outputs:
  - Business description
  - Extracted emails or contact info
  - Relevance score (1–5)
  - Category tags

---

### 2.4 Cold Outreach Generation

- GPT-4 generates outreach based on:
  - User’s company info
  - Lead's business profile
  - Inferred pain points
- Self-Selling Mode:
  - Agent writes messages pitching itself:
    > "Hi [Name], I’m Northstar, an AI sales agent helping businesses like yours..."

---

### 2.5 Agent UI

**Navigation**
- `Find Leads`
- `Lead Queue`
- `Agent Log`
- `Profile`
- `Strategy Center`
- `Settings`

**Workspace Components**
- Natural language input form
- Terminal-style agent activity feed
- Lead table with tags and message preview
- Email draft viewer with editing
- Lead confidence score indicators

**Agent Info Panel**
- Identity line: "Northstar, sales agent for [Your Company]"
- Stats: Leads generated, open rate, replies, best messages

---

### 2.6 Export & Lead Management

- Export options:
  - CSV
  - Filtered/tagged lists
- Lead statuses:
  - Contacted, Responded, Needs follow-up

---

### 2.7 Strategy & Insight Center

**Purpose:**
Collaborate with the agent to improve future searches and messages.

**Features:**
- **Memory Timeline** – past lead activity, campaigns, outcomes
- **Insights Panel** – AI-generated summaries:
  > "Short intros led to a 22% higher reply rate"
- **Conversational Agent Panel** – ask strategy questions:
  > "What should I improve next week?"
- **Actionable Suggestions** – A/B test ideas, tone tweaks, audience shifts

---

### 2.8 Additional Enhancements

#### 2.8.1 Lead Tagging & Bucketing
- Agent auto-tags leads (e.g., high-value, cold)
- Manual tag editing allowed

#### 2.8.2 Lead Prioritization Scoring
- Confidence score (0–100) shown visually
- Based on business match, contact info, and quality

#### 2.8.3 Campaign Grouping
- Leads grouped into custom campaigns
- Track results and outreach variants

#### 2.8.4 Cold Message Template Library
- Save and reuse winning drafts
- Agent can learn from and suggest high-performing formats

#### 2.8.5 System Activity Feed
- Real-time feed of system activity:
  - “12 leads fetched”
  - “Message drafted”

#### 2.8.6 Feedback System
- Users can thumbs-up/thumbs-down messages or leads
- Agent adjusts its tone, approach, and prioritization

#### 2.8.7 Multi-Agent Architecture
- Internal modular agents:
  - Lead Discovery Agent
  - Research Agent
  - Messaging Agent
  - Strategy Agent
- Unified front-end persona: one cohesive assistant experience

---

### 2.9 Cross-Source Lead Enrichment

**Purpose:**
Merge insights from multiple sources for stronger profiles.

**Behavior:**
- GMaps-sourced lead → enrich with LinkedIn profile
- LinkedIn-sourced company → crawl website + verify industry
- Agent builds one unified lead object with:
  - `origin_source`
  - `enrichment_sources`
  - Aggregated context

---

### 2.10 Memory Architecture & Cost Strategy

**Purpose:**
Maintain personalization and relevance while controlling LLM token usage and API cost.

**Memory Layers:**
- **Short-Term (Prompt-Level):**
  - Live session data (e.g., active lead, tone setting)
- **Long-Term (Vector-Based):**
  - Leads, preferences, message drafts stored as embeddings (via pgvector/FAISS)
  - Retrieved by semantic similarity per task
- **Summarized Memory:**
  - GPT-3.5 periodically summarizes past logs into compact insights

**Model Routing:**
| Task                          | Model             |
|-------------------------------|-------------------|
| Outreach message generation   | GPT-4             |
| Lead scoring, enrichment      | GPT-3.5-turbo     |
| Memory summarization          | GPT-3.5-turbo     |
| Search term interpretation    | GPT-4 (fallback: 3.5) |
| UI chat feedback              | GPT-3.5-turbo     |

**Cost Optimization:**
- Message caching
- Reuse of embeddings
- Query-based vector retrieval
- Model fallbacks and batching

---

## 3. Tech Stack

| Component          | Technology                     |
|-------------------|---------------------------------|
| Frontend           | React + Tailwind/shadcn        |
| Backend            | FastAPI (Python) or Node.js    |
| AI Engine          | OpenAI GPT-4 API               |
| GMaps Scraping     | ScraperAPI                     |
| LinkedIn Scraping  | PhantomBuster                  |
| Vector Memory      | pgvector or FAISS              |
| DB                 | PostgreSQL / SQLite            |
| Hosting            | Vercel/Render + Supabase/Neon  |

---

## 4. Stretch Goals (Post-MVP)

- Gmail/SMTP message delivery
- Automated follow-up outreach
- CRM-style lead pipeline stages
- AI message rewrite suggestions
- Notion, HubSpot, Zapier integrations
- Scheduled background lead discovery
