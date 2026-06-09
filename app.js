/* ═══════════════════════════════════════════════════════
   MB Hyd Insurance Priority Checker — App Logic
   Depends on: config.js (must load before this file)
   ═══════════════════════════════════════════════════════ */

(function () {

  // ── State ──────────────────────────────────────────────
  let selectedSlab  = CONFIG.slabs[5].key;   // default: 87.5-90.5
  let selectedVtype = "ICE";

  // ── DOM refs ───────────────────────────────────────────
  const slabSelect  = document.getElementById("slab-select");
  const vtoggleICE  = document.getElementById("vtype-ice");
  const vtoggleEV   = document.getElementById("vtype-ev");
  const tbody       = document.getElementById("results-body");
  const monthLabel  = document.getElementById("month-label");

  // ── Boot ───────────────────────────────────────────────
  function init() {
    // Populate month from config
    monthLabel.textContent = CONFIG.month;

    // Populate slab dropdown from config
    CONFIG.slabs.forEach(function (s) {
      const opt = document.createElement("option");
      opt.value = s.key;
      opt.textContent = s.label;
      if (s.key === selectedSlab) opt.selected = true;
      slabSelect.appendChild(opt);
    });

    // Bind events
    slabSelect.addEventListener("change", function () {
      selectedSlab = this.value;
      render();
    });

    vtoggleICE.addEventListener("click", function () {
      selectedVtype = "ICE";
      updateToggle();
      render();
    });

    vtoggleEV.addEventListener("click", function () {
      selectedVtype = "EV";
      updateToggle();
      render();
    });

    render();
  }

  // ── Toggle UI ──────────────────────────────────────────
  function updateToggle() {
    vtoggleICE.classList.toggle("active", selectedVtype === "ICE");
    vtoggleEV.classList.toggle("active",  selectedVtype === "EV");
  }

  // ── Render table ───────────────────────────────────────
  function render() {
    const payouts   = CONFIG[selectedVtype][selectedSlab];
    const tiebreaks = CONFIG.tiebreaks[selectedVtype];

    if (!payouts) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:2rem;color:#6b6b6b;">No data for this selection.</td></tr>';
      return;
    }

    // Sort companies by payout desc (tiebreak included for stable order)
    const sorted = Object.entries(payouts)
      .map(function ([co, pct]) {
        return { co: co, pct: pct, sort: pct + (tiebreaks[co] || 0) };
      })
      .sort(function (a, b) { return b.sort - a.sort; });

    const labels    = ["Priority 1", "Priority 2", "Priority 3", "Priority 4"];
    const rankClass = ["rank-1",     "rank-2",      "rank-3",     "rank-4"];

    tbody.innerHTML = sorted.map(function (r, i) {
      return [
        '<tr class="' + rankClass[i] + '">',
          '<td class="cell-priority">',
            '<span class="priority-tag">',
              '<span class="dot"></span>',
              labels[i],
            '</span>',
          '</td>',
          '<td class="cell-company">' + escHtml(r.co) + '</td>',
          '<td class="cell-payout">' + r.pct.toFixed(2) + '%</td>',
        '</tr>'
      ].join('');
    }).join('');
  }

  // ── Util ───────────────────────────────────────────────
  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ── Start ──────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
