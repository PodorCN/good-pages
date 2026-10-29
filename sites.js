// The list. To add a site, copy an entry and edit it.
// category must be one of the keys in CATEGORIES below.
window.CATEGORIES = [
  { key: "knowledge",  label: "Knowledge",  note: "References and notes worth rereading." },
  { key: "simulation", label: "Simulation", note: "Games and sandboxes that teach by doing." },
  { key: "news",       label: "News",       note: "Sources I check on purpose." },
  { key: "tools",      label: "Tools",      note: "Live dashboards and utilities I keep open." }
];

window.SITES = [
  {
    name: "Crude Desk",
    url: "https://crudedeskgame.com/",
    category: "simulation",
    blurb: "A browser game that puts you on a crude oil trading desk, reacting to headlines and managing a book.",
    added: "2026-10-17"
  },
  {
    name: "QuantMemo",
    url: "https://quantmemo.com/",
    category: "knowledge",
    blurb: "Short, focused memos on quant finance concepts for review and interview prep.",
    added: "2026-10-17"
  },
  {
    name: "I \u2661 VOL",
    url: "https://ilovevol.app/",
    category: "tools",
    blurb: "Free live SPX gamma exposure (GEX) by strike, with gamma flip, call/put walls, and charm and vanna exposure; NDX, RUT and VIX too.",
    added: "2026-10-29"
  }
];
