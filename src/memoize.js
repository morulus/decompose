import { defFactory } from './internals/helpers';

function strictEqual(a, b) {
  return a === b;
}

function shallowEqualArgs(isEqual, prevArgs, nextArgs) {
  if (prevArgs === undefined || prevArgs.length !== nextArgs.length) {
    return false;
  }
  const length = Math.max(prevArgs.length, nextArgs.length);
  for (let i = 0; i < length; i++) {
    if (!isEqual(prevArgs[i], nextArgs[i])) {
      return false;
    }
  }
  return true;
}

export default defFactory('memoize', function memoize(selector, isEqual = strictEqual) {
  const nextName = `memoize${selector.name || ''}`;
  let cachedArgs;
  let cachedResult;
  const _ = {
    [nextName]: function (...args) {
      if (shallowEqualArgs(isEqual, cachedArgs, args)) {
        return cachedResult;
      }
      cachedArgs = args;
      cachedResult = selector(...args);
      return cachedResult;
    },
  };

  return _[nextName];
});
