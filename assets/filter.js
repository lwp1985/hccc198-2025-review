/**
 * Pure search used by the static site and by node:test.
 * Records stay in page HTML; this only decides which ids remain visible.
 */

export function filterRecords(records, query = {}) {
  const text = String(query.text || "").trim().toLowerCase();
  const epistemic = query.epistemic || "";
  const analysisLabel = query.analysisLabel || "";
  const personId = query.personId || "";
  const phase = query.phase || "";
  const hearingDate = query.hearingDate || "";

  return records.filter((record) => {
    if (epistemic && record.epistemic !== epistemic) return false;
    if (analysisLabel && record.analysisLabel !== analysisLabel) return false;
    if (personId && !(record.personIds || []).includes(personId)) return false;
    if (phase && record.phase !== phase) return false;
    if (hearingDate && record.hearingDate !== hearingDate) return false;
    if (text) {
      const haystack = [
        record.id,
        record.title,
        record.summary,
        record.limits,
        record.analysisLabel,
        record.epistemic,
        ...(record.tags || []),
      ]
        .filter(Boolean)
        .join("\n")
        .toLowerCase();
      if (!haystack.includes(text)) return false;
    }
    return true;
  });
}

export function testimonyIsCompleted(hearing) {
  if (!hearing || hearing.testimonyCompleted !== true) return false;
  return hearing.testimonyState === "stood-down-reported";
}
