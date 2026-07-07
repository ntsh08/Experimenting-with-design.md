# Runs

These are the **experiment outputs** — one folder per agent run, each a full
clone of a template from `../templates/` plus whatever that agent built
(`src/App.jsx`, `src/App.css`).

## Structure

- `todo-with-design-md/r1..r3` — three runs against the template *with* design.md
- `todo-without-design-md/r1..r3` — three runs against the template *without* it

Grouped by version; `r1`, `r2`, `r3` are independent repeat runs of the same
condition (fresh agent, same frozen prompt from `../task-prompt.md`).

## Rules

1. **Never edit a run.** Each folder is the historical record of what one agent
   produced, exactly as it finished. Fixing or improving a run destroys the data.
2. One run = one fresh agent, one prompt, no follow-ups. If a run is wrong, that's
   a finding (see `../scoring-rubric.md`), not something to correct.
3. Runs are disposable copies — safe to delete a whole round after it's been
   scored and written up in `../results.md`, but keep them while the journal
   still references them.
4. New rounds get their own subfolders cloned fresh from `../templates/` — never
   reuse or continue an old run folder.

Round 1 (July 5, 2026) is scored in `../results.md`.
