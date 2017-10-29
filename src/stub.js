import { defFactory } from './internals/helpers';

export default defFactory('stub', function whileTruly(byDefault) {
  const nextName = `stubWith${typeof value}`;
  const _ = {
    [nextName]: function (props) {
      return props || byDefault;
    },
  };

  return _[nextName];
});
