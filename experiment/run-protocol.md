# Run protocol

1. 3 runs per version, 6 total. Fresh agent per run, cwd = its version folder,
   no access to the other version, `scoring-rubric.md`, or the orchestrating
   conversation.
2. Identical prompt from `task-prompt.md`, verbatim.
3. Each run's output saved as a copy, grouped by version:
   `runs/todo-with-design-md/r1..r3` and `runs/todo-without-design-md/r1..r3`.
4. Screenshot each result into `runs/screenshots/<version>/` (headless browser,
   1280×800 viewport, light scheme, 2x scale), named `rN-<state>.png`. Three
   canonical states per run, so shots are comparable across runs and rounds:
   - `rN-1-empty.png` — initial load, no tasks
   - `rN-2-list.png` — 3 seeded tasks ("Review pull requests"/low,
     "Write the quarterly report"/medium, "Ship the design system"/high),
     with the low task completed
   - `rN-3-confirm.png` — delete triggered on the high task
5. Score after all 6 runs complete, not incrementally, to avoid drift, against
   the rubric in `scoring-rubric.md`.
