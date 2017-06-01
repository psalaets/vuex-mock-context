export function create(getters = {}) {
  const log = [];

  return {
    log,
    getters,
    dispatch(...args) {
      log.push({
        action: normalizePayload(...args)
      });
    },
    commit(...args) {
      log.push({
        mutation: normalizePayload(...args)
      });
    }
  };
}

export function normalizePayload(...args) {
  let parts;

  if (args.length == 1) {
    if (typeof args[0] == 'string') {
      // just a type string
      parts = [args[0]];
    } else {
      // type is property in payload object
      parts = [args[0].type, args[0]];
    }
  } else {
    // type and payload are separate args
    parts = args.slice();
  }

  return parts;
}