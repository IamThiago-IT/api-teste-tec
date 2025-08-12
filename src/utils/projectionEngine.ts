export function simulateWealthCurve(initialValue: number, events: any[], ratePercent: number) {
  const results: { year: number; projectedValue: number }[] = [];
  const monthlyRate = ratePercent / 100 / 12;
  let currentValue = initialValue;
  const startYear = new Date().getFullYear();

  for (let year = startYear; year <= 2060; year++) {
    for (let month = 0; month < 12; month++) {
      currentValue = currentValue * (1 + monthlyRate);
      for (const ev of events || []) {
        if (ev.frequency === 'mensal') currentValue += ev.value;
        if (ev.frequency === 'anual' && month === 0) currentValue += ev.value;
        if (ev.frequency === 'única' && year === startYear && month === 0) currentValue += ev.value;
      }
    }
    results.push({ year, projectedValue: Number(currentValue.toFixed(2)) });
  }
  return results;
}
