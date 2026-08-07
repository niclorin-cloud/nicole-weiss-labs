---
name: prd
description: Write or update a Product Requirements Document (PRD) using a context-first, non-happy-path-driven workflow. Asks upfront what tools you actually use (ticket tracker, wiki/docs, codebase access) instead of assuming any specific stack, pulls real context before asking questions, runs a mandatory failure-mode interrogation before drafting, and outputs a PRD in a fixed template with acceptance criteria, a risk table, a per-feature time estimate, and a sign-off line. Optionally drafts tickets in your tracker after a second, separate approval gate — entirely skippable if you don't want that. Use whenever asked to write a PRD, spec a feature/initiative, check whether existing work already covers a feature end-to-end (a "retroactive" PRD), or when non-technical stakeholders need a time/effort estimate for implementation.
---

# PRD Skill

Write a PRD for a feature or initiative, in a fixed document structure, with non-happy-path scenarios interrogated before the document is considered complete.

This skill exists because a plain "write me a PRD" request tends to fail in two specific ways: the output doesn't match whatever template your team actually uses and got signed off on, and nobody is forced to think through what happens when something goes wrong before it ships. That second gap isn't hypothetical — a large share of real production incidents trace back to a screen or endpoint's failure case, empty case, or wrong-actor case never being scoped, because nobody was made to ask about it at design time. A PRD sign-off gate exists specifically to catch that kind of thing before it's live, not just to produce a document.

This version is deliberately generic — no specific company, client, ticket tracker, or wiki tool is assumed. See `README.md` in this folder for setup, and for the ChatGPT / universal versions of this same workflow if you're not using Claude.

## What is a PRD, and do you need one?

*(If you already know this, skip to Setup below — this is here for whoever doesn't.)*

A PRD (Product Requirements Document) is a short document written *before* something gets built. It forces two things to happen that otherwise tend to get skipped under time pressure: someone states plainly what's being built and why, and someone is made to think through what happens when it goes wrong — a failed call, an empty state, the wrong person getting access — before any of that is possible to actually observe. Once it's signed off, it becomes the reference point for what "done" means and, optionally, the source for the tickets that get filed.

You probably don't need the full version of this for a copy change, a purely visual tweak, or anything with no real scope, dependencies, or risk — describe those in a sentence and move on. It's worth doing properly for anything with real scope, a dependency on something else, or any chance of touching real user data, money, or an existing account's access.

## Setup — read this once per project

Before starting, get oriented. Don't skip this because it feels like overhead on a small PRD — even "no, none of that" answers are useful, because they tell you to lean entirely on conversation instead of assuming you can cross-reference anything.

1. **Project context.** How much can this be grounded in the actual system, not just what's said in conversation? Three tiers, roughest to richest — figure out which one you're working with:
   - **Nothing yet.** Fine — this skill still works, it just leans entirely on the ticket tracker, wiki, and conversation, and says so explicitly anywhere the document would otherwise depend on something only the system itself could confirm.
   - **A project-context doc.** A single written file describing the stack, architecture, integrations, and key past decisions — often called `CLAUDE.md`, `PROJECT.md`, `ARCHITECTURE.md`, or similar; the name doesn't matter. If one exists, ask the user to paste it in or point you to it, and lean on it throughout. **If none exists and the user expects to come back and use this skill more than once**, offer to help sketch a bare-bones starter version right now — a handful of quick questions (what's this built with, what does it integrate with, any decisions worth remembering going forward) produces something worth pasting into every future PRD session, not just this one. Keep it short; a rough real doc beats a polished one that never gets written. This is optional and only worth the detour if there's a real "next time" — for a one-off PRD, skip it and move on.
   - **Full codebase access.** Directly, or via a coding assistant that can be handed a research prompt. Richest option, but not always realistic depending on platform — most ChatGPT setups can't do this at all, which is exactly why the project-context-doc tier exists as a middle ground that works everywhere.
2. **Ticket tracker.** What does the user use to track work — Linear, Jira, Asana, GitHub Issues, a spreadsheet, nothing formal? If a matching tool is connected and reachable, offer to search it directly. If not, ask the user to paste in the relevant ticket(s) or links.
3. **Wiki / spec / roadmap docs.** What does the user use for specs, decisions, or roadmap — Notion, Confluence, Google Docs, a shared doc, nothing formal? Same pattern: use it directly if reachable, otherwise ask for the relevant links or content pasted in.
4. **Historical record.** Is there any other archive worth checking — old planning docs, a decision log, past incident write-ups, session notes from earlier work? If so, ask where it lives and how to search it (a folder to grep, a doc to search, a database to query) rather than assuming a particular format or file. If it's a large structured file, ask the user for its shape (what fields/sections it has) before searching it blind.

Once you know the answers, you don't need to re-ask them every single time within the same ongoing project — but do re-confirm if it's been a while or the user mentions something changed. If a project-context doc got sketched out in step 1, that's exactly the kind of thing worth re-pasting at the start of the next session rather than re-deriving from scratch.

## Workflow

### 1. Understand the ask

Figure out which of two modes this is:

- **Forward-looking**: a new feature or initiative that hasn't been built yet ("we should let users set a custom limit on X").
- **Retroactive / gap-check**: work that's already in flight or shipped, and the point of the PRD is to confirm it's actually fully captured and safe — this is what "go back and check X is actually covered" usually means.

Both modes produce the same document shape, but retroactive mode leans much more heavily on step 2 (pulling real context, including a direct check against the codebase if available, not just the docs about it) before asking the user anything, since the goal is to find what's *missing*, not to invent requirements from scratch.

### 2. Pull context before asking questions

Using whatever the Setup step identified as real (ticket tracker, wiki, archive, project-context doc, codebase), pull what's actually there before asking the user anything you could instead go find. None of these sources is fully authoritative on its own — that's the point of checking more than one.

Cross-reference what you find. Specifically look for:

- A ticket that's open/active but has a thin or empty description, when another source (an archive, a doc, an old thread) has substantial content for the same item — this means whatever created the ticket didn't carry the real scope over.
- A status mismatch — the tracker says one thing, a doc or note says another. State both and ask which is current; don't just trust whichever source looks newer.
- A dependency mentioned only in prose ("must ship before X," "blocked behind Y") that isn't expressed as an actual blocking relation in the tracker. This is consistently one of the highest-value things this cross-reference finds — don't treat it as one bullet among several, always check for it specifically.
- A decision or fact that's supposedly current in the wiki/roadmap tool but is actually missing, thin, or stale there relative to an older source that already had it. Don't assume "the newer system" automatically means "current" — when two sources disagree, say so explicitly and flag it as a finding.
- A gap between what the code (or the project-context doc, if that's the only grounding available) actually says and what the tracker/wiki/archive claim. This is the one class of mismatch the other sources can't catch on their own, since they can all agree with each other and still be wrong about the real implementation — or the project-context doc itself can simply be stale, since nothing forces it to stay current. It's also the highest-value check specifically for a retroactive PRD, since "does reality match the paper trail" is usually the real question being asked.

**If full codebase access is available** (the richest of Setup step 1's three tiers): write a short, specific prompt asking the coding assistant to report back on exactly what's needed — e.g. "show me every file/route that touches X, and paste the actual current handling of a failed call in that path." Ask explicitly for raw command output (`cat`, `grep`, `git show`, etc.) rather than a summary of what was found — a paraphrased summary of code behavior can be incomplete or simply wrong, so anything load-bearing for this PRD needs the literal output, not someone's (or something's) characterization of it. Treat what comes back the same as the other sources: something to cross-reference, not a fact to accept uncritically.

**If only a project-context doc is available**: treat it as a strong hint about how the system is built, not a guarantee — it's written by a person (or an earlier AI session) and can drift out of date the same way any doc can. Cross-reference it the same way as the wiki/tracker rather than trusting it by default.

Report what you find as part of the conversation, not buried in the final document. These findings are usually the most valuable part of a retroactive PRD — they're the reason to write one instead of just trusting the ticket list.

### 3. Ask what only the user can answer

Once you've pulled real context, ask conversationally (not as a dumped questionnaire, most important first) for whatever the tools couldn't tell you:

- **Scope boundary**: especially for retroactive PRDs, confirm whether this covers one specific initiative/cluster of tickets or a whole project's full history. Don't assume — a tracker "project" can span years of unrelated shipped work.
- **What "done" means**: an internal/platform capability ("safe for the next team to build on") and a user-facing feature ("adoption target within 30 days") need different success criteria. Ask which frame fits, or propose the one that best matches what you found in step 2 and confirm it.
- **Goals and constraints**: who's affected, why it matters, any hard deadlines or dependencies not already found in step 2.
- **Any scope judgment calls step 2's digging turned up** — e.g. a ticket's priority looking off given what you found, or its framing being half-obsolete relative to a more recent decision. These are calls about what to *build*, as distinct from step 4's questions about how already-scoped behavior should degrade — keep the distinction so a "should this even be in scope" question doesn't get lost inside the non-happy-path walkthrough.

**Depth should scale with stakes, not stay fixed at a handful of bullets.** For a small, low-risk forward-looking PRD, the above plus a short back-and-forth is enough. For a retroactive PRD, or anything touching payments, personal data, or an area with real incident history, go deeper — and ground the extra questions in what step 2 actually surfaced rather than in generic categories. For each piece of grounded context step 2 pulled back, ask specifically what should happen given what's already there, not what should happen in the abstract ("the current handling of a failed call here does X — should the new flow reuse that, or does it need its own path?").

### 4. Non-happy-path interrogation (mandatory — don't skip this even under time pressure)

Before generating the document, walk through every screen, API call, and state the feature touches, and for each one ask what happens when it doesn't go as planned:

- **Fails**: the API call errors, the write fails, a third-party service is down.
- **Empty**: the input is blank, the list has zero items, expected data isn't there yet.
- **Times out / is slow**: what does the user see if this takes far longer than expected?
- **Is retried**: does clicking twice, refreshing, or a redelivered event cause a duplicate, a crash, or is it safe?
- **Gets malformed input**: unexpected characters, wrong type, a value outside the expected range.
- **Is called by the wrong actor**: someone without the right permission, a different account's session, an unauthenticated request.
- **Does something beyond what was specified**: the intended flow runs successfully and *still* does something nobody scoped — collects, stores, or transmits more than the spec called for; exercises a permission or account scope wider than intended; a third-party SDK default silently reaches further than the integration was meant to. This category has no error, no empty state, no bad input to point to — that's exactly why it's easy to miss and worth asking about explicitly rather than assuming the other six categories cover it.

Use `references/non-happy-path-checklist.md` for the fuller checklist and illustrative examples for each category. You don't need to ask all of these as literal questions to the user — for anything you can reason about directly from the code, tickets, or architecture, propose an answer and confirm it rather than making the user do the work. Ask directly only for the judgment calls only they can make (how severe is this risk, what's the acceptable fallback behavior).

Every real risk this phase surfaces goes into the Non-Happy-Path/Risks table in step 5 — don't let a risk get identified in conversation and then quietly disappear from the document. Write each row concretely enough that it could be handed straight to a QA pass later (name the actual screen/field/call, not a vague category label) — it's still speculative at this stage (no code exists yet to independently verify against, in the forward-looking case), so it's a floor for a later QA pass to build on and confirm, not a substitute for it.

### 5. Generate the PRD

Use this structure:

```markdown
# [Feature/Initiative Name]

## Objective
What are we building, and why — one or two lines.

## Goal
What outcome does this create, and how does it tie back to the broader roadmap/vision? (Distinguish "ready for the next team/integration to build on" style internal goals from user-facing adoption-style goals — use whichever framing the user confirmed in step 3.)

## Features
What's being built, in plain language — not a task list, a description of the capability.
- [ ] — **Size:**
- [ ] — **Size:**

## Time Estimate
**Status:** Draft — pending developer confirmation

**Legend:** S = 1-2 days · M = 3-5 days · L = 1-2 weeks · XL = 2+ weeks (an XL is usually a sign to split the feature into smaller pieces)

**Total estimate:** (sum of the sizes above via the legend, e.g. "roughly 2-3 weeks")

## Dependencies
What has to be true, decided, or already built before this can start? Include open questions, not just confirmed facts — an unresolved dependency belongs here, written down, not discovered mid-build. Include dependencies found in step 2 even if they weren't expressed as a formal tracker relation.

## Documentation
What needs to be written or updated as part of this — public setup docs, internal architecture notes, any standing "how this system works" doc your team maintains.

## Release Criteria

### Acceptance Criteria
The happy-path definition of done. Checklist format, one testable behavior per line.
- [ ]
- [ ]

### Non-Happy-Path / Risks
Every state a user could actually hit — error screens, timeouts, partial failures, wrong-account/wrong-mode cases — not just the happy path. This table is the whole point of doing a PRD before build. Don't leave it empty.

| Risk | Risk Level | Mitigating Action | Contingent Action |
|---|---|---|---|
| (one row per real risk surfaced in step 4) | LOW / MED / HIGH | | |

---
**Sign-off:** _____________  Date: _______
*(Anything downstream — ticket creation, build — starts only after this is checked off.)*
```

This matches the structure in `templates/notion-prd-template.md` and `templates/PRD-Template.docx`, so the output can go straight into either without reformatting.

**Filling in Time Estimate.** This section exists because a PRD is frequently read by people who have never worked with developers before — a time estimate gives them something concrete to plan around, and gives the team something to hold itself accountable to later if delivery slips. Size each Features checklist item S/M/L/XL relative to its complexity, unknowns, and dependencies (something blocked on an open question or another team should size up, not down) — don't guess a specific day count directly, since sizing relatively is faster and avoids false precision from whoever is doing the estimating. Sum the sizes via the legend into the total. Critically: you are proposing these sizes, not a developer, so the section always starts flagged `Draft — pending developer confirmation` — never present it to a stakeholder as a committed timeline until an actual developer has reviewed it (see step 6).

### 6. Review and next steps

- Ask if anything needs adjusting before you consider it final.
- **Time Estimate confirmation gate**: explicitly ask whether a developer has reviewed the Time Estimate section yet. If not, say plainly that the sizes and total are a first-pass proposal and shouldn't go to stakeholders as a committed timeline until a developer confirms or adjusts them. Once a developer has (in this conversation or reported back by the user), update the status line from `Draft — pending developer confirmation` to `Confirmed by [name], [date]`, adjusting any sizes that changed. This status line is the accountability record — what was proposed vs. what was actually signed off on — so don't skip updating it once confirmation happens.
- If a wiki/doc tool is connected and reachable, offer to create the page directly there rather than leaving it as a standalone file.
- Never create or edit tickets while the PRD is still in draft or pending sign-off — ticket work only starts after the sign-off line is actually filled in.
- **Ticket drafting is optional.** Ask the user whether they want a ticket breakdown drafted at all — some people just want the document. If yes: once signed off, draft a proposed ticket breakdown from the document and show it in chat before creating anything — one ticket per discrete piece of work in Features, each with a description built from the relevant Objective/Goal/Dependencies context, and a non-happy-path/QA checklist pulled directly from the rows in the Non-Happy-Path/Risks table that apply to that ticket (pulled, not re-invented, and not skipped). Show the full proposed set — titles, descriptions, and which risk rows feed which ticket's QA checklist — as its own explicit approval gate, separate from the PRD sign-off itself.
- Only after the user approves that draft set, create the tickets via whatever tracker is connected and reachable — or, if nothing is connected, hand over the finished draft for the user to enter manually. If the user asks for changes to the draft, revise and re-show it before creating anything — don't create tickets partway through a round of edits.
- This two-gate shape is deliberate: a human checkpoint at "what are we building" (PRD sign-off) and a second one at "here's exactly what's about to get filed" (ticket-draft approval), rather than either skipping straight from spec to filed tickets or leaving ticket creation as undefined future work.
- This PRD's Non-Happy-Path/Risks table is a design-time guess, not a verification — it doesn't replace an independent QA pass once this actually gets built, checking real behavior against real code. Nothing at PRD stage can substitute for that, and the person (or model) that wrote the spec shouldn't be the one grading whether the build satisfies it. Mention this distinction if it comes up rather than letting the PRD's risk table be mistaken for QA sign-off.
