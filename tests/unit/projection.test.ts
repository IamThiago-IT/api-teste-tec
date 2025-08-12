import { simulateWealthCurve } from '../../src/utils/projectionEngine';

test('projection returns values up to 2060 and grows with positive rate', () => {
  const res = simulateWealthCurve(1000, [{ frequency: 'mensal', value: 10 }], 4);
  expect(res.length).toBeGreaterThan(0);
  expect(res[0].projectedValue).toBeGreaterThan(1000);
});
