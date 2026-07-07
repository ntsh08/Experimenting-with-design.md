# Templates

These are the **clean master copies** the experiment runs from. Never run agents
directly in here — clone a template into `../runs/` first, and launch the agent
in the clone.

## The two templates

- `todo-with-design-md/` — components + tokens + `design.md`
- `todo-without-design-md/` — byte-identical, minus `design.md`

That single missing file is the experiment's only variable. Keep it that way:
any change made to one template (components, tokens, config) must be mirrored in
the other, so they never drift apart except for design.md itself.

## Rules

1. `src/App.jsx` stays an empty shell — the run agents build the interface, not us.
2. Iteration happens here: design.md amendments and token changes are made to the
   template, then fresh runs are cloned from it. Run folders are never edited.
3. After changing anything, verify the single-variable property still holds:
   `diff -rq todo-with-design-md todo-without-design-md --exclude=node_modules`
   should report exactly one difference: `design.md`.
