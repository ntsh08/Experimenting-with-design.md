# Scoring rubric

**PRIVATE. Run agents must never see this file.** It lives outside both version
folders; run agents are launched with access to their version folder only.

## Scoring rubric

Score each run on every dimension. For gaps: pass / fail per gap.

| Dimension | How to check |
|---|---|
| Token adherence | Grep the run's App.jsx/App.css for raw hex/px values that duplicate a token |
| Gap results | 1–9 pass/fail against this key |
| Component reuse | Did it use the 7 provided components, or hand-roll replacements? |
| Composition | Layout vs the layout rules below (V1: match; V2: record what it chose) |
| State coverage | Empty state(s), completed treatment, confirmation flow present & working |
| Cross-run variance | Within a version: do the 3 runs look like the same product? |

See `run-protocol.md` for how runs are executed and scored.

## Gaps

Every Gap below is a place where the component code *permits* something the
design *forbids*. The rule side of each gap is written only in design.md, so
only To-Do (With Design.md) can see it. An agent in To-Do (Without Design.md)
can only get these right by luck or convention.

| # | Gap | Correct (per design.md) |
|---|------|-------------------------|
| 1 | Button `danger` variant renders anywhere | `danger` only inside the delete-confirmation dialog |
| 2 | Row delete affordance | `IconButton` (neutral tone) on the task row |
| 3 | Badge accepts 5 colors | Priority mapping: low=`gray`, medium=`amber`, high=`red`. `green`/`blue` never for priority |
| 4 | Filter bar variant choice | Active filter = `secondary`, inactive = `ghost`. `primary` is reserved for the single main action per view (Add task) |
| 5 | Card has `flat` and `elevated` | Task rows/list = `flat`; `elevated` reserved for overlays (the confirmation dialog) |
| 6 | Completed-task treatment | Strikethrough + `--color-text-muted` on the title; row stays full-presence |
| 7 | Button `lg` size exists | `lg` only for the EmptyState call-to-action; everything else `md` |
| 8 | Decoy tokens | `--color-success` / `--color-info` are reserved; unused in this app |
| 9 | Empty state | Must use the `EmptyState` component, with different copy for "no tasks yet" vs "no results for this filter" |

Non-intended layout rules (also only in design.md): single column, max-width 640px,
centered; page background `--color-background`; `--space-5` between page
sections; `--space-2` gap between task rows; dialog overlay uses
`--color-overlay` with the dialog Card at max-width 400px.
