# The case for a V2G reference implementation on IES/DEG

**Status: pre-build case, not yet a decision to build.** This document lays
out what's actually missing, why it's worth closing, and what a reference
implementation would concretely involve — so a build/no-build call can be
made before committing time, the same way UC3 was scoped before it was
built.

---

## 1. What's actually missing — precise, not "V2G doesn't exist"

It's tempting to say "IES/DEG has no V2G support." That's not accurate, and
overclaiming it would be the same mistake corrected earlier in the UC3
work. The precise picture, verified directly against the `ies-specs`
branch source (not assumed):

**What already exists, real and detailed:**

| Piece | Where | What it actually contains |
|---|---|---|
| Resource capability model | `specification/schema/EnergyResourceEVCharger/v1.1/` | A real type discriminator: `EV_CHARGER` (one-way) vs **`EV_V2G`** (bidirectional). Fields for `maxImport`/`maxExport`, `connectorType`, `controlProtocol` (including `ISO_15118_20`), and `v2xProtocol` (`CHAdeMO_V2G`, `CCS_BPT`, `ISO_15118_20_AC_BPT`, `ISO_15118_20_DC_BPT`) — correct, current V2G engineering terminology, not placeholder text. |
| Control-rights / consent model | `specification/schema/EnergyProgramEnrollment/v2.0/` | A W3C Verifiable-Credential-based enrollment flow with a named consent type, **`DER_CONTROL`** — exactly "consent to control DER devices for demand response" — plus credential verification, conflict detection, and revocation, all already built generically for any DER. |
| Settlement mechanism | `devkits/demand-flex/` (or `P2P_Trading`) | A complete, running flow: utility posts a flexibility need, an aggregator commits capacity, real interval-level settlement math (OPA/Rego policy) pays out based on metered baseline-vs-actual. Technology-neutral — never named "V2G," but functionally identical to it. |

**What's confirmed absent, by direct search of every example file in the
repository, not by assumption:**

- `EV_V2G` is never used as a `type` value in any actual protocol message
  anywhere — only inside the schema-definition files themselves.
- `DER_CONTROL` consent appears in exactly one real example, and in that
  one instance it is explicitly declined (`"granted": false`, *"not
  applicable for this enrollment"*). It has never been exercised as
  granted.
- The Onboarding implementation guide gives every other persona (single
  household, multi-meter, rooftop-solar prosumer, etc.) a full narrative
  walkthrough — section **11.8, "Prosumer – EV with V2G," is one
  sentence**, with no message flow.
- The top-level `The_Vision.md` names Vehicle-to-Grid as "Illustrative Use
  Case #5" — i.e., an aspiration in the founding vision document, not
  something any implementation guide has since built out.

**The actual gap, stated precisely:** the pieces needed for V2G are real
and well-designed. Nobody has ever demonstrated them working together —
`EnergyResourceEVCharger` (`EV_V2G`) enrolled via `EnergyProgramEnrollment`
(`DER_CONTROL`, actually granted) participating in a real settled
flexibility event. That composition has never been built, tested, or
documented anywhere in this repository.

---

## 2. Why it matters

**Technical/standards reason.** An unexercised schema composition is a real
risk for exactly the reason Tariff Intelligence itself exists to prevent:
two different teams implementing "V2G on IES" independently, both
technically schema-conformant, could easily diverge — one team's
`EV_V2G` enrollment flow might not compose cleanly with another's
settlement assumptions, because nothing has ever forced the composition to
actually run end-to-end. Proving it once, publicly, removes that ambiguity
for everyone who builds on it after.

**Timing/market reason** (from prior research in this thread, not
re-derived here): the EU's AFIR regulation mandates ISO 15118-20
(bidirectional-capable) charging infrastructure for all new/refurbished
public and private chargers from 1 January 2027 — a real, near-term forcing
function, not a speculative one. Separately, a GM-commissioned study (E3)
found V2G could deliver 5–15x more value per vehicle than one-way managed
charging, projecting roughly $7B of V2G value potential in the US alone by
2030 — while explicitly noting that capturing that value is currently
gated by unresolved regulatory and tariff-export barriers, not technology.
IES/DEG closing its own V2G composition gap removes one of those barriers
on the India side, ahead of most other markets.

**Position reason.** A company already selling EV charge-communication
control units, power electronics, and fleet-charging software (verified
earlier in this thread to be Bosch's real, current product line) is
better positioned than most to actually build and validate this
composition, because it already has real hardware/software touching both
ends of the flow — the EVSE side (`EnergyResourceEVCharger`) and the
fleet-management side (the aggregator/BAP role).

---

## 3. What we'd build — scoped, mirroring how UC3 was actually built

**Not** a new schema, and **not** a new protocol. The proposal is a
reference implementation proving an existing, unmodified composition of
three already-real schemas works end to end, plus documentation of the
missing narrative (filling in what section 11.8 currently leaves as one
sentence).

Concretely, in the same shape as the UC3 prototype:

1. **Author a real `EnergyResourceEVCharger` object**, `type: EV_V2G`,
   with real `maxImport`/`maxExport` and `v2xProtocol` values — unmodified
   schema, just populated for the first time in a working example.
2. **Run it through `EnergyProgramEnrollment`**, actually granting
   `DER_CONTROL` consent (not declining it, as the one existing example
   does) — proving the consent/control-rights handshake actually
   completes, not just that the field exists.
3. **Enroll it as a resource inside a real Demand Flex flow** (reusing the
   already-working `devkits/demand-flex/` sandbox we already have running
   experience with) — a utility posts a flex need, the enrolled `EV_V2G`
   charger's capacity is offered and committed.
4. **Run a real settlement** — actual baseline-vs-actual metering math
   producing a real payout, proving the existing rego settlement logic
   correctly handles an EV-charger resource, not just a generic meter.
5. **Document the composition** as the missing narrative for Onboarding
   section 11.8 and, if warranted, propose it back through the same
   "Propose a Schema" / Contribute-to-IES channel used for UC3 — this
   time as a worked example and integration note, not a schema change.

**What this explicitly does NOT require:** no new schema fields, no
changes to `EnergyResourceEVCharger`, `EnergyProgramEnrollment`, or the
Demand Flex settlement policy. Everything above is composition and proof,
using pieces that already exist untouched — the same "don't touch the
core schema" discipline that shaped the UC3 proposal.

---

## 4. Honest scope check before committing build time

- This is real, buildable work of a similar shape and size to the UC3
  prototype — not bigger, not smaller in kind, just a different
  combination of existing pieces.
- Like UC3, the "Contribute to IES" channel this would ultimately feed is
  non-commercial — a public schema/example review process, not a paid
  contract. The commercial upside, if any, is the same as what was mapped
  earlier for a company like Bosch: being the technology vendor/aggregator
  who can point to a *proven* composition when utilities or fleet
  operators start asking "does this actually work" — not a payment for
  the reference implementation itself.
- The one thing not yet verified and worth confirming early if this goes
  ahead: whether the Demand Flex settlement math (baseline minus actual)
  correctly handles a meter reading that goes *net negative* (true
  discharge) rather than just curtailment down to zero — flagged as an
  open technical question in the prior research, not yet tested.

---

## 5. Decision point

If this case is convincing enough to proceed: the next step is the same
one taken for UC3 — stand up the Demand Flex devkit sandbox, author the
`EV_V2G` resource and granted `DER_CONTROL` enrollment, and prove the
composition end to end against real running software, before writing any
proposal back to IES.
