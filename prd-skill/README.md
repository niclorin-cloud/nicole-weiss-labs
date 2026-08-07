# PRD Skill

A structured workflow for writing Product Requirements Documents: it asks what tools and access you actually have before assuming anything, pulls real context before asking you questions, forces a non-happy-path interrogation before the document is considered done, and outputs a fixed template with acceptance criteria, a per-feature time estimate, a risk table, and a sign-off line. Ticket drafting (with a second, separate approval gate) is available afterward if you want it — entirely optional.

The time estimate exists mainly for non-technical stakeholders who haven't worked with developers before — it sizes each feature (S/M/L/XL, translated to a day range) and rolls up to a total, but it's always flagged "Draft — pending developer confirmation" until an actual developer reviews it, so it can't be mistaken for a commitment nobody signed off on.

This isn't a generic "write me a PRD" prompt. The two things it's built to force are: matching whatever template your team has actually agreed to use, and never letting a feature ship without someone having explicitly thought through what happens when it fails, is empty, times out, gets retried, gets bad input, is called by the wrong person, or quietly does more than it was asked to.

**New to PRDs?** All three versions open with a short explainer — what a PRD is, why it exists, and when it's actually worth doing (skip it for a copy tweak, do it properly for anything with real scope, a dependency, or a chance of touching real user data, money, or account access). You don't need to have written one before to use this.

It works the same way conceptually everywhere, but is packaged three ways depending on what you're using:

| You're using... | Use this | Notes |
|---|---|---|
| **Claude** (Claude.ai, Claude Code, or Cowork) | [`SKILL.md`](./SKILL.md) | Full version. If you have a ticket tracker or wiki connected, Claude can pull context from it directly instead of you pasting things in. |
| **ChatGPT** (Custom GPT or a Project) | [`chatgpt/`](./chatgpt/) | Same workflow, condensed for the Instructions field. No live tool access — you paste in context. See `chatgpt/README.md` for setup. |
| **Anything else** (Gemini, a local model, one-off use in any chat) | [`universal/prd-prompt.md`](./universal/prd-prompt.md) | One fully self-contained file — paste the whole thing as a system prompt or your first message. |

Every version's first real step asks how much this can be grounded in the actual system: nothing, a single project-context doc (stack/architecture/integrations/decisions — often called `CLAUDE.md` or `PROJECT.md`), or full codebase access. Full code access is the richest option but rarely available outside Claude with a coding assistant wired up; the project-context-doc tier exists because it's the one that works no matter what you're using, and if you don't have one yet but expect to use this again, the skill will offer to help you sketch a bare-bones one on the spot.

## Setup

### Claude

Copy the whole `prd-skill/` folder (or at minimum `SKILL.md` + `references/` + `templates/`) into wherever your Claude setup loads skills from. In Claude Code / Cowork, that's typically a `skills/` directory the client watches — check your client's docs for the exact path, since this varies by product and version. Once it's in place, ask Claude to write a PRD and it should pick this up automatically based on the skill's description.

### ChatGPT

See [`chatgpt/README.md`](./chatgpt/README.md) — two options are covered (a dedicated Custom GPT, or pasting instructions into a plain chat/Project).

### Anything else

Open `universal/prd-prompt.md`, copy the whole thing, and paste it in as a system prompt / custom instructions for whatever you're using. No setup beyond that.

## What's in this repo

```
prd-skill/
├── SKILL.md                          Claude Skill — the fullest version of the workflow
├── references/
│   └── non-happy-path-checklist.md   The failure-mode checklist used in step 4, with illustrative examples
├── templates/
│   ├── notion-prd-template.md        Paste-into-Notion version of the output template, with setup steps
│   ├── PRD-Template.docx             Word/Google Docs version of the same template
│   └── build_docx_template.js        Source script that generates the .docx (docx-js), in case you want to tweak it
├── chatgpt/
│   ├── README.md                     Setup instructions for ChatGPT
│   └── instructions.md               Condensed workflow for a Custom GPT's Instructions field
└── universal/
    └── prd-prompt.md                 Fully self-contained version for any other LLM
```

## Using the templates directly

If you just want the output template — not the interactive workflow — without setting up any of the above:

- **Notion**: open `templates/notion-prd-template.md`, follow the setup steps at the top to paste it into a new Notion page and turn it into a database template.
- **Google Docs / Word**: upload `templates/PRD-Template.docx` to Google Drive and open it with Google Docs (it converts automatically), or open it directly in Word.

## A note on what this doesn't do

The Non-Happy-Path/Risks table this produces is a design-time guess, not a verification. It's meant to be the starting point for a real QA/testing pass once the thing is actually built — not a substitute for one. Whoever (or whatever) wrote the spec shouldn't be the one grading whether the finished build satisfies it.

## License

MIT — see [`LICENSE`](./LICENSE). Use it, modify your own copy, share it, build on it. Only the maintainer of this repo can change the canonical version here; forking or copying it doesn't need permission.
