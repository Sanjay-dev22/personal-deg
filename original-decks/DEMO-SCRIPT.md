# Live Demo Script — IES UC3 Prototype

**Golden rule: nothing slow or uncertain happens live.** Docker image pulls,
first-time builds, and "does this even still work" — all of that gets done
and verified tonight, not in front of the room. The live segment should be
~5-7 minutes of narrated, already-proven commands.

---

## TONIGHT — do this once, well before the meeting

```bash
# 1. Clone both repos (skip if already cloned)
git clone https://github.com/beckn/DEG.git ies-devkit
git clone https://github.com/Sanjay-dev22/myprotoiec.git ies-prototype

# 2. Apply the docker-compose.yml edit to ies-devkit/devkits/data-exchange/install/
#    (swap the sandbox-bpp service to build from ies-prototype/webhook-server —
#    have this diff ready to paste in, don't re-derive it live)

# 3. Regenerate the signing key (never committed to GitHub on purpose)
cd ies-prototype
npm run keygen
npm run author

# 4. Start Docker Desktop, then bring the stack up — THIS IS THE SLOW STEP,
#    do it now so all images are cached
cd ../ies-devkit/devkits/data-exchange/install
docker compose up -d --build

# 5. Confirm all 7 containers are healthy
docker ps
```

**Then run the actual demo script once, tonight, start to finish:**
```bash
cd ../../../../ies-prototype
bash live-sandbox-roundtrip.sh
```

**Save a copy of that output** (select-all, copy, paste into a text file, or
just take screenshots) — this is your insurance policy if live internet or
Docker misbehaves tomorrow. Label it `fallback-output.txt`.

**Leave the containers running overnight if possible** (`docker compose up
-d` again in the morning if they got stopped) so tomorrow you're not
waiting on anything — just re-running one script.

---

## TOMORROW, 15 MINUTES BEFORE — pre-flight check

```bash
docker ps
```
All 7 should say "healthy" or "Up". If any are missing:
```bash
cd ies-devkit/devkits/data-exchange/install
docker compose up -d
```
Then run the demo script once, silently, to confirm it still works before
anyone's watching.

---

## THE LIVE SCRIPT — what to type, show, and say

### Opening (30 sec, before touching the keyboard)
> "What you're about to see isn't a slide or a mockup — it's the actual
> government-published network software, running for real, right here on
> my laptop. I'm going to send a real signed tariff through it and let
> their own software tell us whether it's correct — not me."

### Step 1 — show it's real infrastructure
```bash
docker ps
```
**Point at the screen while it prints.** Say:
> "These seven programs are the real practice copy of the network India
> Energy Stack runs — identity, message routing, validation. I didn't
> write any of these seven — they're downloaded, unmodified, from the
> government's own public repository."

### Step 2 — run the actual demo
```bash
cd ies-prototype
bash live-sandbox-roundtrip.sh
```

**As it runs, narrate each section as it prints** (the script itself
prints section headers, so just read them and add one sentence):

- **"1. discover"** → *"This just went out and found a real company already
  live on this network — I didn't set that up, it's a live participant
  I discovered by accident the first time I ran this."*
- **"2. confirm"** → *"This is the handshake — two identities agreeing to
  exchange data."*
- **"3. status"** → *"This is the moment our code builds and signs a fresh
  tariff object, live, right now — not a saved file."* If asked "how do you
  know it's fresh": *"the timestamp in the response matches this exact
  second — that's not something you can fake with a static file."*
- **The validation line** (`Validation passed for @type: IES_Policy`) →
  slow down here, this is the punchline: *"That sentence came from their
  code, not mine. Their own, independent, unmodified checking software
  just confirmed our object is built correctly."*

### Step 3 — optional close (if time allows)
Show the bill calculation matches, tying back to the earlier slides:
```bash
python evaluator.py received-from-live-webhook.json test/fixtures/usage-normal.json
```
> "And that's the same ₹2,428.98 result from the slides earlier — now
> computed from data that actually traveled through the real network,
> not from a static example."

### Closing line
> "Everything you just watched is reproducible — the code is public, the
> commands are simple, and nothing about it required special access or
> approval to run."

---

## IF SOMETHING BREAKS LIVE — don't improvise, use this

**Docker/containers won't start or something hangs:**
> "Looks like something's not cooperating with the room's network — let
> me show you the exact same run from last night instead."
Open `fallback-output.txt` and walk through it exactly the same way,
narrated the same way. Nobody needs to know it isn't happening live in
that exact second — the run genuinely happened, recently, on this exact
setup.

**No internet in the room (the `discover` step needs real internet):**
Same fallback — use last night's saved output for that one step, note
honestly if asked: *"that step needs internet access to reach the live
network — I've got last night's run saved since I wasn't sure about the
room's wifi."* That's an honest, unremarkable thing to say, not a cover-up.

**Someone asks to see the code:**
Have `ies-prototype/webhook-server/server.js` and
`ies-prototype/src/policyEngine.js` open in a second window, ready to
alt-tab to — don't scroll through it unprompted, just have it ready.

---

## IF ASKED: "Didn't IES already document this? What's your actual contribution?"

Don't get defensive — the honest answer is stronger than pretending we
discovered something. Say:

> "Three of the four items we're proposing are already named as open
> questions in IES's own documentation — section 8.4 of their Tariff
> Intelligence page, literally titled 'Fields Not Present in the Current
> Upstream Policy Object.' They flag that there's no issuer field, no
> signature block, no currency field, and no amendment convention. Their
> guidance says this data belongs outside the policy object itself, in
> what they call 'the signed publication/exchange envelope' — but if you
> actually look at their own real envelope schema, the one their devkit
> ships and their validator checks against, it doesn't have those fields
> either yet. That part is genuinely still open — their own 'Open Items'
> section admits the amendment convention is 'to be formalised.' So what
> we built is a concrete field-level design for that missing piece —
> modeled on the external standard their docs do name for it, W3C
> Verifiable Credentials — sitting alongside their real envelope without
> touching it, and we proved it survives their real, unmodified validator
> end to end. Nobody's published a working version of that piece yet, as
> far as we've been able to find."

**If pushed — "so you didn't find anything new at all?":**

> "One thing isn't in their docs anywhere. When you actually try to
> compute a bill with a time-of-day surcharge, their schema never says
> whether the surcharge multiplies the marginal slab rate or the average
> blended rate. That's not hypothetical — whenever a surcharge window's
> usage spans more than one slab, those two readings give different bills
> for identical usage — and you only hit it by actually implementing the
> billing logic, not by reading the schema. That one's ours."
>
> *(If asked for a specific number: don't quote one — we've only built and
> tested reading (b), the blended-rate reading; we haven't built a tested
> reference for reading (a) to compare against, so there's no verified
> figure to cite. The point is the two readings can disagree at all, not
> a specific rupee amount.)*

**If asked — "is this just a toy, or does it match what they actually
asked for?":**

> "It's explicitly a prototype, not a production system — I want to be
> clear about that. But the scope isn't arbitrary. IES publishes a 9-step
> implementation checklist for exactly this use case, and what we built
> maps onto steps 1 through 7 of it: author the policy as structured data,
> sign it, publish it over their real data-exchange protocol, sample-
> consume it in a billing evaluator — including the exact three edge cases
> their own checklist names: open-ended top slab, surcharge-window
> wrap-around, percent-versus-absolute adjustments. We tested exactly what
> they said to test. Steps 8 and 9 — production go-live and formal
> legal/IT sign-off — are deliberately out of scope at prototype stage."

**If asked — "what are we actually asking for / what do we get out of
this?":**

> "This isn't a paid pilot — that EOI window already closed in February.
> What's still open is their standing schema-contribution channel: we
> submit through their public form, it automatically opens a tracked
> GitHub issue, and their central team and the community review it.
> There's no contract on the table — the ask is the team's time to finish
> and submit the proposal, and the upside is visibility with the body that
> will eventually decide this schema, not a guaranteed deployment."
