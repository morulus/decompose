import { defFactory, forkResolver } from './internals/helpers';

export default defFactory('fork', (fn) => {
  const nextName = `fork${fn.name || 'Word'}`;
  const _ = {
    [nextName]: function (...args) {
      fn.apply(this, args);
    },
  };
  return _[nextName];
}, forkResolver);
