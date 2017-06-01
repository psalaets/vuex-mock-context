const test = require('tape');
const {normalizePayload} = require('./dist/index.js');

test('normalizePayload with type only', (t) => {
  t.plan(1);

  const result = normalizePayload('loadRecord');

  t.deepEqual(result, ['loadRecord']);
});

test('normalizePayload with everything in payload', (t) => {
  t.plan(1);

  const payload = {
    type: 'loadRecord',
    id: 5,
    blah: 'foo'
  };
  const result = normalizePayload(payload);

  t.deepEqual(result, ['loadRecord', {
    type: 'loadRecord',
    id: 5,
    blah: 'foo'
  }]);
});

test('normalizePayload with type and payload', (t) => {
  t.plan(1);

  const payload = {
    id: 5,
    blah: 'foo'
  };
  const result = normalizePayload('loadRecord', payload);

  t.deepEqual(result, ['loadRecord', {
    id: 5,
    blah: 'foo'
  }]);
});
