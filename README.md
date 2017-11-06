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

```js
import {create} from 'vuex-mock-context';
import actions from './my-vuex-actions';

describe('actions', function() {
  it('doSomething', function() {
    const context = create();

    return actions.doSomething(context, payload)
      .then(() => {
        // see API section below for what context.log will look like
        assert.deepEquals(context.log, expected);
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

### mockContext.dispatch()

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
