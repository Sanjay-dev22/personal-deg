# Work Record — Weekly Summary (14 Aug – 15 Oct 2026)

## Week 1 (14–20 Aug) — DEG/IES research, UC3 chosen and prototyped

- Read the full DEG (Digital Energy Grid) proposal paper and its supporting protocol documentation end to end
- Understood: DEG is not a product/company — a proposed open protocol for the power sector, authored by the same group behind Aadhaar/UPI/ONDC's original design, with the International Energy Agency
- Understood the core problem: grid shifting from one-way/centralized to two-way (rooftop solar, EVs, batteries), but utility software, subsidy systems, and regulation were never built to coordinate this
- Verified scale with real public figures: 429% projected growth in India's rooftop solar by 2035; ~$100B lost yearly worldwide to blackouts; 748.5M people globally with no electricity access; 250M smart meters being deployed across India
- Read a real Indian government draft policy (National Electricity Data Sharing Framework, 2026) — independently proposes similar standardized data-sharing ideas
- Researched India Energy Stack (IES) — the real government programme (Ministry of Power, via REC Limited) building DEG for real, as national digital infrastructure
- Found IES already has real, proven pilots: 4 DISCOMs (UP, AP, Gujarat, Maharashtra) demonstrated live use cases in a government-run challenge; a real inter-state P2P solar trade (a farmer near Meerut to a shop in Delhi) shown publicly at a national summit
- Went through IES's own published devkits and example use cases in detail — 8 named use cases total, found 5 already claimed/piloted by others
- Selected Use Case 3, "Policy as Code / Tariff Intelligence," as the one open, unclaimed use case worth pursuing hands-on
- Found UC3's real published data structure explicitly marked "work in progress" by IES itself, with acknowledged gaps: no signature/issuer field, no currency field, no defined amendment process
- Built a first working prototype: signed/verifiable tariff data, plus two independent billing calculators (JavaScript + Python), tested against 4 real billing scenarios — both agreed exactly every time
- Found one further real gap myself, not documented anywhere: how a time-of-day surcharge interacts with tiered pricing
- Set up IES's own official test network locally and ran a real message exchange through it successfully — confirmed it reaches other real, independent participants already using it
- Replaced an early placeholder response with a fully live signing backend, verified working in real time
- Drafted (did not submit) the information needed for IES's own formal contribution process

## Week 2 (21–27 Aug) — First team presentation, claims verified, first V2G look

- Built and presented the first formal team presentation introducing the UC3 opportunity and concept from scratch
- Reviewed every claim before presenting — caught and corrected an inflated gap count (3 of 4 gaps were already IES's own documented ones, only 1 was genuinely found independently) and a conflated explanation of two different cryptographic signing layers
- Caught and removed one incorrect settlement figure that had been used as a placeholder before being cross-checked
- Reproduced the full technical setup on a second machine successfully, ahead of presenting live
- Took a first look at Vehicle-to-Grid (V2G) in the IES materials — found only a named category, no working example flow anywhere
- Decided to pause UC3 after concluding there was no clear commercial angle in this specific niche — kept the finished, working prototype as a real, demonstrated result
- Later reconsidered and made the finished UC3 work available as a completed technical contribution, after a final review pass fixed a few minor leftover issues

## Week 3 (28 Aug – 3 Sep) — V2G researched, real network identity built

- Researched V2G in real depth — found the network's existing general-purpose flexibility mechanism could technically carry an EV charger as a resource, but no one had built a real V2G-specific example flow anywhere
- Wrote a clear case document scoping V2G explicitly as a proposal to evaluate, not yet a decision to build
- Did real market research: major automotive suppliers already sell real bidirectional EV-charging hardware today; EU regulation mandates bidirectional-capable public chargers from January 2027
- Registered a real, independent, cryptographically verifiable identity on the live network using a personally-owned domain — went through the official registration process (domain ownership proof, real cryptographic keypairs, directory registration)
- Solved real obstacles along the way: a domain-verification restriction, a website redirect that was breaking identity resolution, and a genuine signing-scheme discrepancy resolved by reading the actual reference software's source code
- Built and deployed real signature-verification logic; proved it with a real signed self-test (a valid message correctly accepted, a deliberately tampered one correctly rejected)
- Found that holding a verified identity is not the same as being a member of any specific trading network on it — comparable to a passport without a visa
- Created a new, independent trading network under the same identity via the self-service path; investigated why new members weren't showing as formally recognised — concluded one further, undocumented setup step was likely needed, and flagged it for the network operator's own support channel
- Built and refined, over two rounds of direct team feedback, a second team presentation on V2G — from a broad, technical first draft to one focused on a single concrete scenario, then a further deep-dive on the EV-to-charger communication standard specifically, with every technical claim checked against the real published standard

## Week 4 (4–8 Sep, ongoing) — P2P energy trading built, tested, and demonstrated live

- Shifted to peer-to-peer (P2P) energy trading — a third real IES use case, already proven live within the government programme itself
- Evaluated the available reference implementations and selected the most current, complete one
- Set up the real, official test network locally and ran a complete live trade end to end: publish → discover → agree terms → confirm → settle — 7 real signed protocol messages, all successfully acknowledged, with the final payment (~₹437) computed automatically by policy
- Also tested a disallowed buyer deliberately — confirmed the network correctly and live rejects the trade with a specific, human-readable reason
- Independently confirmed the completed trade was genuinely recorded on a separate, real, externally hosted ledger — checked using different access credentials than the ones that originally wrote it
- Built a full interactive visual tool letting anyone click through all 31 real protocol messages in a complete trade, in plain language plus real technical detail, through several rounds of rebuilding based on direct feedback; published it live along with two companion written guides (one plain-English, one for technical/hands-on testing)
- Returned to the Week 3 identity work — read the network operator's full official documentation and confirmed exactly how network membership works, that it's backend-controlled (not self-editable), and the exact real process to formally request recognition
- Built a second, full interactive demonstration: two real web applications (a buyer platform and a seller platform) that a live audience can click through directly to publish, discover, buy, and settle a trade in real time
- Found and fixed real issues during this build: an inconsistent record-ID bug, a case where a real rejection reason was being silently swallowed and shown blank, and a missing way to look up an offer's ID when buying manually
- Tested the entire setup on a second, corporate-managed laptop — found and fixed a real installation compatibility issue and a genuine corporate-network configuration issue specific to that laptop
- Set up secure public internet access to the running system, since the corporate laptop could not reliably run the backend itself — also found and fixed a related bug where live dashboard updates silently stopped working once accessed over a secure connection
- Diagnosed and fixed a real bug in the offer-discovery mechanism, traced to three separate causes; confirmed the fix by retrieving dozens of real, currently live offers from the shared network, including several from other real, unrelated people also testing it
- Tightened purchase validation: price always comes from the seller's real published listing (never editable by the buyer); quantity is capped to what's actually available; both checks enforced on the interface and, independently, on the backend itself
- Built a further live view showing every offer currently on the shared network (own vs. others) alongside a real-time, independently ledger-verified record of completed trades
- Found and fixed a related gap: new trades were not yet reaching that same external ledger (only two smaller internal ones) — corrected it, and confirmed with a fresh, live, end-to-end trade that it now appears correctly on the real external ledger

## Where things stood (as of 8 Sep)

- **UC3 (Policy as Code):** built and proven working end to end; paused after finding no clear commercial angle for this specifically
- **V2G:** researched and scoped into a concrete, credible proposal; no prototype built yet
- **P2P Energy Trading:** fully built, tested under normal and adversarial conditions, and demonstrable live today, with independent cryptographic proof on a real external ledger

## Week 5 (9–17 Sep) — Trade negotiation and inventory-integrity hardening for the P2P platform

- Extended the trading platform to support real negotiation: counter-offers in either direction, a decline path, full visibility into each stage of a trade in progress, and an auditable delivery-confirmation step
- Identified and closed a data-integrity gap in available quantity tracking, which could otherwise have allowed the same listed inventory to be sold more than once — implemented real-time capacity tracking with automatic release on a declined counter-offer
- Corrected a related issue in how ownership of a listing was determined, improving accuracy of the "my listings" view
- Added real publish timestamps and fuller raw-data visibility to the dashboards, so every offer and trade genuinely shows when it happened

## Week 6 (17–21 Sep) — A short introduction to the department

- Gave the wider department a short introduction to the DEG/IES work so far; otherwise a quiet week

## Week 7 (21 Sep – 6 Oct) — UC3 picked back up and hardened for submission; a second trading platform built for flexible demand

- Gave a presentation to the wider team covering all the work so far — UC3, V2G, and P2P together — in plain, non-technical language
- Picked the UC3 (Policy as Code / Tariff Intelligence) proposal back up after it had been paused, and identified and corrected a billing-calculation defect in the reference implementation (slab-boundary handling), updating the worked example to the verified-correct amount
- Widened the cryptographic signature on the proposed tariff-publication format to cover the complete published record, closing a tamper-evidence gap in the original design
- Validated the UC3 reference implementation end-to-end against the live government sandbox network, identifying and correcting two schema-reference defects in the process
- Reviewed two independent third-party assessments of the UC3 proposal against primary source material; incorporated the findings that held up and set aside the one that did not
- Began a second, independent exploration of a government flexibility/demand-response trading pattern distinct from the main P2P use case: built an interactive explainer, a statistical pooling model, and a protocol-visualization tool, and corrected an earlier assumption about delivery-shortfall settlement by validating it directly against the governing policy engine
- Documented eight gaps in the P2P network's commercial and operational rules, each with a concrete proposed remediation, and built a representative power-flow model of a distribution feeder to assess physical-grid feasibility
- Delivered a full two-sided reference implementation of the flexibility-trading pattern — a utility-side and an aggregator-side platform, with a customer roster, live status tracking, and per-customer settlement allocation — validated end-to-end, including correction of a settlement-fairness defect found during testing

## Week 8 (6–9 Oct) — Live validation of the P2P gap analysis; feasibility study presented

- Conducted a full live re-validation of the previously-identified gap list against the real, running trading network: ten of twelve findings were confirmed unchanged, one was confirmed exploitable in practice (a trade cleared at an implausible price with no safeguard in place), and two were found to already be better mitigated than originally assessed
- Presented the findings to the team, including several non-technical members, walking through what was confirmed and why it matters
- Conducted external research confirming that peer-to-peer energy trading, as represented in this programme, reflects genuine international precedent rather than a theoretical concept, and reconciled the findings against a specific real-world case study

## Week 9 (13–14 Oct) — Additional gaps identified; critical fixes implemented, validated live, and demoed

- Documented twelve additional operational and commercial gaps in the trading network, bringing the full documented set to twenty-four, supported by relevant real-world precedent for the most significant risk category
- Implemented and validated, against the live network, fixes for the four most significant previously-identified gaps: a genuine financial penalty for under-delivery, a price-sanity band closing a previously-demonstrated pricing exploit, an exemption for genuinely weather-dependent commitments, and real cross-utility wheeling charges on both sides of a trade
- Walked the team through a live before-and-after comparison, showing the system with and without these fixes
- Identified the strongest candidate among the newly-documented gaps as the absence of a capability to pool many small producer offers into a single bundled offer for a large buyer — assessed as the most commercially significant opportunity identified in the review to date
- Diagnosed and resolved an environment issue affecting the live demonstration following a routine restart, and produced a standing technical reference to support faster recovery in future

## Week 10 (14–15 Oct) — Demand-aggregation capability built, hardened, and assessed for rollout readiness

- Delivered a first working aggregation capability: small producer offers can be pooled into a single larger block for a bulk buyer, with settlement correctly allocated back to each contributing producer in proportion to their own terms
- Identified and closed two gaps surfaced through live use: insufficiently specific error messaging, and a data-integrity issue that could have allowed resale of inventory not genuinely belonging to the aggregating party
- Redesigned the capability so a pooled offer operates under its own distinct market identity, fully separated from any individual producer's own listings — consistent with how real-world demand-response aggregation is structured (benchmarked against published international precedent, including US FERC Order 2222 and the UK's flexibility-market design)
- Added demand-first matching: a large buyer can now state a specific requirement (quantity and a maximum acceptable price) in advance, which the capability matches against available supply, rather than assembling supply speculatively
- Extended the large-buyer role to transact directly under its own identity, closing a structural gap in the original design where a separate intermediary platform was completing the purchase on its behalf
- Conducted a rigorous validation pass and identified and closed four further issues: a demand requirement that could become permanently unfulfillable if initially under-supplied; a possible double-allocation of the same producer offer; a pricing control gap where the bundled price was not checked against the buyer's own stated ceiling; and an overly strict safeguard that incorrectly blocked a legitimate follow-up contribution to an existing pool. Validated the complete corrected flow live, including a scenario where a requirement is only partially met initially and completed later as further supply becomes available
- Completed a sourced assessment of what is genuinely still required for this capability to operate at national scale — real metering integration, participant identity verification, a real settlement mechanism, a dispute-resolution process, and a defined regulatory position for the aggregator role itself — benchmarked against an actual national pilot of this pattern already demonstrated in February 2026

## Where things stand (as of 15 Oct)

- **UC3 (Policy as Code):** hardened to submission-ready standard in a clean project structure, with every known defect corrected and independently re-verified; formal submission is still pending
- **V2G:** unchanged from Week 3 — researched and scoped, no implementation started
- **P2P Energy Trading:** the core platform, a second flexibility-trading variant, and a demand-aggregation capability are all built and validated against live, adversarial conditions; a comprehensive gap analysis (24 items) has been conducted and independently re-verified, with the four most critical items remediated; a rollout-readiness assessment has been completed against real external benchmarks
- **Supporting work:** presentation materials for all of the above have been finalized and delivered, along with a standing technical reference and supporting demonstration tools
