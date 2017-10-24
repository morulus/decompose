import { defFactory, forkResolver } from './internals/helpers';
import { ONERROR } from './internals/constants';


export default defFactory('onError', function onError(handler) {
  const nextName = `onError${handler.name || 'Word'}`;
  const _ = {
    [nextName]: function () {},
  };
  Object.defineProperty(_[nextName], ONERROR, {
    enumerable: false,
    writable: false,
    value: function (...args) {
      return handler.apply(this, args);
    },
  }, forkResolver);
  return _[nextName];
}, forkResolver);
