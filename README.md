# vuex-mock-context

Test mock for vuex context

## Install

`npm install vuex-mock-context -D`

or

`yarn add vuex-mock-context -D`

## Why

For testing that vuex actions commit mutations and dispatch actions as expected.

See [Composing Actions](https://vuex.vuejs.org/en/actions.html) in the Vuex docs.

## Usage

### action

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

### test

```js
import {create} from 'vuex-mock-context';
import actions from './actions';

describe('save action', function() {
  it('updates existing thing', function() {
    // set up mock context
    const context = create();
    context.getters.exists = true;

    const payload = {
      name: 'blah'
    };

    // invoke action handler
    return actions.save(context, payload)
      .then(() => {
        // verify context used as expected
        assert.deepEquals(context.log, [
          {mutation: ['INCREMENT_SAVE_COUNT']},
          {action: ['update', {name: 'blah'}]}
        ]);
      });
  });

  it('creates non-existent thing', function() {
    // set up mock context
    const context = create();
    context.getters.exists = false;

    const payload = {
      name: 'blah'
    };

    // invoke action handler
    return actions.save(context, payload)
      .then(() => {
        // verify context used as expected
        assert.deepEquals(context.log, [
          {mutation: ['INCREMENT_SAVE_COUNT']},
          {action: ['create', {name: 'blah'}]}
        ]);
      });
  });
});
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
