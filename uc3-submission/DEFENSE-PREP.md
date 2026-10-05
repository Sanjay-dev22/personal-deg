# Tomorrow — defense prep, UC3 Policy as Code

Read this once tonight, skim it again in the morning. It's built to be answered from, not read aloud.

---

## First, the one thing to hold onto

"Sounds AI-generated" is a comment about *sentences*, not about whether the work is real. Nobody can fake "two independent programs, in two different languages, computing the identical bill across six scenarios, re-verified live over a real network, with an independent validator logging a clean pass." That's not prose style — that's a thing that either happened or didn't, and it happened, repeatedly, under test. Say that plainly if the accusation gets personal. You don't need to be defensive about it; you need to be matter-of-fact.

---

## A. If someone opens with "this reads like AI wrote it"

Say this, close to verbatim:

> "The writing style did have some tells, fair point, and I've already rewritten the prose throughout, it should actually read differently now. But I'd separate that from the content: every number in here, I can reproduce live right now, in front of you, from a fresh clone, in under two minutes. Want me to run it?"

Then actually offer to run `npm test` live if they'll let you — this converts the conversation from "defend the writing" to "watch the proof," which is the strongest position you have.

If they push further ("but did *you* write this, or did AI"): be honest, don't over-explain. *"I used an AI assistant to help build and write this up, the same way I'd use it to help write code or docs for any real project — but every claim in it is something I tested myself, and I can show you exactly how, right now."* That's a true, complete answer. Don't apologize past that point.

---

## B. The thing to lead with if you want to go on the front foot

This is new, and it's a genuinely strong card: **this morning, I re-checked this proposal against IES's own actual term taxonomy on GitHub** (not a summary, the real file) **and found one real inconsistency myself — our proof block called its signature field `signatureValue`, but IES's own `ElectricityCredential` schema already uses `proofValue` for the exact same thing. I renamed it, re-ran the full test suite, it still passes clean.** That's the opposite of AI-generated carelessness — that's exactly the kind of cross-check a careful engineer does. Lead with this if you get a chance; it directly answers "did you actually research this or did a model just generate something plausible-sounding."

---

## C. Walking through `PROPOSAL.md` — what to say for each part

**Title / opening two sentences** — *"This adds one small object next to the existing tariff data: who published it, what currency, what it replaces. Nothing inside the original tariff changes."*

**Decisions table (A–F)** — *"These are the six concrete things I'm asking IES to agree to or weigh in on. A, B, D are things I built and am confident in. C, E, F are genuine open questions where I'm asking them to decide, not telling them the answer."*

**§1 Scope and Purpose** — *"IES's own documentation already admits it has no way to say who published a tariff, in what currency, or what it replaces. I didn't find that gap — they wrote it down themselves. I'm proposing one concrete design to fill it."* If asked "where does it say that" — point at §8.4 of IES's own overview, quoted directly in the note.

**§2–§4 (What it records / how identified / definitions)** — *"This is just precisely defining the three or four new fields, using IES's own existing ID patterns, not inventing anything new there."*

**§5 Basis of Standards** — *"Everything here rides on existing, named standards — W3C's identity standard, a signature standard, ISO currency and date codes. Nothing custom except where I say so explicitly."*

**§7–§9 (Schedule I / II)** — *"This is the formal field table IES's own template requires — every field, its type, whether it's required. Schedule II just says: this record doesn't change after it's issued, so there's nothing to track there."*

**§10 How It Fits Together** — *"This is the whole flow in one line: a regulator signs a tariff, it travels over the same network IES already uses, and anyone receiving it can check who signed it and that nothing was altered."*

**§11.1 (the ₹40 difference)** — this is your best concrete, memorable number. *"The schema says a surcharge is a percentage — but doesn't say a percentage OF what. I built an actual calculator both ways, same policy, same usage, and got two different real bills: ₹2,474.40 one way, ₹2,434.40 the other way. That's not a typo risk, that's a real ₹40 difference on one bill, multiplied across every customer, if two billing systems each guess differently."*

**§11.2 (slab boundaries)** — *"This one I found the hard way: my own first version of this had the exact same bug, and it misbilled a real test case because its own test suite only ever checked a round number, 100 kWh, and the bug was in unit 101. I caught it, fixed it, and now the tests explicitly cover the broken case."* This is a genuinely good story to tell plainly — it shows real debugging, not polish.

**Annexure B (example payload)** — *"This is real output, not illustrative text — I regenerated it again this morning after the proofValue fix, so the timestamp and signature you see are from an actual run a few hours ago."*

**Annexure C (verification)** — this is your strongest section. *"I ran the full signed round trip against the real, live sandbox software this ecosystem actually uses, not a mock. It surfaced two real bugs, both typos in a schema URL, which I found, fixed, and reproved by fetching the corrected URL directly. After that, the bill matched, the signature verified against the real transmitted data, and IES's own independent validator — code I did not write — logged a clean pass."*

---

## D. Walking through the READMEs

**Top-level `README.md`** — *"This is the entry point: three commands, `npm install`, `npm test`, done. Anyone can clone this and get the same result I did, cold, no setup beyond Node and Python."*

**`sandbox-reproduction/README.md`** — *"This is the heavier, optional proof — the live network round trip. It's kept separate deliberately, so nobody has to install Docker just to check the maths."*

If asked "why two READMEs" — *"One is the thing everyone should run. The other is the thing that proves it also survives a real network, for anyone who wants to go that far."* Simple, no hedging needed.

---

## E. Plain-English answers for someone who knows nothing about this

- **"What even is this, in one sentence?"** — *"Right now, when a regulator sets an electricity price, it's a PDF, and every computer system that needs that number has a person retype it by hand. I'm proposing a way to publish it once, digitally signed, so every system reads the exact same number automatically."*
- **"What's a signature doing in here?"** — *"Same idea as a signature on a cheque — it proves who actually issued this, and that nobody changed a number after the fact."*
- **"Why does it matter if two systems calculate slightly different bills?"** — *"Because it's real money, on a real customer's real bill, computed two different correct-looking ways. That's the actual problem this whole effort exists to prevent."*
- **"Is this actually running somewhere, or just on paper?"** — *"It's running. I can start it from nothing, on a machine that's never seen it before, in about two minutes, and show you the exact same bill amount every time."*
- **"Did you build this alone?"** — *"Yes, with the kind of coding-assistant tools that are now normal for this kind of work. The design decisions, the testing, the real debugging, and the actual verification runs are mine."*

---

## F. Numbers to have cold, no hesitation

- Headline bill: **₹2,434.40** (6 real scenarios, 2 independent programs — Node and Python — agreeing on all of them)
- The ambiguity found: **₹2,474.40 vs ₹2,434.40**, a real ₹40.00 difference, same policy, same usage
- **3** schema gaps IES already admits are open (issuer, proof, currency/replaces) + **2** calculation questions this work found that nobody had written down before
- **5** tamper tests, all correctly rejected (slab price, currency, replaces, issuedAt, wrong key)
- Live round trip: **2 real bugs found and fixed** (both schema-URL typos), confirmed against the real devkit's own fixtures

---

## F.1 One sharp question nobody's asked yet, but might

**"Policy as Code already exists as a use case — why did you write a whole new concept note instead of just a smaller schema extension?"**

Checked this directly against the real repo: IES's own published use-case list (`use-cases-overview/`) has exactly five files — Consumer Energy Passport, Consumer Meter Digest, DER Visibility, P2P Energy Trading, Smart Meter Data Exchange. **Tariff Intelligence isn't one of them yet** — it's still explicitly a draft (the URL we cite literally says `draft-work-in-progress`, and IES's own overview page still carries a "🚧 Work in progress" tag).

Answer: *"Tariff Intelligence isn't actually one of IES's five published use cases yet — it's still a draft, by their own labeling. Their own checklist says anything that isn't yet a published use-case overview counts as new, and needs a full concept note to explain it. So this is exactly the right weight for where Tariff Intelligence currently stands, not an over-built response to a small gap."* This is now a fact you can point at directly (the five-file list), not just reasoning — stronger than how I'd framed it for you before.

---

## H. The underlying concepts, in plain language

**ISO 4217 / ISO 8601** — just "pick one universal format and don't invent your own." ISO 4217 is the 3-letter currency code list (`INR`, not "Rs" or "₹" — `npm test` literally rejects `"rupees"` as invalid). ISO 8601 is the one unambiguous date/time format (`2026-10-05T17:33:07.637Z`) — without it, "01/10/2026" means two different dates depending on which country reads it.

**W3C DID Core** — a standard for an identity that doesn't need a central authority to vouch for it. A DID like `did:web:ies.merc.example` resolves to a small JSON file (a "DID document") holding a public key. `did:web` specifically is the simplest version: the identity *is* a domain name, the DID document is just a file hosted at `https://<domain>/.well-known/did.json`. Whoever controls the domain controls the identity — no blockchain, no special infrastructure. This is the mechanism that answers "who actually signed this tariff, and how do I check" — exactly what IES's own docs say should happen ("resolve the signer from the signed envelope").

**W3C Data Integrity** — a standard shape for a tamper-evident signature block: `type`, `created`, `verificationMethod`, `proofPurpose`, plus the signature itself. This is precisely the shape we use, and — found this week — precisely the shape IES's own `ElectricityCredential` schema already uses. `eddsa-jcs-2022` is one specific recipe under that standard: Ed25519 signatures (`eddsa`) over a JSON document first squeezed into one single, unambiguous byte sequence (`jcs`, JSON Canonicalization Scheme), since the same JSON data can be written in different ways (spacing, key order) while meaning the same thing — canonicalization fixes one exact byte sequence so signer and verifier always agree on what was actually signed. We say "modeled on it, not conformant" because the real spec wants a specific signature encoding (multibase) and a full canonicalizer; we used plain base64 and a simplified one. State that plainly if asked — it's a stated limitation, not a hidden one.

**`performanceAttributes.iesPublication`, precisely** — the transport (Beckn protocol) wraps delivered data in a `DatasetItem`, which has a general "extra details" bucket called `performanceAttributes`. Many different kinds of data share that same bucket, each under its own field name. The actual tariff (`IES_Policy`, untouched) already goes into `performanceAttributes.dataPayload` — that part is IES's own existing design, not ours. What we added is a second field right beside it, which we named `iesPublication`, carrying the new signed wrapper. We picked that name ourselves, and §11.6 says so explicitly — it's a proposal, not a confirmed location, and whoever owns the `DatasetItem` schema should have the final say.

**§11, the full list, in one line each:**
1. (§11.1) What's a surcharge a percentage *of* — marginal slab rate or blended average? Real ₹40 difference either way.
2. (§11.2) Where do slab boundaries actually fall — the schema's literal wording leaves a gap the real-world reading doesn't.
3. (§11.3) Should currency live in our envelope forever, or become a real `IES_Policy` field eventually? IES's call.
4. (§11.4) Is using `replaces` informally, before IES formally governs it, actually the right interim move? Asking them to confirm.
5. (§11.5) Which *real*, fully standard proof suite should a production system use instead of our simplified one?
6. (§11.6) Is `iesPublication` the right name/location, or should the `DatasetItem` owners put it somewhere else?
7. (§11.7) Key rotation and revocation aren't addressed at all yet — flagged, not solved.

**Navigating `§` references, if someone asks you to "show" one:** any `§11.1` through `§11.7` is *this file* — scroll to `## 11. Points for Confirmation`, you can point at it directly. Anything written as `§8.4`, or "`§N of the overview`" (§3, §6, §11 *without* a decimal), is IES's own external Tariff Intelligence overview page, not this file — have that page open in a second tab. One real trap: Decision D cites "§11 of the overview," which is IES's external page's own section 11 (about amendment convention) — a completely different section than our own `§11` (Points for Confirmation). Same number, two unrelated documents. If asked, just say so plainly — it's a coincidence of numbering, not a contradiction.

---

## J. The raw tariff, field by field — verified fresh against the live source (6 Oct, the night before)

Pulled directly from `beckn/DEG`'s real repository that night, not from our own code, to confirm zero drift:

| Field | Real value | Plain meaning |
|---|---|---|
| `id` | `"policy-mumbai-res-001"` | This *specific version's* unique ID — changes every amendment |
| `policyID` | `"MUM-RES-T1"` | The *stable* handle for "this tariff" — stays the same across amendments |
| `policyName` | `"Mumbai Residential Telescopic 2024"` | Human-readable name |
| `policyType` | `"TARIFF"` | What kind of policy this is |
| `createdDateTime` / `modificationDateTime` | timestamps | First created vs. last touched |
| `programID` | `"program-merashehar-001"` | Which broader program this belongs to |
| `samplingInterval` | `"R/2024-04-10T00:00:00Z/P1M"` | Billing re-samples monthly |
| `energySlabs` | 3 bands | ₹4.50 (0–100), ₹7.20 (101–300), ₹9.80 (301+) |
| `surchargeTariffs` | 2 adjustments | +20% evening (18:00–22:00), −10% night (23:00–05:00) |

Also fetched fresh that night, word for word, matching `PROPOSAL.md`'s quotes exactly: `start` is *"Energy consumption start point (inclusive) in kWh"*, `end` is *"Energy consumption end point (exclusive) in kWh. Null for infinity"*, surcharge `value` is *"The adjustment value (percentage or absolute)."* Nothing has changed upstream since. If asked "is this still accurate," the honest answer is: checked the night before, byte-for-byte identical.

**§11.1, the simplest possible numbers** (use this if the real 350 kWh example doesn't land): customer uses 150 kWh — 100 kWh @ ₹4.50 (₹450) + 50 kWh @ ₹7.20 (₹360) = ₹810 total, so their *average* rate is ₹810 ÷ 150 = ₹5.40/kWh. Say 30 of those kWh were in the evening surcharge window, and they happened to be the last 30 (inside the ₹7.20 slab). Is the +20% calculated on ₹7.20 (that slab's real rate) or ₹5.40 (their overall average)? Reading (a): 30 × 20% × ₹7.20 = ₹43.20. Reading (b): 30 × 20% × ₹5.40 = ₹32.40. **₹10.80 different, on this tiny example alone.** The analogy that lands: *"A phone plan says evening calls cost 20% extra — 20% extra on your normal rate, or 20% extra on whatever price tier that specific call fell into? Both are normal readings of the same sentence."*

**§11.2, addressing "but they clearly wrote 0–100 and 101–300, what's confusing":** the trap isn't the example numbers, it's the *rule* behind them. The rule says `start` is inclusive, `end` is exclusive. So slab 1 (`0`–`100`) literally covers kWh 0 up to *but not including* 100. Slab 2 (`101`–`300`) covers kWh 101 up to *but not including* 300. So: **which slab does kWh 100.5 belong to?** Slab 1 stopped before reaching it; slab 2 hasn't started yet. Taken completely literally, it belongs to *neither* — a real gap the written rule creates, even though a human reading "0–100, 101–300" assumes no gap at all, like a tax bracket. This is a real test case in the repo (`usage-fractional.json`, exactly 100.5 kWh), not a hypothetical.

**"Did IES actually build this, or just write the theory?"** — honest answer, say it exactly this way: *"I can't verify that either way, and I won't guess. What I can verify directly from their own public repo: they named the gap and a direction, but I can't find an actual working implementation of it anywhere on their side. That doesn't prove they haven't built one privately. What's true regardless: we built and tested a concrete version of their own named idea, and they haven't published one."*

**"So is any of this permanent, or just temporary scaffolding?"** — honest answer: *"Temporary, by IES's own words — their own phrase is 'until a governed upstream field exists.' Right now `IES_Policy` has no official issuer/proof/replaces fields, so our envelope sits beside it as a stand-in. Whether it stays that way permanently or gets folded into `IES_Policy` itself later is explicitly one of the things we're asking IES to decide — that's §11.3 and §11.4. I'm not claiming to know their long-term plan; naming that uncertainty honestly is what a concept note is supposed to do."*

---

## K. A few more spots in `PROPOSAL.md` that haven't been walked through yet

**`policyID` vs `id` — if asked "aren't these both just IDs?":** `policyID` (e.g. `MUM-RES-T1`) is the tariff's *name tag* — it never changes, even when the tariff is amended five years later. `id` (e.g. `policy-mumbai-res-001`, or in §3's example `urn:ies:policy:serc:RES-T1:2026-04`) is *this specific version's* tag — a new one every amendment. `publication.replaces` holds the *previous version's* `id`, never the `policyID` (Decision D is explicit about this). Analogy: `policyID` is like a book's title ("Mumbai Residential Telescopic Tariff"); `id` is like a specific edition ("2024 edition"); `replaces` says which earlier edition this one supersedes.

**Decision B's "a party that re-publishes a signed policy inline" — what scenario is that, and why does it matter:** picture a DISCOM that takes the SERC's signed tariff and includes it, unchanged, inside its own catalogue listing (its own Beckn offer to customers). Because the signature covers the *whole* envelope (policy + publication together, not just the policy), that embedded copy is still verifiably the SERC's original, untampered — anyone checking it still resolves the same SERC signature, even though a DISCOM is the one actually distributing it. If we'd only signed `policy` alone, a DISCOM (or anyone) could silently swap the `currency` or `replaces` fields in their own copy without breaking the signature. This is *why* Decision B (whole-envelope signing) matters, not just a technical footnote.

**"Base64, not multibase" (§11.5) — what's multibase, in one line:** multibase is a W3C-standard way of writing binary data as text that also includes a one-character prefix saying *which* encoding was used (base64, base58, hex, etc.), so a verifier never has to guess. We used plain base64 with no such prefix — simpler to implement, but not what the full standard specifies. Low-stakes detail; just don't be caught flat-footed if asked what "multibase" even means.

**Key rotation and revocation (§11.7) — plain meaning if asked:** "rotation" means a publisher eventually changes their signing key (old keys can be compromised or just age out) — a real system needs a way to know *which* key was valid *when* a given policy was signed. "Revocation" means publicly declaring an old key invalid before its natural rotation, e.g. if it's been stolen. Our reference implementation only checks whatever key is in the DID document *right now* — it doesn't yet handle "this key was valid back then, but not anymore." Stated plainly as a known, unaddressed gap, not hidden.

**Decision F's quiet alternative — worth knowing it exists:** our fix changes how a slab's boundary is *read* (`start − 1` to `end`). But Decision F's own table cell mentions a second possible fix IES could choose instead: leave the reading convention alone and just *rewrite the official example's numbers* (e.g. `0–100`, `100–300` instead of `101–300`) so the boundaries actually meet. We didn't pick that path, but if someone asks "couldn't IES just fix their example instead of changing how boundaries are read" — yes, that's a real, legitimate alternative, and it's actually named in our own Decision F, not something you're inventing on the spot.

---

## I. If you genuinely get stuck on a question live

Say exactly this, and it's a completely legitimate answer: *"That's a fair question, I don't have the precise answer memorized right now, let me check and follow up."* That is a stronger answer than guessing or freezing. Reviewers trust "I'll verify and get back to you" far more than a shaky improvised answer — it's what a careful engineer actually says.

You built something real, verified it more times than most people verify anything, and found and fixed a genuine inconsistency the same morning someone questioned it. That's a good position to walk in from.
