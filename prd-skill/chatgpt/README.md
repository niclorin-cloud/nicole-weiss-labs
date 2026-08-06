# PRD Skill — ChatGPT setup

This gives ChatGPT the same PRD workflow as the Claude version, adapted for the fact that ChatGPT (Custom GPTs / Projects) doesn't call tools like a ticket tracker or wiki automatically the way a connected Claude session can — it relies on you pasting in context instead.

## Option A — Custom GPT (recommended if you'll use this repeatedly)

1. In ChatGPT, go to **Explore GPTs → Create**.
2. Skip the GPT Builder chat and go straight to the **Configure** tab.
3. Name it something like "PRD Writer."
4. Paste the contents of `instructions.md` (in this folder) into the **Instructions** field.
5. Under **Knowledge**, upload these three files from the repo so the GPT can reference them in full instead of relying on a condensed summary:
   - `../references/non-happy-path-checklist.md`
   - `../templates/notion-prd-template.md`
   - `../SKILL.md` (optional, but gives the GPT the fullest version of the workflow reasoning to draw on)
6. Save. Start a new chat with it whenever you want to write a PRD.

## Option B — Plain ChatGPT conversation or Project

If you don't want to set up a Custom GPT:

1. Open a new chat (or a new **Project** if you have one for this work — Projects let you set persistent instructions and attach files, similar to a Custom GPT).
2. Paste the contents of `instructions.md` as your first message, or into the Project's custom instructions.
3. Optionally paste in the non-happy-path checklist and template too if you want them fully available rather than summarized.

Either way, the model will ask you upfront what tools you use (ticket tracker, wiki, codebase access) rather than assuming anything — that's intentional, see `instructions.md`.
