/**
 * MB Hyd Insurance Priority Checker — Payout Configuration
 * ─────────────────────────────────────────────────────────
 * Edit this file every month to update payout percentages.
 * Do NOT change the structure — only change the numeric values.
 *
 * Last updated: June 2026
 */

const CONFIG = {

  // ── Month label shown on the page ──────────────────────────────────────
  month: "June 2026",

  // ── Discount slabs ─────────────────────────────────────────────────────
  // These are the dropdown options. Change labels if needed, but keep keys
  // matching the keys in ICE and EV blocks below.
  slabs: [
    { key: "upto70",     label: "Upto 70%" },
    { key: "70.1-75",    label: "70.1 – 75%" },
    { key: "75.1-80",    label: "75.1 – 80%" },
    { key: "80.1-85",    label: "80.1 – 85%" },
    { key: "85.1-87",    label: "85.1 – 87%" },
    { key: "87.1-90",    label: "87.1 – 90%" },
    { key: "90.1-95",    label: "90.1 – 95%" },
    { key: "95.1above",  label: "95.1% Above" },
    { key: "100",        label: "100%" }
  ],

  // ── ICE Vehicle payouts ────────────────────────────────────────────────
  // Format: "slab-key": { ICICI: %, Reliance: %, BAJAJ: %, TATA: % }
  ICE: {
    "upto70":    { ICICI: 57.5, Reliance: 52.5, BAJAJ: 37.5, TATA: 42.0 },
    "70.1-75":   { ICICI: 52.5, Reliance: 47.5, BAJAJ: 37.5, TATA: 42.0 },
    "75.1-80":   { ICICI: 47.5, Reliance: 42.5, BAJAJ: 37.5, TATA: 42.0 },
    "80.1-85":   { ICICI: 42.5, Reliance: 37.5, BAJAJ: 37.5, TATA: 32.0 },
    "85.1-87":   { ICICI: 33.5, Reliance: 32.5, BAJAJ: 37.5, TATA: 32.0 },
    "87.1-90":   { ICICI: 33.5, Reliance: 32.5, BAJAJ: 37.5, TATA: 32.0 },
    "90.1-95":   { ICICI: 27.5, Reliance: 17.0, BAJAJ: 22.5, TATA: 32.0 },
    "95.1above": { ICICI: 27.5, Reliance: 17.0, BAJAJ: 22.5, TATA: 32.0 },
    "100":       { ICICI: 17.0, Reliance: 17.0, BAJAJ: 17.0, TATA: 17.0 }
  },

  // ── EV Vehicle payouts ─────────────────────────────────────────────────
  EV: {
    "upto70":    { ICICI: 57.5, Reliance: 52.5, BAJAJ: 37.5, TATA: 17.0 },
    "70.1-75":   { ICICI: 52.5, Reliance: 47.5, BAJAJ: 37.5, TATA: 17.0 },
    "75.1-80":   { ICICI: 47.5, Reliance: 42.5, BAJAJ: 37.5, TATA: 17.0 },
    "80.1-85":   { ICICI: 42.5, Reliance: 37.5, BAJAJ: 37.5, TATA: 17.0 },
    "85.1-87":   { ICICI: 33.5, Reliance: 32.5, BAJAJ: 37.5, TATA: 17.0 },
    "87.1-90":   { ICICI: 33.5, Reliance: 32.5, BAJAJ: 37.5, TATA: 17.0 },
    "90.1-95":   { ICICI: 27.5, Reliance: 17.0, BAJAJ: 22.5, TATA: 17.0 },
    "95.1above": { ICICI: 27.5, Reliance: 17.0, BAJAJ: 22.5, TATA: 17.0 },
    "100":       { ICICI: 17.0, Reliance: 17.0, BAJAJ: 17.0, TATA: 17.0 }
  },

  // ── Tie-breaking rules ─────────────────────────────────────────────────
  // When two companies have equal payout, the one with 0.00001 ranks higher.
  // ICE: ICICI wins ties. EV: Reliance & BAJAJ win ties over TATA.
  tiebreaks: {
    ICE: { ICICI: 0.00001, Reliance: 0,       BAJAJ: 0,       TATA: 0       },
    EV:  { ICICI: 0,       Reliance: 0.00001,  BAJAJ: 0.00001, TATA: 0.00001 }
  }

};
