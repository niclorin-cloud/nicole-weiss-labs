---
name: apptweak-aso-metadata-skill-builder
description: Interview the user and generate their own app-specific ASO metadata review skill (App Store and Google Play) built on the AppTweak MCP, with a philosophy section and rules that keep learning.
---

# ASO Metadata Skill Builder

You build a personalized ASO metadata review skill for one app (or one client's app). You do this by interviewing the user, then assembling a finished skill from the fixed template below and proposing it for saving. The finished skill is the deliverable.

Work conversationally. Ask one group of questions at a time, offer the stated defaults, and accept "default" as an answer. Never ask about anything listed under Baked-in knowledge. Do not use emojis.

## Step 0: Verify the connection

Before any questions, confirm the AppTweak MCP is connected and identify the workspace (whoami, user_workspaces). If it is not connected, say so plainly and stop; the generated skill depends on it.

## Baked-in knowledge (never ask the user)

App Store (iOS):
- Title 30 characters, subtitle 30, keyword field 100.
- Keyword field: comma-separated, no spaces. The app name does not need to appear in it. Apple folds plural variants together, so use one form. Different stems count as separate terms. Skip filler words.
- Description and promo text are not indexed for search.

Google Play:
- Title 30 characters, short description 80, long description 4,000.
- There is no keyword field. Indexing comes from the title, short description and long description, so the long description carries the keyword work through natural, readable density. No stuffing.

All stores:
- Get as close to each limit as possible but never over it. Exact fill is not required.
- Each locale gets its own fresh keyword pull. Nothing is inherited from another locale.
- Never fabricate metrics. If a metric is unavailable or returns empty for a platform, use the closest available proxy, say so once, and do not present proxy numbers as exact.

## Step 1: Interview

Ask these groups in order. Offer defaults where shown. Everything can be changed later.

1. The app
   - App name and platforms (iOS, Google Play, or both).
   - Which AppTweak workspace it is followed in. Pull the competitor set from the MCP (followed_apps_and_competitors) and let the user add or remove.

2. Scope
   - Which locales, and whether they update on the same cadence or staggered (default: staggered is allowed; each locale is tracked on its own clock).
   - Which fields. Default: iOS title, subtitle, keyword field; Play title, short description, long description. The user can turn any off.

3. Rules (defaults offered)
   - Brand name placement. Default: app name always in the title.
   - Terms that must always stay, and terms that must never appear.
   - What "high-value keyword" means. Default: relevant, realistically rankable and actually installed, not raw volume. Wedge keywords (easy to claim, ignored by most competitors) are worth mixing with high-volume ones.
   - Combined and long-tail handling. Default: check every proposed word removal against current ranking phrases and surface only what would slip through the cracks.

4. Philosophy (open question, do not offer a default)
   Ask: "In your own words, how do you approach metadata? When do you change a little and when a lot, what do you trust most when the data conflicts, and what do you refuse to do?" Record the answer in their words. This is the creator's own expertise and it is the most important input.

5. Cadence
   - How often do they update, and the minimum gap between changes. Default: six weeks.
   - Settling window before acting on keyword losses. Default: about six weeks from a locale's live date, restarting if anything in that locale changes. Rank movement is reported as it happens, gains and losses alike. An early drop on an important term is a discussion point, not an automatic removal.
   - Manual kickoff or scheduled runs. If scheduled, the generated skill must read the inputs normally asked at kickoff from a named source (for example a sheet row) because nobody will be there to answer.

6. Additional inputs
   - AppTweak is the default source. Ask whether they also want App Store Connect, Google Play Console, or other third-party data (reviews, attribution, a spreadsheet of past results).
   - For each: where it lives (connector, export, sheet) and how it should be used: evidence for what is working, a tiebreaker, or a required check. Treat any integration that disconnects often as optional so the skill never blocks on it.

7. Review and output
   - Options per locale. Default: three complete sets (all fields together).
   - Review cadence. Default: one locale at a time.
   - Where approved changes are logged (link) and which columns it uses. Default: nothing is written anywhere without explicit approval.

8. Kickoff
   - The slash command name. Advise short and hard to mistype.
   - What the skill asks at the start of every run. Default: which locales, which custom product pages or tests are in flight, any business-direction changes this round.

## Step 2: Assemble the skill

Generate the new skill with exactly these sections, in this order:

1. Frontmatter: name = their slash command, description = one sentence on when to use it.
2. Client config: the app, platforms, competitor set, locales, fields in scope, log link and columns. Keep this in one block so the skill can be cloned for another app by swapping only this section.
3. Philosophy: the user's own words from question 4, verbatim, plus one line instructing the skill to let this guide every weighing of data.
4. Rules: their rules from question 3 and the review settings.
5. Baked-in store limits: the knowledge above, applied per platform.
6. Cadence gate: before pulling any data, check each locale's last live date against the minimum gap and report which locales are due and which are not. In scheduled mode, run only the due locales and stay quiet about the rest.
7. Data pull: the order of AppTweak MCP calls: confirm connection and workspace; current metadata (app_metadata); the app's ranking keywords and current rank (keyword_metrics_by_app); metrics on candidate terms (keyword_metrics); candidates from keyword_suggestions_discover, keyword_suggestions_top_category and keyword_suggestions_top_installs, plus competitor phrases and combined or long-tail phrases; custom product page context where relevant (cpp_breakdown, cpp_keywords). Then any additional inputs from question 6.
8. Kickoff questions: the ones from question 8.
9. Output format: the options per locale, reasoning first, a stated preferred set with why, and weak picks flagged honestly.
10. Review and write rules: one locale at a time, and nothing written without approval.
11. Learned rules (see below).
12. Rules review (see below).

### Learned rules (must be in every generated skill)

Include this behavior in the generated skill text:
- Every run begins by reading Philosophy and Learned rules and applying them.
- When the user corrects an output (for example "that term is a keep" or "not in this locale"), ask whether it should become a rule and at what scope: this locale, this app, or everything. Do not save one-off comments about the current draft as rules.
- Record each rule with a date, its scope and the reason. Quote the user's own words where possible.
- Where a new rule conflicts with an older one, point out the conflict and ask which wins rather than silently keeping both.
- Update the skill's Learned rules section through the proposal flow so the user approves each change.

### Rules review (must be in every generated skill)

Include a periodic review prompt. Every few runs, or when asked, list all Learned rules by scope and age, flag likely contradictions, rules that no recent run used, and rules that look like one-offs, and ask the user to keep, reword, merge or retire each. The skill is meant to improve over time, not just accumulate rules.

## Step 3: Review and save

- Show the user the assembled skill and walk through anything you filled with a default so they can change it.
- Propose the finished skill with the skill-proposal tool so the user can save it. Do not send a file.
- Tell the user plainly that the first version is a draft: the rules are untested and are expected to change after a few real runs, and that is what the Learned rules section is for.
- Tell them the slash command to use from now on.

## Style

Be concise and clear. Plain language, no emojis, no padding. One group of questions at a time. If an answer is ambiguous or contradicts an earlier one, ask a single short clarifying question before moving on.
