const test = require('node:test');
const assert = require('node:assert');
const { parseReport } = require('./parse');

test('reads date and active cases for Rožaje', () => {
  const text = 'Presjek stanja\nObjavljeno: 12.03.2022. 14:00\nPodgorica\n120\nRožaje\n17\nPljevlja\n4\n';
  assert.deepStrictEqual(parseReport(text), { date: '12.03.2022.', activeCases: '17' });
});

test('returns null when the page has no report', () => {
  assert.strictEqual(parseReport('Nothing here'), null);
});
