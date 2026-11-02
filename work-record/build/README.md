# Weekly group-meeting deck: how to update it

`DEG-IES-Weekly-Update-Group-Meeting.pptx` is **generated** by `build_group_deck.py`. To change the deck, edit the
data block in that script and rebuild. There is no need to open the pptx, inspect the design, or hand-edit shapes.

```bash
cd work-record/build
python build_group_deck.py        # rewrites ../DEG-IES-Weekly-Update-Group-Meeting.pptx
powershell -File render_check.ps1 # exports slide PNGs to %TEMP%\deckpng so you can look at them
```

The script prints a line per slide and stops with "CONTENT RUNS INTO THE SOURCES BOX" if a slide is too full
(shorten bullets or drop a source). It switches to a compact one-line source list on its own when space is tight.

## What is in this folder
| File | What it is |
|---|---|
| `build_group_deck.py` | The generator. `SLIDE_DEFS` = the slides, `SOURCES` = every link. Layout, fonts and colours are built in. |
| `template/` | The unpacked deck (theme, master, layout, title slide). Slides 2..N are rewritten on every build. Edit the title slide here only if its wording must change. |
| `render_check.ps1` | Renders slides to PNG through PowerPoint (Windows) for a visual check. |

## Adding a new week
Copy the last tuple in `SLIDE_DEFS`, change the kicker (`"CW – 45"`), title, subtitle and bullets, and add the new
sources. Mark the newest week `(ongoing)` and remove that from the previous one. Slide numbers and footers are automatic.
The title slide's range text (`Calendar weeks 34–44 · Aug–Oct 2026`) lives in `template/ppt/slides/slide1.xml`.

## What belongs on a group-meeting slide (and what does not)
The audience is colleagues in a group meeting. Each week is a short summary of **substantive outcomes**.

**Include**
- Research findings about the outside world (regulations, pilots, markets, standards), with the evidence.
- Things built and tested that have real substance (features, fixed gaps, protocol work, validated results).
- Formal deliverables the group asked for (proposals, group presentations).
- Concrete, verifiable next-step findings (for example a specific open entry point).

**Leave out**
- Small or routine tasks: bringing a demo back online, public/tunnel links, restarts, hosting, repo housekeeping.
- Internal paperwork presented as an achievement: briefing documents, plain-language write-ups, "briefing decks".
- Personal decisions or evaluations, for example "stopped pursuing X" or "X is not worth it". Whether open-source
  contribution is worthwhile is still being evaluated by the organisation, so no conclusion goes on a group slide.
- Conclusions phrased as a verdict on direction ("the biggest open space is X, not Y"). State the finding, not the verdict.
- Anything that reads as personal strategy or internal tooling.

**Framing**
- Title says what was done or checked (`Built the Aggregator, and Tested It`), with no internal suffixes such as "Demo Back Live".
- One-line italic subtitle. 3-6 bullets, one or two lines each, past tense, plain words: what was done and what came out of it.
- No marketing wording ("fully sourced", "honestly", "seamless"), no emojis.

## Sources
Any bullet that says something was researched, found, checked or confirmed about the outside world gets numbered
clickable tags (`Ref("text", "key1", "key2")`) and a **Sources** list on the slide. Claims about our own builds and tests need no source.
- Prefer primary sources: regulator orders, official pages, the repositories themselves; then reputable trade press.
- Check each link before adding it (`curl -sIL <url>`). A 403 is usually just a site blocking scripts; a 404 means do not use it.
- A claim of absence ("no aggregator is registered yet") cannot be linked. Keep it only if it is already the user's finding, and say so.
- Never attach a source to a number it does not contain. If a figure cannot be verified, tell the user and offer to reword it.

## After building
1. Run `render_check.ps1`, look at every changed slide (text clipping, the Sources box, overlap with the footer).
2. Commit `work-record/` and push to `personal-deg` (branch `master`).
3. The master record `DEG-IES-Work-Record.pptx` and `Work-Record-*` are the personal record. Do not apply group-deck trimming to them unless asked.
