const test = require('tape');
const {create} = require('./dist/index.js');

test('dispatch', t => {
  t.test('action with no payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.dispatch('loadRecord');

    st.deepEqual(
      mockContext.log,
      [{dispatch: ['loadRecord']}]
    );
  });

  t.test('action with payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.dispatch('loadRecord', {id: 5});

    st.deepEqual(
      mockContext.log,
      [{dispatch: ['loadRecord', {id: 5}]}]
    );
  });

  t.test('action with type in payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.dispatch({type: 'loadRecord', id: 5});

    st.deepEqual(
      mockContext.log,
      [{dispatch: [{type: 'loadRecord', id: 5}]}]
    );
  });

  t.test('root action with no payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.dispatch('loadRecord', null, {root: true});

    st.deepEqual(
      mockContext.log,
      [{dispatch: ['loadRecord', null, {root: true}]}]
    );
  });

  t.test('root action with payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.dispatch('loadRecord', {id: 5}, {root: true});

    st.deepEqual(
      mockContext.log,
      [{dispatch: ['loadRecord', {id: 5}, {root: true}]}]
    );
  });

  t.test('root action with type in payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.dispatch({type: 'loadRecord', id: 5}, null, {root: true});

    st.deepEqual(
      mockContext.log,
      [{dispatch: [{type: 'loadRecord', id: 5}, null, {root: true}]}]
    );
  });
});

test('commit', t => {
  t.test('mutation with no payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.commit('changeState');

    st.deepEqual(mockContext.log, [
      {commit: ['changeState']}
    ]);
  });

  t.test('mutation with payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.commit('changeState', {id: 5});

    st.deepEqual(mockContext.log, [
      {commit: ['changeState', {id: 5}]}
    ]);
  });

  t.test('mutation with type in payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.commit({type: 'changeState', id: 5});

    st.deepEqual(mockContext.log, [
      {commit: [{type: 'changeState', id: 5}]}
    ]);
  });

  t.test('root mutation with no payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.commit('changeState', null, {root: true});

    st.deepEqual(mockContext.log, [
      {commit: ['changeState', null, {root: true}]}
    ]);
  });

  t.test('root mutation with payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.commit('changeState', {id: 5}, {root: true});

    st.deepEqual(mockContext.log, [
      {commit: ['changeState', {id: 5}, {root: true}]}
    ]);
  });

  t.test('root mutation with type in payload', st => {
    st.plan(1);
    const mockContext = create();

    mockContext.commit({type: 'changeState', id: 5}, {root: true});

    st.deepEqual(mockContext.log, [
      {commit: [{type: 'changeState', id: 5}, {root: true}]}
    ]);
  });
});

test('dispatches mixed with commits', (t) => {
  t.plan(1);
  const mockContext = create();

  mockContext.dispatch('loadRecord', {
    id: 5,
    blah: 'foo',
  });

  mockContext.commit('changeState', {
    id: 1
  });

  mockContext.commit('anotherChange', {
    id: 10
  });

  t.deepEqual(mockContext.log, [
    {dispatch: ['loadRecord', {id: 5, blah: 'foo'}]},
    {commit: ['changeState', {id: 1}]},
    {commit: ['anotherChange', {id: 10}]}
  ]);
});

test('other context properties', t => {
  t.test('getters is empty object', st => {
    st.plan(1);
    const mockContext = create();

    st.deepEqual(mockContext.getters, {});
  });

  t.test('state is empty object', st => {
    st.plan(1);
    const mockContext = create();

    st.deepEqual(mockContext.state, {});
  });

  t.test('rootGetters is empty object', st => {
    st.plan(1);
    const mockContext = create();

    st.deepEqual(mockContext.rootGetters, {});
  });

  t.test('rootState is empty object', st => {
    st.plan(1);
    const mockContext = create();

    st.deepEqual(mockContext.rootState, {});
  });
});
