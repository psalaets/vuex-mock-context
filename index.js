export function create(actionHandler = defaultActionHandler) {
  const log = [];

  return {
    log,
    getters: {},
    rootGetters: {},
    state: {},
    rootState: {},
    dispatch(...args) {
      log.push({action: args});
      return actionHandler(...args);
    },
    commit(...args) {
      log.push({mutation: args});
    }
  };
}

function defaultActionHandler() {
  return Promise.resolve();
}