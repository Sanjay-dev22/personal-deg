// 4-slide workshop pitch: V2G inside DEG / Beckn / IES.
// Build: node build_workshop_pitch.js   (pptxgenjs is installed in this folder)
// Facts come from aggregation-v2g/V2G-Proposal-and-Prototype-Plan.md (tags E1-E23) and sources/.
const path = require("path");
const pptxgen = require("pptxgenjs");
const SKILL = "C:/Users/Sanjay/.claude/skills/synced/4f007369-867e-4359-b8f6-ecd448dd2c57_8b49bb12-3dfe-4217-8e93-052dc03a829f/pptx";
const { applyTheme } = require(SKILL + "/scripts/apply_theme.js");
const OUT = path.resolve("C:/Users/Sanjay/Desktop/DEG/presentation/V2G-in-DEG-Workshop-Pitch.pptx");

const THEME = {
  name: "V2G Workshop",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B2430", lt1: "FFFFFF", dk2: "12344D", lt2: "EEF3F6",
    accent1: "0F7C8A", // teal: DEG / Beckn / what exists
    accent2: "C26A0A", // amber: gap / proposal / problem
    accent3: "5B6877", // grey: device standards, outside DEG
    accent4: "D9E8EC", // teal tint
    accent5: "FBEBD3", // amber tint
    accent6: "2F5D8A", // blue: IES
    hlink: "0F7C8A", folHlink: "5B6877",
  },
};
const HEX = { teal: "0F7C8A", amber: "C26A0A", grey: "8893A0", greyDark: "5B6877" };

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in
pres.title = "V2G inside DEG: an idea for discussion";
pres.author = "";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: "FFFFFF" },
  objects: [
    { text: { text: "V2G inside DEG  |  an idea for discussion", options: { x: 0.6, y: 7.03, w: 8, h: 0.3, fontSize: 10, color: C.accent3, margin: 0, valign: "middle" } } },
    { placeholder: { options: { name: "eyebrow", type: "body", x: 0.6, y: 0.36, w: 9, h: 0.3, fontSize: 12, bold: true, color: C.accent1, margin: 0, valign: "middle", charSpacing: 2 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.68, w: 12.13, h: 0.8, fontSize: 32, bold: true, color: C.text2, margin: 0, valign: "middle", align: "left" }, text: "" } },
  ],
  slideNumber: { x: 12.13, y: 7.03, w: 0.6, h: 0.3, fontSize: 10, color: C.accent3, align: "right" },
});
pres.addSection({ title: "V2G pitch" });

// ---------- helpers ----------
function box(s, text, x, y, w, h, o = {}) {
  s.addText(text, {
    x, y, w, h, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: o.r ?? 0.08,
    fill: { color: o.fill ?? C.background2 },
    line: o.line ? { color: o.line, width: o.lw ?? 1.25 } : { type: "none" },
    color: o.color ?? C.text1, fontSize: o.fs ?? 14, bold: o.bold ?? false,
    align: o.align ?? "center", valign: o.valign ?? "middle", margin: o.margin ?? 7,
    isTextBox: true, objectName: o.name ?? "Box",
  });
}
function txt(s, text, x, y, w, h, o = {}) {
  s.addText(text, {
    x, y, w, h, color: o.color ?? C.text1, fontSize: o.fs ?? 14, bold: o.bold ?? false, italic: o.italic ?? false,
    align: o.align ?? "left", valign: o.valign ?? "top", margin: 0, isTextBox: true, objectName: o.name ?? "Text",
    fontFace: o.head ? "+mj-lt" : undefined, paraSpaceAfter: o.psa,
  });
}
function arrow(s, x1, y1, x2, y2, o = {}) {
  s.addShape(pres.shapes.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: x2 < x1, flipV: y2 < y1,
    line: { color: o.color ?? C.text1, width: o.w ?? 2, dashType: o.dash ?? "solid", endArrowType: o.noHead ? undefined : "triangle" },
    objectName: o.name ?? "Arrow",
  });
}
function dot(s, n, x, y, d, fill) {
  s.addText(String(n), { x, y, w: d, h: d, shape: pres.shapes.OVAL, fill: { color: fill }, line: { type: "none" }, color: C.background1, bold: true, fontSize: 12, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "Step " + n });
}

// =====================================================================
// SLIDE 1: what is DEG
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "V2G pitch" });
  s.addText("1  |  WHAT IS DEG", { placeholder: "eyebrow" });
  s.addText("DEG: shared digital rails for energy", { placeholder: "title" });

  // layer stack (top = nearest to the user)
  const layers = [
    { name: "India Energy Stack (IES)", desc: "India's national implementation: consent, data exchange and pilots with DISCOMs", fill: C.accent6 },
    { name: "Digital Energy Grid (DEG)", desc: "Energy-specific data models, rules and ready-to-run devkits", fill: C.accent1 },
    { name: "Beckn protocol", desc: "An open message standard: discover, select, init, confirm, status. Every message is signed.", fill: C.text2 },
  ];
  layers.forEach((l, i) => {
    const y = 1.75 + i * 1.3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 7.3, h: 1.15, rectRadius: 0.08, fill: { color: l.fill }, line: { type: "none" }, objectName: "Layer " + (i + 1) });
    txt(s, l.name, 0.9, y + 0.14, 6.7, 0.42, { fs: 20, bold: true, color: C.background1, head: true, name: "Layer name " + (i + 1) });
    txt(s, l.desc, 0.9, y + 0.58, 6.7, 0.5, { fs: 14, color: C.background1, name: "Layer text " + (i + 1) });
  });
  txt(s, "Each layer is built on the one below it.", 0.6, 5.68, 7.3, 0.3, { fs: 12, color: C.accent3, italic: true, name: "Stack caption" });

  // what runs on it today
  txt(s, "What is built on it so far", 8.3, 1.75, 4.43, 0.35, { fs: 16, bold: true, color: C.text2, head: true, name: "Right heading" });
  ["Peer-to-peer energy trading", "Demand flexibility", "EV charging", "Consumer data exchange"].forEach((t, i) => {
    box(s, t, 8.3, 2.2 + i * 0.68, 4.43, 0.56, { fill: C.accent4, color: C.text2, fs: 15, bold: true, align: "left", margin: 13, name: "Use case " + (i + 1) });
  });
  box(s, [
    { text: "V2G (cars sending power back)", options: { bold: true, fontSize: 15, breakLine: true } },
    { text: "Vocabulary only. No working flow yet.", options: { fontSize: 14 } },
  ], 8.3, 5.02, 4.43, 0.95, { fill: C.accent5, line: C.accent2, lw: 1.5, color: C.text1, align: "left", margin: 13, name: "V2G gap" });

  // takeaway band
  box(s, [
    { text: "Every player gets the same three things:  ", options: { bold: true } },
    { text: "a checkable identity, machine-readable data, and signed proof." },
  ], 0.6, 6.2, 12.13, 0.6, { fill: C.background2, color: C.text2, fs: 16, align: "left", margin: 18, name: "Takeaway" });

  s.addNotes(
`WHAT TO SAY (about 90 seconds)
DEG, the Digital Energy Grid, is a vision of shared digital rails for energy: a data grid beside the physical grid. It is not a product and it does not replace standards like OCPP; it sits on top of them. Its three building blocks are universal identity, machine-readable data, and verifiability (signed records).
Beckn is the open protocol underneath: discover, select, init, confirm, status, with signed messages and a registry of who is who. DEG applies it to energy with data models and devkits. IES is India's national implementation, with consent, data exchange and pilots with DISCOMs.
Already built on these rails: peer-to-peer trading, demand flexibility, EV charging and consumer data exchange. V2G is the odd one out: DEG has the words for it, and no flow.

SOURCES AND STATUS
- DEG three building blocks: DEG vision paper, as summarised in our Foundations guide (slides on DEG).
- V2G is vocabulary only in DEG: EV_V2G resource type, V2G delivery mode on the P2P trade schema, V2G_ENABLED flag; no devkit contains a V2G flow. [R] E1 in V2G-Proposal-and-Prototype-Plan.md, beckn/DEG commit 54a5c7b.
- Demand-flex already uses EV chargers for load reduction (managed charging). [R] E2.`);
}

// =====================================================================
// SLIDE 2: V2G and the standards
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "V2G pitch" });
  s.addText("2  |  V2G AND THE KEY STANDARDS", { placeholder: "eyebrow" });
  s.addText("Device protocols move the power, DEG moves the deal", { placeholder: "title" });

  const nx = [0.6, 3.91, 7.22, 10.53], nw = 2.2, ny = 1.85, nh = 1.0, gap = 1.11;
  const nodes = [
    ["EV battery", "the vehicle", C.background2, C.text1],
    ["Charger", "with a sub-meter", C.background2, C.text1],
    ["Aggregator", "runs the fleet, holds the contract", C.accent4, C.text1],
    ["DISCOM", "the power company", C.accent4, C.text1],
  ];
  nodes.forEach((n, i) => {
    box(s, [
      { text: n[0], options: { bold: true, fontSize: 17, breakLine: true } },
      { text: n[1], options: { fontSize: 12 } },
    ], nx[i], ny, nw, nh, { fill: n[2], line: i >= 2 ? C.accent1 : C.accent3, color: n[3], name: "Node " + n[0] });
  });
  const links = [
    ["ISO\n15118-20", C.accent3, false],
    ["OCPP\n2.0.1 / 2.1", C.accent3, false],
    ["Beckn\nor OpenADR", C.accent1, true],
  ];
  links.forEach((l, i) => {
    const x1 = nx[i] + nw, x2 = nx[i + 1];
    arrow(s, x1, ny + 0.62, x2, ny + 0.62, { color: l[1], w: l[2] ? 3.5 : 2.5, name: "Link " + (i + 1) });
    arrow(s, x2, ny + 0.62, x1, ny + 0.62, { color: l[1], w: l[2] ? 3.5 : 2.5, name: "Link back " + (i + 1) });
    txt(s, l[0], x1, ny + 0.02, gap, 0.5, { fs: 12, bold: true, color: l[1] === C.accent1 ? C.accent1 : C.accent3, align: "center", valign: "middle", name: "Link label " + (i + 1) });
  });

  box(s, "Control: who charges or discharges, and how fast", 0.6, 3.15, 8.82, 0.55, { fill: C.background2, color: C.text1, fs: 14, bold: true, name: "Control band" });
  box(s, "Contract: the deal, the proof, the money. DEG fits here.", 7.22, 3.8, 5.51, 0.55, { fill: C.accent4, line: C.accent1, color: C.text2, fs: 14, bold: true, name: "Contract band" });

  const modes = [
    ["V1G", "Managed charging", "Only slow down or delay charging. Already covered by DEG demand flexibility.", C.background2, C.accent3],
    ["V2H", "Vehicle to home", "The car powers the building. No export to the grid, so metering is simpler.", C.background2, C.accent3],
    ["V2G", "Vehicle to grid", "The car sends power back. Vocabulary in DEG, but no working flow yet.", C.accent5, C.accent2],
  ];
  modes.forEach((m, i) => {
    const x = 0.6 + i * 4.115;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.65, w: 3.9, h: 1.6, rectRadius: 0.08, fill: { color: m[3] }, line: { color: m[4], width: i === 2 ? 1.75 : 1 }, objectName: "Mode card " + m[0] });
    txt(s, m[0], x + 0.2, 4.78, 1.0, 0.5, { fs: 28, bold: true, color: i === 2 ? C.accent2 : C.text2, head: true, name: "Mode tag " + m[0] });
    txt(s, m[1], x + 1.25, 4.9, 2.5, 0.35, { fs: 15, bold: true, color: C.text2, name: "Mode name " + m[0] });
    txt(s, m[2], x + 0.2, 5.4, 3.5, 0.8, { fs: 14, name: "Mode text " + m[0] });
  });

  txt(s, "India's EV charging guidelines (Ministry of Power, Sep 2024) name OCPP, OCPI, OpenADR and a Beckn-based interface. BRPL's aggregator tender names Beckn, OpenADR, IEEE 2030.5 and OCPP.", 0.6, 6.42, 12.13, 0.5, { fs: 11, color: C.accent3, name: "Source line" });

  s.addNotes(
`WHAT TO SAY (about 2 minutes)
Read the diagram left to right. The battery talks to the charger over ISO 15118-20, which is the vehicle-to-charger standard that supports two-way power. The charger talks to the aggregator's platform over OCPP; version 2.1 added bidirectional (V2X) support. Those are control protocols: they decide who charges or discharges and how fast. DEG does not replace them.
The last link is different. Between the aggregator and the DISCOM we need a contract: how many kW, in which time slots, measured against which baseline, and who pays what. Beckn carries that deal, and OpenADR is the common alternative for plain event signals. That is where DEG fits.
Three modes: V1G only slows or delays charging, and DEG demand flexibility already covers it. V2H powers a building, so there is no export to meter. V2G sends power back to the grid, and that is the gap.

SOURCES AND STATUS
- DEG schema has EV_V2G with maxImportKw/maxExportKw and a v2xProtocol enum (ISO 15118-20, OCPP 2.1 BPT). [R] E1, E4 (validator accepts it, tested).
- MoP EV charging guidelines, 17 Sep 2024: defines a Beckn-based UEI (p.4); operators "may adopt" UEI, OCPP, OCPI or OpenADR for DISCOM demand response (p.9); V2G "may be enabled" by the distribution licensee (cl.18, p.12). Everything is permissive. [R] E14, E15, copy in aggregation-v2g/sources/.
- BRPL NIT 1372 names Beckn, OpenADR, IEEE 2030.5, OCPP; V2G is "illustrative, forward-looking, not mandatory". [R] E12.
- CEA V2G minutes: V2H avoids the metering issue that V2G has (p.56). [R] E16.
- OCPP 2.1 and ISO 15118-20 capabilities are stated from the standards bodies' public descriptions, not re-read from the specifications for this deck.`);
}

// =====================================================================
// SLIDE 3: how V2G fits in (sequence)
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "V2G pitch" });
  s.addText("3  |  THE IDEA", { placeholder: "eyebrow" });
  s.addText("How V2G plugs into DEG, Beckn and IES", { placeholder: "title" });

  const LX = [1.75, 4.75, 7.75]; // lifelines: fleet, aggregator, DISCOM
  const heads = [["Fleet and chargers", "drivers, EV_V2G, sub-meters"], ["Aggregator", "the offering side (BPP)"], ["DISCOM", "the asking side (BAP)"]];
  heads.forEach((h, i) => {
    box(s, [
      { text: h[0], options: { bold: true, fontSize: 14, breakLine: true } },
      { text: h[1], options: { fontSize: 11 } },
    ], LX[i] - 1.15, 1.7, 2.3, 0.62, { fill: C.background2, line: C.accent3, color: C.text1, name: "Lifeline head " + h[0] });
    s.addShape(pres.shapes.LINE, { x: LX[i], y: 2.32, w: 0, h: 4.1, line: { color: C.accent3, width: 1, dashType: "dash" }, objectName: "Lifeline " + h[0] });
  });

  const RAIL = { beckn: C.accent1, ies: C.accent6, ocpp: C.accent3 };
  const msgs = [
    { from: 0, to: 1, rail: "ies", text: "Driver grants consent to control the chargers" },
    { from: 1, to: 2, rail: "beckn", text: "Offer: V2G chargers and max export kW" },
    { from: 2, to: 1, rail: "beckn", text: "Select, init, confirm: kW per slot, baseline, recovery cap" },
    { from: 1, to: 0, rail: "ocpp", text: "Dispatch: slow down, then export" },
    { from: 0, to: 2, rail: "ies", text: "Sub-meter readings: the evidence for payment" },
    { from: 2, to: 1, rail: "beckn", text: "Status: delivered vs baseline, then settlement" },
  ];
  msgs.forEach((m, i) => {
    const y = 2.95 + i * 0.66;
    const x1 = LX[m.from], x2 = LX[m.to];
    arrow(s, x1, y, x2, y, { color: RAIL[m.rail], w: 2.5, name: "Message " + (i + 1) });
    dot(s, i + 1, x1 - 0.15, y - 0.15, 0.3, RAIL[m.rail]);
    const left = Math.min(x1, x2) + 0.2, w = Math.abs(x2 - x1) - 0.3;
    s.addText(m.text, { x: left, y: y - 0.52, w, h: 0.46, fontSize: 12, color: C.text1, align: "center", valign: "bottom", margin: 0, isTextBox: true, objectName: "Message label " + (i + 1), fill: { color: "FFFFFF" } });
  });

  // rail legend
  [["Beckn: the deal", C.accent1, 0.6], ["IES: consent and meter data", C.accent6, 3.0], ["OCPP: device control, outside DEG", C.accent3, 6.1]].forEach((l, i) => {
    s.addShape(pres.shapes.LINE, { x: l[2], y: 6.7, w: 0.45, h: 0, line: { color: l[1], width: 3 }, objectName: "Legend line " + (i + 1) });
    txt(s, l[0], l[2] + 0.55, 6.57, 2.6, 0.26, { fs: 12, color: C.text1, valign: "middle", name: "Legend text " + (i + 1) });
  });

  // right panel
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.2, y: 1.7, w: 3.53, h: 2.6, rectRadius: 0.08, fill: { color: C.accent4 }, line: { color: C.accent1, width: 1.25 }, objectName: "Exists card" });
  txt(s, "Already in DEG", 9.42, 1.82, 3.1, 0.34, { fs: 16, bold: true, color: C.accent1, head: true, name: "Exists heading" });
  s.addText([
    { text: "EV_V2G resource type", options: { bullet: true, breakLine: true } },
    { text: "Demand-flex contract: kW per slot, baseline, payment", options: { bullet: true, breakLine: true } },
    { text: "Signed messages, shared registry", options: { bullet: true, breakLine: true } },
    { text: "A consent object, unchecked", options: { bullet: true } },
  ], { x: 9.42, y: 2.22, w: 3.15, h: 2.0, fontSize: 15, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 5, isTextBox: true, objectName: "Exists list" });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.2, y: 4.45, w: 3.53, h: 1.97, rectRadius: 0.08, fill: { color: C.accent5 }, line: { color: C.accent2, width: 1.25 }, objectName: "Missing card" });
  txt(s, "Not there yet", 9.42, 4.57, 3.1, 0.34, { fs: 16, bold: true, color: C.accent2, head: true, name: "Missing heading" });
  s.addText([
    { text: "A V2G flow in any devkit", options: { bullet: true, breakLine: true } },
    { text: "A rule for per-vehicle metering", options: { bullet: true, breakLine: true } },
    { text: "A check that consent was given", options: { bullet: true } },
  ], { x: 9.42, y: 4.97, w: 3.15, h: 1.35, fontSize: 15, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 5, isTextBox: true, objectName: "Missing list" });

  s.addNotes(
`WHAT TO SAY (about 2 minutes)
The proposal is one idea: treat managed charging and V2G export as two modes of one flexibility contract, using what DEG already has.
Walk the six arrows. (1) The driver gives the aggregator consent to control the chargers; in the proposal IES carries that consent. (2) The aggregator publishes an offer: which chargers, and how much they can export. (3) The DISCOM selects, negotiates and confirms: kW per time slot, how the baseline is computed, and a recovery cap. These three steps are Beckn messages. (4) On the day, the aggregator dispatches the chargers over OCPP, which is outside DEG. (5) Sub-meter readings of the chargers are the evidence. (6) The DISCOM checks delivered against baseline and settles.
The right-hand boxes set up the next slide: the contract mostly exists; three pieces are missing.

SOURCES AND STATUS
- Offer, select, init, confirm and status are the existing demand-flex flow in beckn/DEG devkits/demand-flex. [R] E2.
- Consent: a DER_CONTROL consent set to granted validates, but nothing in demand-flex references or verifies it, and the schema has no scope for it. [T][R] E10, E11. Carrying it over IES is our proposal; it is not an existing integration.
- Meter data over IES is a proposal too. The demand-flex devkit takes meter data from the utility side today.
- Dispatch over OCPP is outside the contract: the vehicle state (charge level, departure time) stays inside the aggregator. [S] item B.
- This is a software-only proof of concept; no field pilot exists. Whether any of it goes into the public DEG repository is a separate organisation decision.`);
}

// =====================================================================
// SLIDE 4: what we tested + proposal
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "V2G pitch" });
  s.addText("4  |  PROOF OF CONCEPT AND PROPOSAL", { placeholder: "eyebrow" });
  s.addText("The DEG contract mostly works for V2G, with three gaps", { placeholder: "title" });

  // chart: one simulated evening at the depot meter (closed_loop_day_trace.json)
  const labels = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "00:00", "00:30", "01:00"];
  const baseline = [57.18, 54.49, 32.1, 2.22, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const immediate = [-55.53, -58.22, -80.61, -110.49, 155.4, 155.4, 137.66, 57.35, 0.36, 0, 0, 0, 0];
  const spread = [-55.53, -58.22, -80.61, -110.49, 25.31, 25.31, 25.31, 25.31, 25.31, 25.31, 25.31, 25.31, 25.31];
  s.addChart(pres.charts.LINE, [
    { name: "Normal use (baseline)", labels, values: baseline },
    { name: "Cars recharge at once", labels, values: immediate },
    { name: "Cars recharge gently", labels, values: spread },
  ], {
    x: 0.6, y: 1.7, w: 7.45, h: 3.55,
    chartColors: [HEX.grey, HEX.amber, HEX.teal], lineSize: 3, lineDataSymbol: "none", lineSmooth: false,
    showTitle: true, title: "Depot meter power in kW (below zero = exporting to the grid)", titleFontSize: 14, titleColor: "12344D", titleFontFace: "+mn-lt",
    showLegend: true, legendPos: "b", legendFontSize: 12, legendColor: "1B2430", legendFontFace: "+mn-lt",
    catAxisLabelFontSize: 11, catAxisLabelColor: "5B6877", catAxisLabelFontFace: "+mn-lt", catAxisLabelFrequency: 2, catAxisLabelPos: "low",
    valAxisLabelFontSize: 11, valAxisLabelColor: "5B6877", valAxisLabelFontFace: "+mn-lt",
    valAxisMinVal: -120, valAxisMaxVal: 180, valAxisMajorUnit: 60,
    valGridLine: { color: "E1E7EC", size: 0.75 }, catGridLine: { style: "none" },
    objectName: "Depot trace chart",
  });
  txt(s, "One simulated evening, 21 cars present. The 7 to 9 pm event is the dip, then the cars recharge. Gentle recharging continues at 25 kW until 07:30. These are assumptions, not field results.", 0.6, 5.3, 7.45, 0.6, { fs: 12, color: C.accent3, name: "Chart caption" });
  box(s, [
    { text: "Works today:  ", options: { bold: true, color: C.accent1 } },
    { text: "export settles, sub-meters settle, EV_V2G passes validation." },
  ], 0.6, 5.95, 7.45, 0.4, { fill: C.accent4, color: C.text1, fs: 14, align: "left", margin: 11, name: "Works today" });

  const cards = [
    ["A", "Double counting", "Meters nested inside each other were paid twice: \u20B987.50 for a true \u20B937.50. A fix pays \u20B937.50. Tested on a live signed stack."],
    ["C", "Consent unchecked", "A granted control consent is valid, but nothing verifies it and the schema gives it no scope. Needs a programme decision."],
    ["D", "Rebound", "Recharging at once makes a new peak. Today both ways of recharging earn \u20B9785. With a recovery cap: \u20B9506 at once, \u20B9785 gently."],
  ];
  cards.forEach((c, i) => {
    const y = 1.7 + i * 1.55;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.35, y, w: 4.38, h: 1.4, rectRadius: 0.08, fill: { color: C.accent5 }, line: { color: C.accent2, width: 1.25 }, objectName: "Gap card " + c[0] });
    dot(s, c[0], 8.55, y + 0.14, 0.34, HEX.amber === "" ? C.accent2 : C.accent2);
    txt(s, c[1], 9.0, y + 0.13, 3.55, 0.36, { fs: 16, bold: true, color: C.text2, head: true, valign: "middle", name: "Gap title " + c[0] });
    txt(s, c[2], 8.55, y + 0.56, 4.05, 0.8, { fs: 14, name: "Gap text " + c[0] });
  });

  box(s, [
    { text: "What we want from this workshop:  ", options: { bold: true, color: C.accent1 } },
    { text: "reactions to the idea, pointers to who owns a pilot, and guidance on where a proposal like this should go." },
  ], 0.6, 6.45, 12.13, 0.5, { fill: C.background2, color: C.text2, fs: 14, align: "left", margin: 14, name: "Ask" });

  s.addNotes(
`WHAT TO SAY (about 2 minutes)
We ran a software-only proof: real signed Beckn messages through the demand-flex devkit, with simulated vehicles. The good news first: signed export already settles correctly, charger sub-meters settle correctly, and V2G resources pass the live validator. So the contract mostly works.
We found three gaps. A, double counting: if a meter and the sub-meter inside it are both enrolled, the same kilowatts are paid twice, 87.50 rupees for a true 37.50. A small policy change fixes it and was tested live. C, consent: a granted control consent is valid but nothing checks it. D, rebound: the chart shows the evening. The dip is the depot exporting. If the cars then recharge at once, the meter spikes to about 155 kW; if they recharge gently it stays near 25 kW. Today the contract pays both the same. A recovery cap makes recharging at once earn 506 rupees a day against 785 for gentle recharging.
Be clear about limits: this is simulation and software tests. The depot, vehicles and prices are assumptions. No field pilot, no claim about legality or tariff.
The ask: reactions, pointers to who owns a pilot (BRPL's Phase 2 pilot clusters in Apr-Aug 2027 are the only dated door found), and guidance on where a proposal like this belongs.

SOURCES AND STATUS (all in V2G-Proposal-and-Prototype-Plan.md)
- Chart: poc/closed_loop_day_trace.json, one simulated evening, 30-minute slots, commitment 112.2 kW, 21 cars present. [S]
- A: E6, E7. Live 87.50 vs 37.50; fix tested, 18/18 policy tests. [T]
- C: E10, E11. [T][R]
- D: E22, E23. Mean per day over 400 simulated days: 785 today; with cap 506 (recharge at once) and 785 (gentle). Live stack one median day: 496.11 and 785.47. Four conditions apply (window must run to departure, cap above physical minimum, a clean recovery marker needs a schema change, policy must suit the adapter engine). [T][S]
- Works today: E3, E4, E5. Note: that export beyond the offer is not paid was tested at policy level only. [T]
- Rebound spike value 155 kW is the immediate-recharge case in this trace; the earlier 125.8 kW figure came from the older fixed-export model.
- Not claimed: that V2G export is legal or has a tariff anywhere, that the guidelines require Beckn, that the simulated depot resembles a real one, or that a BRPL pilot will take a V2G proposal. [E12, E14, E15, E17]`);
}

pres.writeFile({ fileName: OUT }).then(async () => {
  await applyTheme(OUT, THEME);
  console.log("written", OUT);
});
