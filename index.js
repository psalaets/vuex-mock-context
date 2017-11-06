export function create(actionHandler = defaultActionHandler) {
  const log = [];

  return {
    log,
    getters: {},
    rootGetters: {},
    state: {},
    rootState: {},
    dispatch(...args) {
      log.push({dispatch: args});
      return actionHandler(...args);
    },
    commit(...args) {
      log.push({commit: args});
    }
  };
}

function defaultActionHandler() {
  return Promise.resolve();
}