import { defFactory } from './internals/helpers';

/**
 * Invoke function taked from result
 */
export default defFactory('zipProps', function (keys) {
  const nextName = 'zipPropsWord';
  const _ = {
    [nextName]: function (...args) {
      const props = {};
      for (let i = 0; i < keys.length; i++) {
        props[keys[i]] = args[i];
      }
      return props;
    },
  };

  return _[nextName];
});
