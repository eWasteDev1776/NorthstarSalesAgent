# Northstar Monorepo Scaffold (MVP + Enhancements)

This structure supports MVP-level functionality, modular AI services, and includes scaffolding for key enhancements like lead export, template library, campaign tracking, feedback learning, and agent log streaming.

---

## 📁 Root Directory

```
northstar/
├── backend/                 
│   ├── main.py
│   ├── config.py
│   ├── .env
│
│   ├── routes/
│   │   ├── leads.py            # Create/list leads, tagging, campaign ID, export
│   │   ├── messaging.py        # Message generation & template selection
│   │   ├── strategy.py         # Strategy chat, insights, memory timeline
│   │   ├── scraping.py         # GMaps/LinkedIn scraping
│   │   ├── templates.py        # Cold message template library (save, load)
│   │   └── email.py            # Placeholder for email/SMTP send integration
│
│   ├── db/
│   │   ├── models.py           # Lead, Campaign, Template schemas
│   │   ├── schemas.py
│   │   └── database.py
│
│   ├── services/
│   │   ├── LLM.py              # Model-agnostic LLM interface
│   │   ├── enrich.py           # Business/site summarization
│   │   ├── memory.py           # RAG logic, embedding retrieval, save/edit memory
│   │   ├── vector_search.py    # FAISS/pgvector queries
│   │   ├── summary.py          # Long-term memory summarizer (GPT-3.5)
│   │   └── feedback.py         # Track thumbs-up/down and learn from feedback
│
│   ├── vector_store/           # Vector memory init + management
│
│   ├── utils/
│   │   ├── logger.py           # Agent activity logger (streamed to frontend)
│   │   └── cron.py             # Scheduled tasks (e.g., weekly lead runs)
│
│   └── requirements.txt
│
├── frontend/
│   ├── pages/
│   │   ├── index.tsx           # Entry / natural language input
│   │   ├── leads.tsx           # Lead viewer + tag/grouping/export
│   │   ├── strategy.tsx        # Memory + insight feedback center
│   │   ├── profile.tsx         # Business info, logo, preferences
│   │   └── templates.tsx       # Template library browser/editor
│
│   ├── components/
│   │   ├── LeadForm.tsx
│   │   ├── LeadTable.tsx
│   │   ├── LeadTags.tsx
│   │   ├── CampaignDropdown.tsx
│   │   ├── MessagePreview.tsx
│   │   ├── FeedbackButtons.tsx
│   │   ├── AgentPanel.tsx
│   │   ├── StrategyChat.tsx
│   │   └── AgentLogFeed.tsx    # Live agent log terminal
│
│   ├── utils/
│   │   └── api.ts              # Fetch wrapper for all endpoints
│
│   ├── styles/
│   │   └── globals.css
│
│   └── tailwind.config.js
│
├── prompts/
│   ├── onboarding.txt
│   ├── outreach_draft.txt
│   ├── lead_summary.txt
│   ├── strategy_reflection.txt
│   ├── tone_feedback.txt
│   └── campaign_brainstorm.txt
│
├── scaffold.md
├── README.md
└── .gitignore
```