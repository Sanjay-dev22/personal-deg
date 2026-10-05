# personal-deg

A personal archive of presentations and records created while researching and
prototyping on India's Digital Energy Grid / India Energy Stack initiative —
Policy as Code (UC3), Vehicle-to-Grid, and Peer-to-Peer Energy Trading.

## Contents

**`portfolio-deck/`** — overview presentations spanning the DEG/IES work:
- `DEG-IES-Presentation-15min.pptx` — the version actually used to present:
  trimmed from the master (26 → 20 slides, cutting redundant/over-technical
  ones) for a 15-minute group talk to a non-technical audience, with the
  headline UC3 numbers corrected to match the current repository (₹2,434.40,
  6 scenarios, 2 open calculation questions) and full spoken-style speaker
  notes with pacing/delivery cues on every slide
- `DEG-IES-Master-Portfolio.pptx` — the full, uncut source version: a
  full background (what DEG/IES/Beckn are, how the protocol works) plus a
  detailed investigations section for UC3 (Policy as Code, including a real
  before/after schema diff) and P2P Energy Trading (with live-app
  screenshots and a Grid Pulse walkthrough)
- `DEG-IES-Story-v2.pptx` — an earlier fuller, 21-slide version (proper
  multi-slide DEG/IES intro, one slide per section per topic)
- `DEG-IES-Story-Compact.pptx` — an earlier shorter 7-slide version,
  condensed intro, one slide per exploration

**`grid-pulse/`** — a self-contained, clickable walkthrough of the real P2P
energy trade, for an audience that won't sit through a live click-through
demo. Both cover the same six real moments and are non-linear (a clickable
map jumps to any moment, in any order):
- `Grid-Pulse-Illustrated-Tour.pptx` — every visual hand-drawn from native
  shapes (gradients, custom icons, flow arrows) — the current version
- `Grid-Pulse-Guided-Tour.pptx` — an earlier version using real screenshots
  from the live tool instead

**`work-record/`** — a running record of work done, in three formats:
- `DEG-IES-Work-Record.pptx` — a living, one-slide-per-week/milestone deck,
  meant to be added to over time
- `Work-Record-Weekly.docx` — the same period, written out in full narrative
  detail week by week
- `Work-Record-Summary-Bullets.md` — the same again, condensed to precise
  bullet points only

**`original-decks/`** — earlier presentations from this same body of work:
- `IES-TSP-Proposal.pptx` — the original UC3 (Policy as Code) proposal deck
- `IES-V2G-PoC-Proposal.pptx` / `IES-V2G-PoC-Demo.pptx` — the V2G proposal
  and its tighter, demo-focused follow-up
- `ISO-15118-20-Layer-B-Deep-Dive.pptx` — a technical deep-dive on the
  vehicle↔charger protocol layer, requested for a more technical review
- `DEMO-SCRIPT.md`, `v2g-case.md` — supporting write-ups behind the above

**`intro-slides/`** — one-slide self-introductions for a department meeting:
- `Intro-Slide-Student.pptx` — follows the department's sample template
  (name, role, programme, skill chips, about me, journey)
- `Intro-Slide-Bosch.pptx` — a from-scratch alternative layout: identity panel
  plus a short education / skills / beyond-code story

**`aggregation-v2g/`** — a 30-slide research deck on aggregation, orchestration
and vehicle-to-grid, prepared after a demo review, plus the deeper research
behind it:
- `Aggregation-Orchestration-V2G.pptx` — who's who (regulators, utilities,
  aggregators, standards), how many small resources become one dependable
  supply (with and without V2G), how it fits DEG / IES, the risks raised in
  the review, what exists in India and at Bosch publicly, and a proposal.
  Every claim is labelled verified, reported, inference or proposed, with
  sources listed at the end
- `research-bosch-v2g-der-deep-dive.md` — the full underlying research
  record: worldwide V2G pilots (Denmark, Delaware, Netherlands, Japan, UK,
  US school buses/California) and DER/VPP-without-V2G precedent (Tesla's
  South Australia VPP, Kaluza, Next Kraftwerke, sonnen, AutoGrid/Uplight)
  with real technical/commercial detail; why India hasn't replicated it;
  Bosch's actual product portfolio mapped layer-by-layer against the
  stack, including the discovery that Bosch built and ran a real VPP
  control-room product once (Grid Optimization Manager) and let it lapse;
  revenue models; and concrete fundable pitch angles

**`uc3-submission/`** — the personal planning notes behind the UC3
(Policy as Code) schema proposal to IES:
- `FORM-ANSWERS.md` — the paste-ready text for IES's "Propose a Schema"
  form, and the personal decision checklist that goes with it (name/org
  to use, repo visibility, commit-author email, the superseded
  `myprotoiec` repo). The proposal repository itself is
  `github.com/Sanjay-dev22/ies-uc3-policy-as-code`, kept separate and
  public on its own
- `DEFENSE-PREP.md` — a rehearsal sheet for defending the proposal in
  review: what to say if the writing is challenged as AI-generated, a
  section-by-section plain-language script for `PROPOSAL.md` and both
  READMEs, answers for a non-technical questioner, the numbers to have
  memorized cold, the two open calculation questions worked through with
  simple numbers and analogies, every field in the raw tariff verified
  fresh against the live official source, and an honest answer on what's
  actually verifiable about whether IES built this idea themselves or
  only documented the direction
