# AI Usage Log - Title 1 Donation Hub

This file records the prompts used for this project and thier outcomes.

---
## 2026-02-28 - Phase 1 Kickoff
Tier: 1 (Prompt: workflow/WORKFLOW_GUIDE_TITLE1.md / Version: commit <git hash>)
Model: Sonnet 4.6 (Claude Web Interface)
Purpose: Phase 1 Project Structuring
- Context Provided:
  - TITLE1_CONTEXT.md
- Outcome:
  - Phase breakdown accepted with no retries
- Follow-ups Required: None
- Notes:

---
## 2026-04-20 - Phase 2 MVP Scaffold
Tier: 1
Model: Claude Opus 4.7 (Claude Code CLI)
Purpose: Working Next.js MVP prototype — systems-primary donation flow
- Context Provided:
  - TITLE1_CONTEXT.md
  - Design handoff bundle: Downloads/Tilte 1-handoff/tilte-1/
  - Product spec (6 views, two-path flow, stateless, REST API scaffold, Spring Hill Elementary content)
- Outcome:
  - Next.js 16 app scaffolded at web/ (App Router, TypeScript, EB Garamond + DM Sans via next/font)
  - 6 views implemented: landing, school campaign, classroom detail, item fulfillment, donate flow, confirmation receipt
  - Systems-primary architecture: 5 systems (Reading & Writing, Organization, STEM Engagement, Classroom Environment, Operations) as the primary donation surface; items contextualized inside systems
  - Mock data layer for Spring Hill Elementary with Ms. Tarver (5th, 22) + Mr. Ellis (3rd, 24) + 3 stub classrooms
  - Stateless donate flow via URL searchParams (no localStorage)
  - SVG morph animation from handoff bundle ported to client component; doodle overlays preserved with transparent-background rendering
  - 5 REST route handlers (GET schools/[id], classrooms/[id], systems/[id]; POST donations) — each returns mock data shaped to match db-schema.sql, with TODO comments for SELECT/INSERT replacement
  - Postgres schema scaffolded in src/lib/db-schema.sql (schools, systems, classrooms, classroom_system_progress, items, donations, donation_allocations, item_fulfillments) — not provisioned
  - Smoke-tested all routes: 200 across / + /schools/* + /donate + /api/* endpoints
- Follow-ups Required:
  - Replace morph paths with actual figure coordinates (currently using handoff bundle paths directly)
  - Wire real Postgres when backend phase begins (db-schema.sql ready to apply)
  - Payment integration (Stripe or similar) — currently donate flow ends at confirmation view without a real transaction
  - Auth for district portal (system submission side) — out of MVP scope
- Notes:
  - Stack chosen over vanilla HTML/JS for cleaner component boundaries and future typed API shape
  - All mock data accessed via pure getter functions — swap these for DB queries without touching page/component code