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

**`p2p-energy-trading-review/`** — a full technical study and feasibility
review of the P2P Energy Trading use case, prepared for a team review with
both technical and non-technical attendees:
- `P2P-Energy-Trading-Study.pptx` — the full walkthrough: why the use case
  exists, who the real BAP/BPP/Ledger Provider roles actually are, why it
  isn't a crypto exchange, what's genuinely built in the real devkit today,
  the full gap inventory with severity ratings, direct quotes from the
  program's own status page, and a feasibility verdict with prioritized
  open questions for the team
- `P2P-Energy-Trading-Software-Gaps.pptx` — a dedicated deep-dive on the
  12 identified software gaps, built after re-verifying every one of them
  against the real, running devkit (Docker stack brought up locally, real
  trades sent through its actual signed/policy-enforced pipeline, not just
  a re-read of the code). One full slide per gap: the plain-language
  problem, the concrete conceptual fix, and an honest implementation-
  feasibility call (EASY / MEDIUM / HARD, with what it actually requires —
  pure code, an external DISCOM data source, or a multi-party governance
  decision), plus a 12-row feasibility-at-a-glance summary table. Also
  covers the conformance re-check result (zero false alarms), two genuine
  surprises a live run caught that a static read hadn't (a stale policy
  URL in the devkit's own README, and a real ₹0.01/kWh trade proven to
  clear every check with no price-sanity rejection), and a prioritized fix
  list. The full written feasibility study and gap-by-gap markdown live in
  the separate `github.com/Sanjay-dev22/p2p-grid-feasibility` repo
- `DEG-IES-Market-Reality-Decision.pptx` — a sponsorship/feasibility
  checkpoint deck prepared for a leadership decision session: scores all
  four workstreams (UC3, V2G, P2P Trading, Nharuvi identity) honestly
  against what's actually built vs. actually decided; maps the real P2P
  market (stuck at pilot scale globally for a decade, but live and
  regulator-backed in India via DERC/UPERC); names the competitor already
  shipping three of our four workstreams in production (Pulse Energy) and
  a peer company's same-week properly-sponsored equivalent (the Schneider
  Electric / Networks for Humanity MoU); includes a direct-verification
  follow-up pass fetched live in a later review (six DISCOM-authorized P2P
  trading apps confirmed with real registration flow and app-store links,
  the official India-Energy-Stack and beckn/DEG GitHub orgs checked for
  hidden/abandoned code, and the project's own storage/commitmentType
  schema gap re-confirmed as still open against the live v2.0 schema
  pulled directly from beckn/DEG); and closes with four questions
  for leadership and a named set of decision options (A–D)
- `DEG-IES-Beckn-Live-Reality-Briefing.pptx` — an 18-slide, externally-
  sourced market briefing, built to be read or presented cold: every slide
  cites a direct link (a DERC/UPERC order, a press report, an official
  DISCOM page, or a GitHub file) rather than internal project history.
  Covers the live national P2P trade demo (REC Limited, 19 Feb 2026), the
  DERC/UPERC regulatory orders and fees behind it, the 1,164-trade
  scoreboard and its extension to March 2027, the real registration flow,
  all six DISCOM-accredited trading apps with app-store links, Pulse
  Energy's three simultaneous live programs (P2P trading, Unified Bharat
  eCharge EV charging, demand flexibility), the Schneider Electric /
  Networks for Humanity MoU (30 Sept 2026), both public GitHub orgs behind
  the spec, the still-open EnergyTradeOffer v2.0 schema gap shown as raw
  YAML, and a global P2P-trading and V2G track record check. Closes with
  four honestly-scored directions (build a trading app, contribute to the
  open schema, pursue V2G, or stop) tagged by real value type — money,
  capability/standing, or neither — and the specific questions needed to
  choose between them. Speaker notes are written as a literal, word-for-
  word script for direct cold reading, not a reminder of talking points

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
