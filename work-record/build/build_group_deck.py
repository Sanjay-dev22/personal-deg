#!/usr/bin/env python3
"""
Builds DEG-IES-Weekly-Update-Group-Meeting.pptx from the data block below.

HOW TO UPDATE THE WEEKLY DECK
  1. Edit SLIDE_DEFS (text, new week = copy the last tuple) and SOURCES (links) below.
  2. python build_group_deck.py            ->  writes ../DEG-IES-Weekly-Update-Group-Meeting.pptx
  3. Render the changed slides (PowerPoint COM export, see README.md), look at them, commit, push.

No design work is needed: layout, fonts, colours, spacing and the footer are all produced here.
`template/` is the unpacked deck (theme, master, layout, title slide). Only slides 2..N are rewritten.
Requires: Python 3.9+ and `python-pptx` (only for the final sanity check).
"""
import math, os, re, shutil, sys, tempfile, zipfile
from xml.sax.saxutils import escape

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(HERE, "template")
OUT = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.join(HERE, "..", "DEG-IES-Weekly-Update-Group-Meeting.pptx")
TITLE_SZ = int(os.environ.get("TITLE_SZ", "2200"))

# ---------------------------------------------------------------------------------------------
# Colours / geometry (EMU).  Matches the deck: Poppins, cream background, amber markers.
# ---------------------------------------------------------------------------------------------
BODY, MUTED, ACCENT, LINKBLUE, TITLE_C = "48576A", "8391A2", "C87C1C", "0B5FB0", "121B27"
LINE_H, GAP = 190500, 170000
SRC_LINE_H = 150876
RULE_Y = 5989320  # footer rule

# ---------------------------------------------------------------------------------------------
# SOURCES: one place for every link.  key -> (label shown on the slide, url)
# A slide lists the keys it uses (in the order they should be numbered) and bullets refer to them with Ref().
# ---------------------------------------------------------------------------------------------
SOURCES = {
    "deg": ("beckn/DEG repository (FIDE, with IEA)", "https://github.com/beckn/DEG"),
    "ies_pilot": ("IES Accelerator: four pilot DISCOMs", "https://github.com/India-Energy-Stack/ies-accelerator"),
    "rec_demo": ("PV Magazine India: REC live P2P demo, AI Impact Summit (19 Feb 2026)",
                 "https://www.pv-magazine-india.com/2026/02/19/rec-conducts-live-demo-of-peer%E2%80%91to%E2%80%91peer-decentralized-energy-transaction-at-india-ai-impact-summit-2026/"),
    "ies_uc": ("IES use-case guides and their status", "https://github.com/India-Energy-Stack/ies-accelerator/blob/main/use-cases/README.md"),
    "uc3": ("IES draft guide: Policy as Code / Tariff Intelligence (UC3)", "https://github.com/India-Energy-Stack/ies-accelerator/tree/main/draft/use-cases/tariff-intelligence"),
    "devkits": ("beckn/DEG devkits (no V2G devkit listed)", "https://github.com/beckn/DEG/tree/main/devkits"),
    "afir": ("Bender: AFIR makes ISO 15118-20 mandatory from 1 Jan 2027", "https://www.bender.de/en/know-how/applications/emobility/alternative-fuels-infrastructure-regulation-afir-2025/"),
    "charin": ("CharIN position paper on ISO 15118 under AFIR (Apr 2026)", "https://www.charin.global/media/pages/technology/knowledge-base/06a76f7571-1777821309/20260428_position-paper-clarifying-iso-15118-implementation-under-afir.pdf"),
    "bosch": ("Bosch Mobility: charge communication unit with ISO 15118-20 bidirectional transfer", "https://www.bosch-mobility.com/en/solutions/control-units/vehicle-charge-communication-unit/"),
    "derc": ("DERC order, Petition No. 06/2026 (BRPL/TPDDL P2P pilot)", "https://www.derc.gov.in/sites/default/files/Order%20in%20Petition%20No.%2006_2026.pdf"),
    "ferc": ("FERC Order No. 2222 explainer (DER aggregation, US)", "https://www.ferc.gov/ferc-order-no-2222-explainer-facilitating-participation-electricity-markets-distributed-energy"),
    "piclo": ("Piclo Flex: UK network flexibility marketplace (Northern Powergrid)", "https://www.piclo.energy/press-releases/piclo-and-northern-powergrid-join-forces-to-accelerate-the-decarbonisation-of-the-grid"),
    "brpl": ("BSES Delhi (BRPL): official P2P trading page and provider list", "https://www.bsesdelhi.com/web/brpl/p-to-p-trading"),
    "tpddl": ("Tata Power-DDL: official P2P trading page", "https://www.tatapower-ddl.com/solar-rooftop/p-to-p-trading"),
    "evr": ("EVreporter: explainer on P2P energy trading in India", "https://evreporter.com/a-comprehensive-explainer-on-peer-to-peer-energy-trading-in-india/"),
    "merc": ("MERC: Demand Flexibility and DSM regulations (Maharashtra)", "https://merc.gov.in/regulation_type/current-regulations-demand-side-management"),
    "rerc": ("Energetica India: RERC DF/DSM Regulations 2026 (Rajasthan)", "https://www.energetica-india.net/news/rerc-issues-dfdsm-regulations-2026-with-fy-29-30-targets-bans-diesel-gensets"),
    "kerc": ("Mercom: Karnataka notifies demand flexibility and DSM framework", "https://mercomindia.com/karnataka-notifies-framework-for-demand-flexibility-and-demand-side-management"),
    "gerc": ("Mercom: GERC seeks consultants to draft ancillary services and demand flexibility rules (Gujarat)", "https://mercomindia.com/gerc-seeks-consultants-to-finalize-ancillary-services-regulations"),
    "tata": ("Tata Power with AutoGrid: Mumbai demand-response programme (200 MW target)", "https://www.tatapower.com/news-and-media/media-releases/tata-power-joins-hands-with-autogrid-to-expand-ai-enabled-smart-energy-management-system-in-mumbai"),
    "mercc": ("MERC: DF-DSM Consultation Committee notification (17 Jan 2025)", "https://merc.gov.in/wp-content/uploads/2025/01/DF-DSM-CC_-Notification-_17.01.2025.pdf"),
    "mercm": ("MERC: minutes of the committee's first meeting", "https://merc.gov.in/wp-content/uploads/2025/04/1st-Minutes-of-the-Meeting-DF-DSM-CC-1.pdf"),
    "gridpulse": ("Grid Pulse", "https://beckn.vercel.app"),
}


class Ref:
    """A bullet (or subtitle) of plain text followed by numbered, clickable [n] tags for the given SOURCES keys."""
    def __init__(self, text, *keys):
        self.text, self.keys = text, keys


class Seg:
    """A bullet made of text segments; give a SOURCES key to make a segment a link (e.g. Grid Pulse)."""
    def __init__(self, *parts):
        self.parts = parts  # each part: str  or  (str, source_key)


# ---------------------------------------------------------------------------------------------
# SLIDE_DEFS  <-- THE ONLY PLACE TO EDIT FOR A WEEKLY UPDATE
#   (kicker, title, subtitle, bullets, source_keys)
#   bullets: str | Ref | Seg | (item, [sub-items])   source_keys: order the numbers [1],[2].. appear on the slide
# Rules for what belongs here are in README.md ("what goes on a group-meeting slide").
# ---------------------------------------------------------------------------------------------
SLIDE_DEFS = [
    ("CW – 34, 35", "DEG / IES Research; UC3 Chosen and Prototyped", None, [
        Ref("Read through the full DEG proposal and protocol docs. It's an open protocol (not a product), written by FIDE and IEA", "deg"),
        Ref("Looked into India Energy Stack (IES), the government programme behind this — found it already has live pilots running: 4 DISCOMs, plus a real trade between Meerut and Delhi shown at a national summit", "ies_pilot", "rec_demo"),
        Ref("Went through IES's 8 listed use cases — 5 were already taken, so picked UC3 (Policy as Code / Tariff Intelligence), one of the open ones", "ies_uc"),
        Ref("Found UC3's schema was still marked work in progress, with known gaps around signatures, currency, and how amendments work", "uc3"),
        "Built a first prototype: signed tariff data plus two separate billing calculators (one in JS, one in Python) that matched exactly across 4 test cases",
        "Sent a real message through IES's own test network and confirmed it reached other live participants",
    ], ["deg", "ies_pilot", "rec_demo", "ies_uc", "uc3"]),

    ("CW – 36", "V2G Researched; Real Network Identity Built", None, [
        Ref("Dug into V2G — the general mechanism exists, but no one has actually built a V2G-specific example anywhere yet", "devkits"),
        Ref("Checked the market: major suppliers already sell bidirectional EV-charging hardware, and from Jan 2027 the EU requires the bidirectional-capable charging standard (ISO 15118-20) on new chargers", "bosch", "afir", "charin"),
        "Registered a real, independently verifiable identity on the live network — own domain, real keypairs, went through the official process",
        "Ran into a few real obstacles along the way — a domain-verification restriction, a broken redirect, a signing-scheme mismatch I had to resolve by reading the actual source code — and got past all of them",
        "Tested the identity with a signed self-test: a valid message was accepted, a tampered one was rejected",
        "Learned that having an identity isn't the same as being a recognized network member — set up an independent trading network and started figuring out why membership wasn't showing up",
    ], ["devkits", "bosch", "afir", "charin"]),

    ("CW – 37, 38", "P2P Energy Trading Built, Tested, and Demonstrated Live",
     Ref("Switched focus to P2P energy trading, a third IES use case that's already proven live.", "rec_demo", "derc"), [
        "Ran a full trade end to end — 7 signed messages, a real settlement that worked out to about ₹437 — and also confirmed a policy rejection works correctly",
        "Double-checked the trade actually landed on the separate external ledger, using different credentials than the ones that wrote it",
        Seg("Built an interactive tool covering all 31 protocol messages, plus two written guides, and published them live (Link: ", ("Grid Pulse", "gridpulse"), ")"),
        "Went back to the identity work and figured out exactly how network membership works and what the real process is to request recognition",
        ("Built a second live demo with real buyer and seller apps you can click through in real time — found and fixed several bugs along the way:", [
            "Fixed a bug in how offers are discovered, and confirmed the fix using live offers from other unrelated testers on the shared network.",
            "Tightened up purchase validation (price can't be edited, quantity is capped).",
            "Built a live view of the whole network with independent ledger verification.",
        ]),
    ], ["rec_demo", "derc"]),

    ("CW – 39", "Added Real Negotiation, and Fixed a Data Gap",
     "Added real counter-offers, closed a data gap, and made the dashboards more transparent.", [
        "Added real negotiation to the trading platform — either side can counter-offer, either side can decline, and delivery now has to be confirmed properly instead of just assumed",
        "Found and closed a gap where the same listed inventory could have been sold more than once — quantity wasn't being tracked properly",
        "Added real publish timestamps and full raw-data visibility to the dashboards, so every offer and trade genuinely shows when it happened",
    ], []),

    ("CW – 40", "Looked Into Problems in P2P Energy Trading and Documented Them",
     "Found gaps in the trading network's rules, with real-world examples and documented them.", [
        "Reference Document: P2P gaps.pptx",
        ("Fixed and tested the 4 gaps:", [
            "Added a penalty for under-delivery.",
            "Added a sane price range.",
            "Added an exemption for non-firm commitments.",
            "Added real wheeling charges between utilities.",
        ]),
        "Realized the biggest missing piece is a way to pool lots of small producer offers into one bundle for a large buyer — probably the most valuable idea to come out of this review.",
    ], []),

    ("CW – 41", "UC3 Publication Envelope Proposal Documentation and Presentation",
     "Picked UC3 (Policy as Code / Tariff Intelligence) and completed the concept proposal", [
        "Widened the signature on the tariff-publication format so it covers the whole published record instead of just part of it — closes a gap where the rest could be tampered with",
        "Ran UC3 end to end against the live docker sandbox network",
        "Completed group presentation on DEG (Digital Energy Grid) / IES (India Energy Stack)",
    ], []),

    ("CW – 42", "Built the Aggregator, and Tested It",
     "Built the aggregator idea, tested it and currently checking it against real national pilots.", [
        "Built a first working version of the aggregator: it pools small producer offers into one larger block for a bulk buyer, and splits the settlement back out fairly to each contributor",
        Ref("Redesigned it so a pooled offer has its own separate identity in the market, rather than looking like it belongs to one seller — this matches how aggregation actually works in real markets like the US and UK", "ferc", "piclo"),
        "Added demand-first matching — a large buyer can state what they need (quantity and max price) up front, and it gets matched against what's available",
        "Gave the large-buyer role its own identity so it can transact directly, instead of going through someone else",
        Ref("Looking into real national P2P pilots that were already demonstrated in February 2026", "rec_demo", "derc"),
    ], ["ferc", "piclo", "rec_demo", "derc"]),

    ("CW – 43", "Checked the Market Reality for P2P Trading",
     "Verified what is really live in P2P trading today, then looked at the wider aggregation market.", [
        Ref("Mapped the real worldwide P2P trading market and checked it against live sources — direct P2P already runs in India, with six DISCOM-accredited apps", "brpl", "tpddl", "evr", "rec_demo"),
        "Looked beyond direct P2P at the wider aggregation market — demand response, battery and solar virtual power plants, EV-fleet flexibility and farm-load shifting — to see what is still undone in India",
    ], ["brpl", "tpddl", "evr", "rec_demo"]),

    ("CW – 44 (ongoing)", "Mapped India's Aggregation Gap",
     "Mapped where demand-flexibility aggregation really stands across India.", [
        Ref("Researched demand flexibility across India — only three states have real rules (Maharashtra, Rajasthan, Karnataka), Gujarat is still drafting, and no aggregator is registered anywhere yet", "merc", "rerc", "kerc", "gerc"),
        Ref("The largest pilot found is about 38 MW against a 200 MW target, and no open market exists yet", "tata"),
        Ref("Found one concrete entry point: a “Special Invitee” seat on Maharashtra's demand-flexibility committee", "mercc", "mercm"),
    ], ["merc", "rerc", "kerc", "gerc", "tata", "mercc", "mercm"]),
]

# ---------------------------------------------------------------------------------------------
# XML builders (do not need editing for a normal weekly update)
# ---------------------------------------------------------------------------------------------
HEAD = ("<?xml version='1.0' encoding='UTF-8' standalone='yes'?>\n"
        '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
        'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="F5F7FA"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>'
        '<p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/>')
TAIL = '</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>'
STYLE_RECT = ('<p:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef>'
              '<a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></p:style>')
STYLE_LINE = ('<p:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef>'
              '<a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></p:style>')
HLINK_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink"


class Ids:
    def __init__(self):
        self.n = 1

    def next(self):
        self.n += 1
        return self.n


class Links:
    """Allocates a relationship id per distinct URL on one slide."""
    def __init__(self):
        self.by_url = {}

    def rid(self, url):
        if url not in self.by_url:
            self.by_url[url] = f"rId{100 + len(self.by_url)}"
        return self.by_url[url]


def run(text, sz, bold, ital, color, link=None):
    rpr = (f'<a:rPr sz="{sz}" b="{1 if bold else 0}" i="{1 if ital else 0}"' + (' u="sng"' if link else '') + '>'
           f'<a:solidFill><a:srgbClr val="{color}"/></a:solidFill><a:latin typeface="Poppins"/>'
           + (f'<a:hlinkClick r:id="{link}"/>' if link else '') + '</a:rPr>')
    return f'<a:r>{rpr}<a:t>{escape(text)}</a:t></a:r>'


def textbox(ids, x, y, w, h, paras_xml, algn="l", name="TextBox"):
    i = ids.next()
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{i}" name="{name} {i-1}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>'
            f'<p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'
            f'<p:txBody><a:bodyPr wrap="square" lIns="0" rIns="0" tIns="0" bIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/>'
            f'{paras_xml}</p:txBody></p:sp>')


def para(runs_xml, algn="l"):
    return f'<a:p><a:pPr algn="{algn}"><a:spcAft><a:spcPts val="0"/></a:spcAft></a:pPr>{runs_xml}</a:p>'


def marker(ids, x, y, size, color):
    i = ids.next()
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{i}" name="Rectangle {i-1}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'
            f'<p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{size}" cy="{size}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom>'
            f'<a:solidFill><a:srgbClr val="{color}"/></a:solidFill><a:ln><a:noFill/></a:ln><a:effectLst/></p:spPr>{STYLE_RECT}'
            f'<p:txBody><a:bodyPr rtlCol="0" anchor="ctr"/><a:lstStyle/><a:p><a:pPr algn="ctr"/></a:p></p:txBody></p:sp>')


def connector(ids):
    i = ids.next()
    return (f'<p:cxnSp><p:nvCxnSpPr><p:cNvPr id="{i}" name="Connector {i-1}"/><p:cNvCxnSpPr/><p:nvPr/></p:nvCxnSpPr>'
            f'<p:spPr><a:xfrm><a:off x="621792" y="{RULE_Y}"/><a:ext cx="10948111" cy="0"/></a:xfrm><a:prstGeom prst="line"><a:avLst/></a:prstGeom>'
            f'<a:ln w="9525"><a:solidFill><a:srgbClr val="CBD5E0"/></a:solidFill></a:ln></p:spPr>{STYLE_LINE}</p:cxnSp>')


def est_lines(text, per_line):
    return max(1, math.ceil(len(text) / per_line))


def segments(item, numbers, links, base_sz, ital=False):
    """Turn a str / Ref / Seg into run XML (+ plain text for height estimation)."""
    out, plain = "", ""
    if isinstance(item, Ref):
        out += run(item.text, base_sz, False, ital, BODY)
        plain += item.text
        for k in item.keys:
            out += run(f" [{numbers[k]}]", 950, False, False, LINKBLUE, links.rid(SOURCES[k][1]))
            plain += f" [{numbers[k]}]"
    elif isinstance(item, Seg):
        for part in item.parts:
            if isinstance(part, tuple):
                out += run(part[0], base_sz, False, ital, LINKBLUE, links.rid(SOURCES[part[1]][1]))
                plain += part[0]
            else:
                out += run(part, base_sz, False, ital, BODY)
                plain += part
    else:
        out += run(item, base_sz, False, ital, BODY)
        plain += item
    return out, plain


def build_slide(kicker, title, subtitle, bullets, page, source_keys):
    ids, links = Ids(), Links()
    numbers = {k: n for n, k in enumerate(source_keys, 1)}
    x = HEAD
    x += textbox(ids, 621792, 365760, 10948111, 274320, para(run(kicker, 1200, True, False, ACCENT)))
    x += textbox(ids, 621792, 640080, 10948111, 548640, para(run(title, TITLE_SZ, True, False, TITLE_C)))
    if subtitle:
        sub_runs, _ = segments(subtitle, numbers, links, 1250, ital=True)
        x += textbox(ids, 621792, 1078992, 10948111, 365760, para(sub_runs))
        y = 1600200
    else:
        y = 1417320
    for entry in bullets:
        item, subs = entry if isinstance(entry, tuple) else (entry, [])
        runs_xml, plain = segments(item, numbers, links, 1250)
        h = est_lines(plain, 120) * LINE_H
        x += marker(ids, 621792, y + 82296, 82296, ACCENT)
        x += textbox(ids, 877824, y, 10692079, h, para(runs_xml))
        y += h + GAP
        for s in subs:
            runs2, plain2 = segments(s, numbers, links, 1250)
            h2 = est_lines(plain2, 114) * LINE_H
            x += marker(ids, 960120, y + 91440, 64008, MUTED)
            x += textbox(ids, 1143000, y, 10426903, h2, para(runs2))
            y += h2 + GAP - 40000
        if subs:
            y += 70000
    content_end = y
    box_y = RULE_Y
    if source_keys:  # numbered, clickable source list just above the footer rule
        full_h = SRC_LINE_H * (len(source_keys) + 1) + 45720
        if content_end + 150000 <= RULE_Y - 91440 - full_h:
            box_h = full_h  # normal: one source per line
            ps = para(run("Sources", 850, True, False, BODY))
            for k in source_keys:
                label, url = SOURCES[k]
                ps += para(run(f"[{numbers[k]}] ", 850, False, False, ACCENT) + run(label, 850, False, False, LINKBLUE, links.rid(url)))
        else:  # tight slide: flow all sources into one compact paragraph
            chars = sum(len(SOURCES[k][0]) + 6 for k in source_keys) + 9
            box_h = SRC_LINE_H * max(1, math.ceil(chars / 150)) + 45720
            rs = run("Sources  ", 850, True, False, BODY)
            for k in source_keys:
                label, url = SOURCES[k]
                rs += run(f"[{numbers[k]}] ", 850, False, False, ACCENT) + run(label, 850, False, False, LINKBLUE, links.rid(url)) + run("   ", 850, False, False, BODY)
            ps = para(rs)
        box_y = RULE_Y - 91440 - box_h
        x += textbox(ids, 621792, box_y, 10948111, box_h, ps, name="Sources")
    x += connector(ids)
    x += textbox(ids, 621792, 6053328, 7315200, 274320, para(run(title, 1050, False, False, MUTED)))
    x += textbox(ids, 10655503, 6053328, 914400, 274320, para(run(str(page), 1050, False, False, MUTED), "r"), algn="r")
    x += TAIL
    return x, content_end, links, box_y


def write_rels(path, links):
    rels = open(path, encoding="utf-8").read()
    rels = re.sub(r'<Relationship [^>]*relationships/hyperlink"[^>]*/>', "", rels)  # drop old hyperlink rels
    add = "".join(f'<Relationship Id="{rid}" Type="{HLINK_TYPE}" Target="{escape(url, {chr(34): "&quot;"})}" TargetMode="External"/>'
                  for url, rid in links.by_url.items())
    rels = rels.replace("</Relationships>", add + "</Relationships>")
    open(path, "w", encoding="utf-8", newline="").write(rels)


def main():
    work = tempfile.mkdtemp(prefix="deckbuild_")
    root = os.path.join(work, "pkg")
    shutil.copytree(TEMPLATE, root)
    slides_dir = os.path.join(root, "ppt", "slides")
    problems = []
    for page, (kicker, title, sub, bullets, keys) in enumerate(SLIDE_DEFS, start=2):
        # slide parts are slide2.xml .. slideN.xml in presentation order
        xml, endy, links, box_y = build_slide(kicker, title, sub, bullets, page, keys)
        fname = f"slide{page}.xml"
        open(os.path.join(slides_dir, fname), "w", encoding="utf-8", newline="").write(xml)
        write_rels(os.path.join(slides_dir, "_rels", fname + ".rels"), links)
        limit = box_y - 100000
        flag = "  <-- CONTENT RUNS INTO THE SOURCES BOX" if endy > limit else ""
        print(f"{fname}: page {page}, content ends y={endy}, limit {limit}{flag}")
        if flag:
            problems.append(fname)
    out = OUT
    if os.path.exists(out):
        os.remove(out)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.write(os.path.join(root, "[Content_Types].xml"), "[Content_Types].xml")
        for dp, _, fs in os.walk(root):
            for f in fs:
                full = os.path.join(dp, f)
                arc = os.path.relpath(full, root).replace(os.sep, "/")
                if arc != "[Content_Types].xml":
                    z.write(full, arc)
    shutil.rmtree(work, ignore_errors=True)
    try:
        from pptx import Presentation
        n = len(Presentation(out).slides._sldIdLst)
        print(f"wrote {out}  ({n} slides, opens cleanly)")
    except ImportError:
        print(f"wrote {out}")
    if problems:
        sys.exit("fix the overflow above (shorten bullets or drop a source)")


if __name__ == "__main__":
    main()
