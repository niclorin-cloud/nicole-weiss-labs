# Non-Happy-Path Checklist

Use this during step 4 of the PRD workflow (`SKILL.md`, or the equivalent step in the ChatGPT/universal versions). For each screen, API call, or state change the feature touches, work through the categories below.

Each category includes a short illustrative example — these are generic, made-up scenarios meant to show the *shape* of the failure, not a real incident from any specific company. As you use this for real projects, consider keeping your own running list of real incidents next to each category (a line or two, not a full writeup) — a checklist that cites things that actually happened to your team lands much harder than one that only cites hypotheticals. A blank line is left under each category for exactly that.

## Fails

The API call errors, the database write fails, a third-party service is down or rejects the request.

- What does the user actually see? Raw error text from a third-party SDK or internal system is never acceptable in a user-facing screen — it can leak internal details the user has no business seeing (stack traces, internal IDs, fragments of credentials).
  - *Example: a checkout confirmation screen surfaces a raw payment-processor error string directly to the customer, including an internal account identifier that was never meant to be user-facing.*
- Does a partial failure leave data in an inconsistent state (e.g., one row updated, a related row not)?
  - *Example: a settings save that updates three related records isn't wrapped in a transaction, so a failure partway through leaves the records in a state that doesn't match any valid configuration.*
- If a background job or webhook delivery fails, is there any way to know? Does anything retry it, or does it silently vanish?
  - *Example: a webhook endpoint starts failing 100% of deliveries with no alerting configured; the downstream records it was supposed to create never get written, and nobody notices until a user reports something missing.*
- *Your team's own examples:*

## Empty

The input is blank, a list has zero items, expected data isn't there yet, a lookup finds nothing.

- What renders when the list/table/dashboard this screen depends on has nothing in it yet? Is it distinguishable from a loading state or an error state?
- What happens if a required upstream record doesn't exist yet — does the feature fail loudly, silently no-op, or crash?
  - *Example: a purchase completes successfully but the record linking it to the user's account is never created, because the code assumed that record would already exist. Nothing surfaces the gap until someone goes looking for it.*
- *Your team's own examples:*

## Times out / is slow

The call takes far longer than expected, or a background process (a webhook, a polling loop, an async job) hasn't caught up yet.

- If this feature polls for a result (e.g., waiting on a webhook or async job to land), what does the user see if the poll window expires before the real data arrives?
  - *Example: a "processing your order" screen polls for a confirmation that normally arrives in two seconds; when it occasionally takes fifteen, the polling window has already given up and shown generic fallback copy — even though the order actually succeeded.*
- *Your team's own examples:*

## Is retried

The user clicks twice, refreshes mid-flow, an event is redelivered, a network request is retried automatically.

- Is the underlying action idempotent? Would running it twice create a duplicate object, double-charge, or corrupt state?
- If this touches a shared/concurrent resource (a row another process might also be writing), what happens on a race?
  - *Example: two processes each read the same record, each make an independent change, and each write back — whichever writes second silently overwrites the first change with no conflict detection.*
- *Your team's own examples:*

## Gets malformed or unexpected input

Wrong type, out-of-range value, unexpected characters, a field that's technically present but semantically wrong.

- What happens with a zero, negative, or absurdly large number where a price or quantity is expected?
- What happens if a value used to route logic (a status flag, a type field, an identity method) is in a state the code doesn't explicitly handle — not just "missing," but "present and wrong"?
  - *Example: a routing field is unexpectedly null at the same moment an unrelated pricing field is unexpectedly zero — a combination nobody designed for, which fully blocks the flow instead of degrading gracefully.*
- If a save operation partially fills out a form (some fields blanked, not all), does it reject cleanly with a clear message, or fail in a confusing all-or-nothing way?
- *Your team's own examples:*

## Is called by the wrong actor

Wrong permission level, wrong account's session, unauthenticated, a session that's stale or belongs to a different context than the one currently active.

- Does this screen or endpoint correctly distinguish "not logged in" from "logged in but not authorized" from "session is stale"? A generic error here tends to get misdiagnosed later, by whoever investigates it.
  - *Example: a stale-session error gets surfaced with generic copy, gets misread as an unrelated "please accept the terms" issue, and the wrong problem gets chased for a while before anyone realizes what actually happened.*
- If this feature ever runs in a bulk/batch/cron/migration context, could it ever accidentally touch a live account it shouldn't?
  - *Example: a maintenance sweep intended to run against test accounts is accidentally pointed at production and starts modifying real, live accounts before anyone notices.*
- *Your team's own examples:*

## Does something beyond what was specified

The intended flow runs, succeeds, and does something nobody actually scoped — a data category collected with no consent step, a permission or account scope wider than what the feature needed, a third-party SDK's default behavior quietly reaching further than the integration was meant to. This is a different shape than the six categories above: there's no error, no empty state, no bad input, no wrong actor — the "happy path" *is* the problem, because it does more than it was asked to.

- Does this feature touch any data, third-party API scope, or account access beyond exactly what's named in its Features section? If it touches personal or sensitive data, was that specific use explicitly confirmed as in scope during design, rather than assumed as an implementation default?
- Did scope silently expand somewhere during implementation — an SDK or library default that captures more than what was requested, a "just in case" broad permission grant — that never got flagged back against the spec?
  - *Example: an integration's default configuration quietly logs and forwards more user data than the feature actually needed, and nobody had explicitly asked for or approved that broader scope — it was just what the library did by default.*
- *Your team's own examples:*

## After the walkthrough

Every genuine risk that came out of this — not every theoretical one, the ones that would actually matter if they happened — becomes a row in the PRD's Non-Happy-Path/Risks table: what the risk is, how severe it is, what mitigates it, and what the fallback is if the mitigation doesn't hold. If a risk surfaces here and doesn't make it into that table, it was effectively never raised.
