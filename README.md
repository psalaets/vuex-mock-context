# vuex-mock-context

[![Build Status](https://travis-ci.com/psalaets/vuex-mock-context.svg?branch=master)](https://travis-ci.com/psalaets/vuex-mock-context)
[![Greenkeeper badge](https://badges.greenkeeper.io/psalaets/vuex-mock-context.svg)](https://greenkeeper.io/)

Test mock for vuex context

## Install

`npm install vuex-mock-context -D`

## Why

For testing that vuex actions commit mutations and dispatch actions as expected.

See [Composing Actions](https://vuex.vuejs.org/guide/actions.html#composing-actions) in the Vuex docs.

## Usage

You have this vuex action

```js
save(context, payload) {
  context.commit('INCREMENT_SAVE_COUNT');

  if (context.getters.exists) {
    return context.dispatch('update', payload);
  } else {
    return context.dispatch('create', payload);
  }
}
```

You can test it like this

```js
import {create} from 'vuex-mock-context';
import actions from './actions';

describe('save action', function() {
  it('updates if exists', function() {
    // set up mock context
    const context = create();
    context.getters.exists = true;

    // invoke action handler
    return actions.save(context)
      .then(() => {
        // verify context used as expected
        assert.deepEquals(context.log, [
          {mutation: ['INCREMENT_SAVE_COUNT']},
          {action: ['update', {value: 'whatever'}]}
        ]);
      });
  });

  it('creates if not exists', function() {
    // set up mock context
    const context = create();
    context.getters.exists = false;

    // invoke action handler
    return actions.save(context)
      .then(() => {
        // verify context used as expected
        assert.deepEquals(context.log, [
          {mutation: ['INCREMENT_SAVE_COUNT']},
          {action: ['create', {value: 'whatever'}]}
        ]);
      });
  });
});
```

## Snapshot testing

If you are using [Jest](https://facebook.github.io/jest/) or some other framework that supports snapshot testing, verify `context.log` with a snapshot:

```js
expect(context.log).toMatchSnapshot();
```

## API

```js
import {create} from 'vuex-mock-context';
```
### const mockContext = create(actionHandler)

Create a mock context.

`actionHandler` is an optional function that receives all parameters sent to `dispatch()` and returns a `Promise` which will be the return value of `dispatch()`. Defaults to function that returns a resolved `Promise` with undefined value.

### mockContext.commit()

Just like `context.commit()` in vuex.

### mockContext.dispatch()

Just like `context.dispatch()` in vuex.

Return value is determined by `actionHandler`, see above.

### mockContext.log

Array of objects.

- For a mutation commit, object will be:

```js
{mutation: [<arguments sent to commit>]}
```

- For an action dispatch, object will be:

```js
{action: [<arguments sent to dispatch>]}
```

### mockContext.state

Empty object. Attach your own values here.

### mockContext.getters

Empty object. Attach your own values here.

### mockContext.rootState

Empty object. Attach your own values here.

### mockContext.rootGetters

Empty object. Attach your own values here.

## License

MIT
