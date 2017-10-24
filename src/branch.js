import warning from 'warning';
import isFunction from 'lodash/isFunction';
import { defFactory } from './internals/helpers';

/**
 * Invoke function taked from result
 */
export default defFactory('branch', (
  condition,
  onTrue = true,
  onFalse = false,
) => function branch(...args) {
  warning(isFunction(condition), 'Condition must be a function');
  const payload = condition.apply(this, args);
  const callback = payload ? onTrue : onFalse;
  return isFunction(callback)
    ? callback.apply(this, args)
    : callback;
});
