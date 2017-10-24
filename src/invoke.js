import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import { defFactory } from './internals/helpers';

/**
 * Invoke function taked from result
 */
export default defFactory('invoke', fn => function invoke(...args) {
  const payload = fn.apply(this, args);
  if (isFunction(payload)) {
    return payload.apply(this, args);
  } else if (isArray(payload) && isFunction(payload[0])) {
    return payload[0](...payload.slice(1));
  }
  return payload;
});
