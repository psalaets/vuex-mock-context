export function create() {
  const log = [];

  return {
    log,
    getters: {},
    rootGetters: {},
    state: {},
    rootState: {},
    dispatch(...args) {
      log.push({dispatch: args});
    },
    commit(...args) {
      log.push({commit: args});
    }
  };
}
