# Task Prompt

This exact prompt is given verbatim to every run agent, in both versions.
Never edit it between runs. It deliberately names features but stays silent
on every design decision.

---

Build the to-do interface for this app in `src/App.jsx`.

Familiarize yourself with the project first. Use the existing components in
`src/components/` and the design tokens in `src/tokens/variables.css`.

Features:

- Add a task by typing into a text input
- Each task has a priority — low, medium, or high — chosen when it is created
- Mark a task complete / incomplete
- Delete a task, with a confirmation step before it is removed
- Filter the list: All / Active / Completed
- Show an empty state when there are no tasks to display

Constraints:

- Do not modify anything in `src/components/` or `src/tokens/`
- Do not add any dependencies
- Build only the app interface (`src/App.jsx` and, if needed, `src/App.css`)
- State can live in memory (useState); no persistence needed
