# PRD Template — Notion setup

This is the Notion version of the PRD structure this skill produces. It's written as Notion-flavored markdown so you can paste it straight into a new page and Notion will convert the headings, checklists, and table automatically.

## Setup (one-time, a few minutes)

1. In Notion, create the database you want PRDs to live in (or use an existing "Projects" / "Roadmap" database). Recommended properties on that database, all optional:
   - **Status** (select: e.g. Backlog / In Progress / Shipped)
   - **Target Launch** (date)
   - **Ticket Tracker Link** (URL — link to the tracker project/epic once tickets exist)
   - **Effort/Impact** (text or select, if you want a lightweight prioritization signal)
2. Create a new page inside that database, title it "PRD Template."
3. Paste everything under the `---` divider below into the page body. Notion will auto-convert the `#`/`##` headings, `- [ ]` into checkboxes, and the pipe table into a real table.
4. Open the page's `•••` menu → **Turn into template** (or, in a database, use the "New" button's dropdown → **+ New template**) so it shows up as a one-click starting point for every new PRD in that database.
5. Delete this "Setup" section from the template itself — it's instructions for you, not part of the document.

---

> **Ticket Tracker Link:** *(add the link once tickets are created — tickets only get created after this PRD is signed off below)*

# Objective
*What are we building, and why — one or two lines.*

# Goal
*What outcome does this create, and how does it tie back to the broader roadmap/vision?*

# Features
- [ ] — Size: `S` `M` `L` `XL`
- [ ] — Size: `S` `M` `L` `XL`
- [ ] — Size: `S` `M` `L` `XL`

# Time Estimate
**Status:** Draft — pending developer confirmation
*(Update to "Confirmed by [name], [date]" once a developer has reviewed the sizes above — that's what makes this estimate something the team can be held accountable to later.)*

**Legend:** S = 1-2 days · M = 3-5 days · L = 1-2 weeks · XL = 2+ weeks *(consider splitting into smaller features)*

**Total estimate:** *(sum of the sizes above via the legend, e.g. "roughly 2-3 weeks")*

# Dependencies
*What has to be true, decided, or already built before this can start? Include open questions, not just confirmed facts — an unresolved dependency belongs here, written down, not discovered mid-build.*

# Documentation
*What needs to be written or updated — public setup docs, internal architecture notes, any standing "how this system works" doc your team maintains?*

# Release Criteria

### Acceptance Criteria
*The happy-path definition of done.*
- [ ]
- [ ]

### Non-Happy-Path / Risks
*Every state a user could actually hit — error screens, timeouts, partial failures, wrong-account/wrong-mode cases — not just the happy path. This table is the whole point of doing a PRD before build. Don't leave it empty.*

| Risk | Risk Level | Mitigating Action | Contingent Action |
|---|---|---|---|
| | `LOW` `MED` `HIGH` | | |
| | | | |

---
**Sign-off** — nothing downstream (tickets, build) starts until this is filled in.

Approved by:
Date:
