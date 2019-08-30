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
  return context.dispatch('update', payload);
}
```

You can test it like this

```js
import {create} from 'vuex-mock-context';
import actions from './actions';

test('save action increments count and then updates', function() {
  // set up mock context
  const context = create();

  // invoke action handler
  return actions.save(context, {value: 'whatever'})
    .then(() => {
      // verify context interactions
      assert.deepEquals(context.log, [
        {mutation: ['INCREMENT_SAVE_COUNT']},
        {action: ['update', {value: 'whatever'}]}
      ]);
    });
});
```

## Snapshot testing

If you are using [Jest](https://facebook.github.io/jest/) or some other framework that supports snapshot testing, capture and verify `context.log` with a snapshot:

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

Array of objects that represent context interactions. There are two types of interactions:

#### 1. mutation

```js
{mutation: [<args passed to commit>]}
```

For example

```js
context.commit('DO_SOMETHING', {value: 1});
```

becomes

```js
{mutation: ['DO_SOMETHING', {value: 1}]}
```

#### 2. action

```js
{action: [<args passed to dispatch>]}
```

For example

```js
context.dispatch('save', {id: 5});
```

becomes

```js
{action: ['save', {id: 5}]}
```

### mockContext.state
### mockContext.getters
### mockContext.rootState
### mockContext.rootGetters

All of these start off as an empty object. You can add properties as needed.

## License

MIT
