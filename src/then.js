import isPromise from 'is-promise';
import { defFactory } from './internals/helpers';

export default defFactory('then', (handler, reject) => {
  const nextName = `then${handler.name || 'Fn'}`;
  const _ = {
    [nextName](promise, ...args) {
      if (isPromise(promise)) {
        const nextPromise = promise.then(handler);
        if (reject) {
          return nextPromise.catch(reject);
        }
        return nextPromise;
      }
      return handler(promise, ...args);
    },
  };

  return _[nextName];
});
