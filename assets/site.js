import { filterRecords } from "./filter.js";

const form = document.querySelector("[data-filter-form]");
const dataNode = document.getElementById("record-data");
if (form && dataNode) {
  const records = JSON.parse(dataNode.textContent);
  const cards = [...document.querySelectorAll("[data-record-id]")];
  const count = document.querySelector("[data-filter-count]");

  const apply = () => {
    const query = {
      text: form.elements.text.value,
      epistemic: form.elements.epistemic.value,
      analysisLabel: form.elements.analysisLabel.value,
      personId: form.elements.personId.value,
      phase: form.elements.phase.value,
      hearingDate: form.elements.hearingDate.value,
    };
    const matched = new Set(filterRecords(records, query).map((record) => record.id));
    let shown = 0;
    for (const card of cards) {
      const visible = matched.has(card.dataset.recordId);
      card.hidden = !visible;
      if (visible) shown += 1;
    }
    if (count) count.textContent = `顯示 ${shown} 條，共 ${records.length} 條。`;
  };

  form.addEventListener("input", apply);
  form.addEventListener("change", apply);
  form.addEventListener("reset", () => {
    window.setTimeout(apply, 0);
  });
  apply();
}
