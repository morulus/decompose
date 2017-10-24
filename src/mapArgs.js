import isArray from 'lodash/isArray';
import { defFactory } from './internals/helpers';

function stackApplier(unit, stack, context) {
  const nextStack = unit.apply(context, stack.slice().reverse());
  return isArray(nextStack) ? nextStack.slice().reverse() : [];
}

/**
 * Invoke function taked from result
 */
export default defFactory('mapArgs', function (fn) {
  const nextName = `mapArgs${fn.name || 'StackSpecifier'}`;
  const _ = {
    [nextName]: function (...args) {
      return fn.apply(this, args);
    },
  };

  return _[nextName];
}, stackApplier);
