import { defFactory } from './internals/helpers';

export default defFactory('whileTruly', function whileTruly(...series) {
  const nextName = `whileTrulySerie${series.length}`;
  const _ = {
    [nextName]: function (...args) {
      let result;
      let nextArgs = args.slice();
      for (let i = 0; i < series.length; i++) {
        result = series[i].apply(this, nextArgs);
        if (!result) {
          break;
        }
        nextArgs = [result];
      }
      return result;
    },
  };

  return _[nextName];
});
