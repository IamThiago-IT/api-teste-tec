import { computeMonthlyContribution } from '../../src/modules/suggestions/suggestions.service';

test('compute monthly contribution basic', () => {
  // target 1200 in 12 months, start 0, 0% rate -> monthly 100
  const p = computeMonthlyContribution(0, 1200, 12, 0);
  expect(Math.round(p)).toBe(100);
});
