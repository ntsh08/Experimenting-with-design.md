# Results

Six runs: three fresh agents per version, identical frozen prompt, fresh isolated
folder each. All six compiled, shipped every feature, reused all 7 components, and
had perfect token discipline (zero raw hex colors in app code). The differences are
entirely about *intent* — exactly what the experiment was designed to isolate.


| | Score | |
|---|:-:|:-:|
| **V1: To-Do (With Design.md)** | 27 / 27 | **100%** |
| **V2: To-Do (Without Design.md)** | 16 / 27 | **59%** |

## Gap scorecard (1–9 from scoring-rubric.md)

| Gap | v1-r1 | v1-r2 | v1-r3 | v2-r1 | v2-r2 | v2-r3 |
|------|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 danger only in dialog | ✅ | ✅ | ✅ | ❌ inline | ❌ inline | ❌ inline |
| 2 row delete = neutral IconButton | ✅ | ✅ | ✅ | ❌ danger tone | ❌ danger tone | ❌ danger tone |
| 3 priority gray/amber/red | ✅ | ✅ | ✅ | ❌ green low | ❌ green low | ❌ green low |
| 4 filters secondary/ghost | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 5 elevated only for overlays | ✅ | ✅ | ✅ | ❌ composer | ❌ task rows | ✅ |
| 6 completed = strike + muted | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 7 lg reserved for EmptyState CTA | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 8 decoy tokens untouched | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 9 EmptyState, case-specific copy | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Score** | **9/9** | **9/9** | **9/9** | **5/9** | **5/9** | **6/9** |

## Composition (rules only stated in design.md)

| Rule | V1 runs | V2 runs |
|------|---------|---------|
| Page background `--color-background` | 3/3 | 0/3 (all white) |
| Max-width 640px column | 3/3 | 640 / 560 / 560 |
| New tasks inserted at top | 3/3 | 0/3 (all append bottom) |
| Delete = scrim + elevated Card dialog | 3/3 | 0/3 (all inline confirm) |
| `--space-5` between sections | 3/3 | mixed |

## Cross-run variance

- **V1: near zero.** Three runs are practically the same product — same title,
  same layout, same variants, same dialog anatomy, near-identical copy.
- **V2: consistent conventions, divergent composition.** All three agreed on the
  green badge and inline confirmation (training-data convention is itself
  consistent!), but diverged on column width, elevated-vs-flat cards, whether the
  composer sits in a card, and invented unrequested features (task-count subtitle).

## Findings

1. **design.md flipped every intended gap where convention disagrees with intent.** Badge
   colors, dialog vs inline delete, icon tone, elevation, page background, insert
   order.
2. **Where convention happens to match intent, the doc adds nothing.** V2 aced
   strikethrough-completed, EmptyState usage, filter variants — those norms are in
   the training data. 
3. **The spec's biggest effect is variance, not quality.** V2's outputs were fine
   apps; they just weren't the *same* app. V1 was reproducible.
4. **Token discipline needed no doc.** Both versions: zero hardcoded values.
   What's derivable from code (tokens exist, components exist) is followed without
   documentation; only intent needs writing down.

