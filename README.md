# 🚗 Car Detective MVP (FANG-Grade Clean Scaffold)

This is a cleaned, modular, production-ready MVP scaffold for the AIN-powered vehicle lookup platform. Built using **React + Next.js**, fully structured for FANG-grade development workflows.

---

## 🧩 Core Features

- VIN, Plate, and Manual vehicle entry
- Car decoding & find flow
- Follow-up questions with tabbed UI
- AIN Assistant component (AI-powered)
- Draft saving, restore, and submission
- Separate auth for dealers & users

---

## 🚀 Tech Stack

- **Frontend**: React + Next.js + Tailwind + ShadCN + Radix UI
- **Backend**: Next API Routes (or plug-in external)
- **AI/LLM**: Future support for GPT-4o/Claude
- **Auth**: Ready for Clerk/Firebase
- **Storage**: Draft save / Valuation logic hook-ins

---

## 🛠 Setup

```bash
# Install dependencies
npm install

# Run local dev server
npm run dev

# Build for production
npm run build
```

---

## 🧪 Folder Structure

```
pages/
  lookup/         # VIN, Plate, Manual entry pages
  found/          # Found vehicle + follow-up tabs
auth/
  dealer/         # Dealer auth
  user/           # User auth
components/
  ui/             # CarFindCard, Tabs, Uploads, AIN
  layout/         # App layout & Theme provider
lib/              # Drafts, APIs, Valuation Engine
types/            # Global shared types
```

---

## 🧼 Notes

This scaffold is placeholder-free — all logic, UI, and flows are clean and ready to implement. No mock data. No noise.

Built for rapid production launch.

