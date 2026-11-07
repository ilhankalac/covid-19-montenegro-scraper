const test = require('node:test');
const assert = require('node:assert');
const { parseReport } = require('./parse');

const report = 'Presjek stanja\nObjavljeno: 12.03.2022. 14:00\nPodgorica\n120\nRožaje\n17\nPljevlja\n4\n';

test('reads date and active cases for the given city', () => {
  assert.deepStrictEqual(parseReport(report, 'Rožaje'), { date: '12.03.2022.', activeCases: '17' });
  assert.deepStrictEqual(parseReport(report, 'Podgorica'), { date: '12.03.2022.', activeCases: '120' });
});

test('returns null when the city is not in the report', () => {
  assert.strictEqual(parseReport(report, 'Kotor'), null);
});

test('returns null when the page has no report', () => {
  assert.strictEqual(parseReport('Nothing here', 'Rožaje'), null);
});
