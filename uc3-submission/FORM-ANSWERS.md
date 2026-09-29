# UC3 — IES "Propose a Schema" submission pack

Not for publication. Holds your personal decisions and the exact text to paste
into IES's form. The proposal itself is `ies-uc3-policy-as-code/PROPOSAL.md`.

Form: https://forms.gle/ESVk4PDcfEerPo6f7 (same form as the one you pasted; verified
by following the redirect). Process: https://india-energy-stack.gitbook.io/docs/propose-a-schema

**How it works, from IES's own pages:** submitting creates a **public** GitHub issue
in `India-Energy-Stack/ies-accelerator` (label `schema-proposal`) containing every
field below *except* email and mobile, which stay private to the IES secretariat.
Then roughly four weeks: open comments (weeks 1–2) → expert review (week 3) →
architecture review → authority review → publication. No GitHub account is required.
Nobody can promise acceptance; reviewers may ask for changes.

---

## Before you submit — decisions only you can make

1. **Name and Organization** are required and become public. Use whatever you are
   comfortable having on a public issue. If this is your own work, "Independent"
   or your own name is fine. Do not enter an employer's name unless they have
   agreed to it.
2. **Confirm the repo is public and paste its URL below.** You've pushed
   `ies-uc3-policy-as-code` — reviewers need to be able to open it without an
   account, so double-check its visibility on GitHub if you're not certain, then
   fill in the exact URL in "Any additional material" below.
3. **Your email is in the commit history if you used it as your git author
   identity.** Run `git log --format="%an <%ae>"` in the repo and check what it
   shows; if it's your personal address and you'd rather it not be public,
   switch to GitHub's no-reply address for future commits (this can't be
   changed retroactively without rewriting history).
4. **The older public repo `Sanjay-dev22/myprotoiec`** still holds an earlier,
   superseded version (different headline number, the slab-boundary bug,
   policy-only signing) if it's still up. Anyone who finds it will see numbers
   that disagree with this proposal. Consider archiving it or adding a line at
   the top of its README pointing to `ies-uc3-policy-as-code`.

## Repository

`ies-uc3-policy-as-code` — a from-scratch, formally structured reference
implementation (not a copy of an older prototype): `PROPOSAL.md` in IES's own
concept-note template, a top-level `npm test` proof (signature verification,
schema conformance, tamper checks, two independent billing evaluators across
six scenarios), and a separate `sandbox-reproduction/` proof run end to end
against the real, live `beckn/DEG` devkit sandbox. Headline number: **₹2,434.40**
on the reference scenario. Every claim in the form fields below matches what's
in the repository today — verified in an isolated copy immediately before
submission.

---

## Form fields — paste these

**Name** — (your decision, see above)

**Organization** — (your decision, see above)

**Contact email** — (private; only the IES secretariat sees it)

**Contact mobile number** — optional, private

**Use case the proposed schema supports**

Policy as Code (sub-use-case: Tariff Intelligence, IES/TI-PROFILE/0.5)

**Description and background**

This proposes an additive `publication` envelope for `IES_Policy`, and asks IES to settle two calculation questions that the schema leaves open. It changes no field inside `IES_Policy`, `EnergySlab` or `SurchargeTariff`.

IES's own overview (§8.4, "Fields Not Present in the Current Upstream Policy Object") says the schema has no issuer field, no proof block, no `replaces` link and no slab-level currency, and points to "publication metadata" as the interim treatment. This proposal gives that metadata a concrete, signed, tested shape: `{ issuer, issuedAt, replaces, currency, proof }` beside the unmodified policy, with the signature covering all of it so that currency and the amendment link are tamper-evident too. We do not claim to have found these gaps; IES named them.

Two further points are not stated in the schema source, either use-case page, or the devkit examples, and came from building an evaluator: (1) the schema does not say what a PERCENT surcharge is a percentage of. On IES's own example tariff and a 350 kWh month, applying it to each kWh's slab rate gives a bill of Rs 2,474.40 and applying it to the blended average rate gives Rs 2,434.40. (2) the schema calls `end` exclusive, but the official example writes slabs 0–100, 101–300, 301+, which read literally leaves 100–101 kWh in no slab. Both are raised as questions for IES to settle, not as claims about any DISCOM's practice.

A reference implementation in this repository has two independently written billing evaluators (Node and Python) that agree with each other and with hand-computed totals across six scenarios, a JSON Schema for the envelope, and tamper tests. It uses a local test key and IES's sample tariff values; nothing is registered in a real IES registry. A discover → confirm → status round trip was also run end to end against the real, live `beckn/DEG` devkit sandbox: the delivered object recomputed to the identical bill, the envelope-wide signature verified against data that genuinely crossed the network, and onix-bap's own schema validator independently confirmed the payload as schema-conformant `IES_Policy`. Full note in the IES concept-note format: `PROPOSAL.md` in the repository.

**Schema**

Envelope (proposed, additive; `policy` is the upstream `IES_Policy` exactly as published):

```
{
  "policy": { ...IES_Policy, unmodified... },
  "publication": {
    "issuer": "did:web:<authority-domain>",
    "issuedAt": "<ISO 8601 date-time>",
    "replaces": "<id of the version this amends>" | null,
    "currency": "<ISO 4217 code, e.g. INR>",
    "proof": {
      "type": "<scheme label>",
      "verificationMethod": "did:web:<authority-domain>#<key-id>",
      "created": "<ISO 8601 date-time>",
      "proofPurpose": "assertionMethod",
      "signatureValue": "<base64>"
    }
  }
}
```

The signature covers `policy` and `publication` together, excluding `signatureValue`. JSON Schema: `schema/publication.schema.json` in the repository. Open questions: currency as envelope field versus a future schema field; which proof suite; where the envelope sits in `DatasetItem`.

**Standards the schema is based on**

W3C DID Core (did:web); W3C Data Integrity, eddsa-jcs-2022 (model for the proof, not claimed as conformed to); RFC 8785 JSON Canonicalization (subset); RFC 8032 Ed25519; ISO 4217; ISO 8601; Beckn Protocol v2 (transport, via the existing DatasetItem).

**Any additional material**

Repository with reference implementation and the full concept note: **<paste the exact GitHub URL you pushed to>**. From a fresh clone: `npm run keygen && npm run author && npm test` (Node 18+, Python 3); `npm run demo:ambiguity` reproduces the Rs 2,474.40 vs Rs 2,434.40 comparison. `sandbox-reproduction/README.md` reproduces the live devkit-sandbox round trip. Related open point: the Implementation Guide's own "Open Items" list the amendment convention as "to be formalised".

**GitHub username (optional)** — if you add it, the bot @mentions you on the issue so you get notified of the discussion.

---

## After you submit

- Check that an issue appears at https://github.com/India-Energy-Stack/ies-accelerator/issues
  with the `schema-proposal` label, and that your email and mobile are not in it.
- Reviewers may ask for reformatting or changes; the concept note is deliberately
  in their template so edits should be small.
- If they prefer currency or `replaces` as real schema fields, Points 3 and 4 already
  say that would be welcome; that outcome is a success, not a rejection.
