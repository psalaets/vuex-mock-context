const test = require('tape');
const {create, normalizePayload} = require('./dist/index.js');

test('dispatch action', (t) => {
  t.plan(1);
  const mockContext = create();

  mockContext.dispatch('loadRecord', {
    id: 5,
    blah: 'foo',
  });

  t.deepEqual(mockContext.log, [
    {dispatch: ['loadRecord', {
      id: 5,
      blah: 'foo'
    }]}
  ]);
});

test('dispatch action with primitive payload', (t) => {
  t.plan(1);
  const mockContext = create();

  mockContext.dispatch('loadRecord', 5);

  t.deepEqual(mockContext.log, [
    {dispatch: ['loadRecord', 5]}
  ]);
});

test('commit mutation', (t) => {
  t.plan(1);
  const mockContext = create();

  mockContext.commit('changeState', {
    id: 1
  });

  t.deepEqual(mockContext.log, [
    {commit: ['changeState', {
      id: 1
    }]}
  ]);
});

test('commit mutation with primitive payload', (t) => {
  t.plan(1);
  const mockContext = create();

  mockContext.commit('changeState', 'dog');

  t.deepEqual(mockContext.log, [
    {commit: ['changeState', 'dog']}
  ]);
});

test('actions and mutations', (t) => {
  t.plan(1);
  const mockContext = create();

  mockContext.dispatch('loadRecord', {
    id: 5,
    blah: 'foo',
  });

  mockContext.commit('changeState', {
    id: 1
  });

  mockContext.commit('changeStateAgain', {
    id: 10
  });

  t.deepEqual(mockContext.log, [
    {dispatch: ['loadRecord', {
      id: 5,
      blah: 'foo'
    }]},
    {commit: ['changeState', {
      id: 1
    }]},
    {commit: ['changeStateAgain', {
      id: 10
    }]}
  ]);
});

test('context has provided getters', (t) => {
  t.plan(1);
  const mockContext = create({
    name: 'bob',
    count: 9
  });

  t.deepEqual(mockContext.getters, {
    name: 'bob',
    count: 9
  });
});

test('getters defaults to empty', (t) => {
  t.plan(1);
  const mockContext = create();

  t.deepEqual(mockContext.getters, {});
});

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
