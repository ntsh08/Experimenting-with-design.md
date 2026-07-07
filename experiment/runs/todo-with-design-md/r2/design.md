# design.md

This file is the design contract for this app. The component code tells you what
is *possible*; this file tells you what is *correct*. Where code and this file
disagree on intent, this file wins.

## 1. Design tokens — what they mean

Tokens live in `src/tokens/variables.css`. Use tokens for every color, spacing,
radius, and font-size decision. Never hardcode a raw value that a token covers.

| Token | Meaning / intended use |
|---|---|
| `--color-accent` | The one primary action per view, focus rings, active checkbox |
| `--color-danger` | Destructive confirmation only — see Button rules |
| `--color-success`, `--color-info`, `--color-warning` | **Reserved.** Not used anywhere in this app today. Do not reach for them. |
| `--color-background` | Page background |
| `--color-surface` | Card and input backgrounds |
| `--color-border` | Hairline borders and dividers |
| `--color-text` | Primary text |
| `--color-text-muted` | Secondary text, placeholder text, completed-task titles |
| `--color-overlay` | Dialog scrim, nothing else |
| `--space-*` | The only spacing values allowed. Task-row gap: `--space-2`. Between page sections (header / input row / filters / list): `--space-5`. Card padding is built into Card. |
| `--radius-*` | Built into components; you should rarely need these directly |
| `--shadow-*` | Built into Card variants; do not apply shadows ad hoc |

## 2. Component contracts

### Button
- Variants: `primary`, `secondary`, `ghost`, `danger`. Sizes: `sm`, `md`, `lg`.
- **One `primary` button per view.** In this app that is the Add-task action.
- `danger` is allowed in exactly one place: the confirm action inside the
  delete-confirmation dialog. Never on task rows, never inline in the list.
- `ghost` is for de-emphasized actions: inactive filters, dialog Cancel.
- `secondary` is for selected-but-not-primary states: the active filter.
- Size `md` everywhere, with one exception: the EmptyState call-to-action may
  use `lg`. Never use `lg` for the Add-task button.

### Checkbox
- The completion toggle on each task row. Always give it an accessible label
  (the task title works as the label).

### TextInput
- The Add-task field. Placeholder text uses sentence case ("Add a task…").
- The `error` state exists in code but this app has no error flows; don't use it.

### Card
- `flat` for task rows and any in-page grouping.
- `elevated` is reserved for content floating above the page — in this app,
  only the delete-confirmation dialog. Task rows are never elevated.

### Badge
- Shows task priority. Exact mapping, no substitutions:
  - low → `gray`
  - medium → `amber`
  - high → `red`
- `green` and `blue` exist in code but are **never** used for priority.
- Badge text is the priority word, lowercase: "low", "medium", "high".

### IconButton
- The delete affordance on each task row: an IconButton (neutral tone) with an
  ✕ or trash glyph and `aria-label="Delete task"`. Do not use a text Button for
  row-level delete. The `danger` tone exists for icon actions inside
  destructive dialogs; task rows use neutral.

### EmptyState
- Whenever the visible list is empty, render EmptyState — never ad-hoc text.
- Two distinct cases with distinct copy:
  - No tasks at all: encourage creation (e.g. "Nothing here yet" + a hint or a
    `lg` call-to-action button).
  - Tasks exist but the filter matches none: say so (e.g. "No completed tasks").

## 3. Composition & layout

- Single centered column, `max-width: 640px`, horizontal padding `--space-4`.
- Page background: `--color-background`. Content sits on it; the page is not
  wrapped in one giant Card.
- Vertical order: app title → add-task row → filter bar → task list.
- `--space-5` between those sections; `--space-2` between task rows.
- Add-task row: TextInput (flexes to fill) + priority selector + `primary`
  `md` Button, on one line.
- App title: `--font-size-xl`, semibold, `--color-text`.

## 4. Interaction & states

- **Completed task:** title gets strikethrough + `--color-text-muted`. The row
  keeps full opacity and stays in place — completing is not hiding.
- **Delete flow:** row IconButton opens a confirmation dialog. Dialog = scrim
  (`--color-overlay`, covers viewport) + centered `elevated` Card,
  `max-width: 400px`, containing a short question, a `ghost` Cancel and a
  `danger` Confirm ("Delete"). Deletion happens only on confirm.
- **Filters:** All / Active / Completed as a row of buttons. Active filter =
  `secondary`, inactive = `ghost`. Filtering never deletes or reorders tasks.
- **Empty list:** see EmptyState contract above.
- New tasks appear at the top of the list, default state active.

## 5. Hard rules

1. No raw hex colors, no raw px spacing in app code — tokens only.
2. One primary button per view.
3. `danger` variant only inside the confirmation dialog.
4. Priority colors: gray/amber/red. Never green, never blue.
5. Completed ≠ transparent: strikethrough + muted color, full opacity.
6. Empty states use the EmptyState component, with case-specific copy.
7. Use the provided components; do not rebuild what already exists.
