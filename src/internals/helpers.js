import { RECOMPOSITE, RESOLVER } from './constants';

export function defFactory(displayName, fn, resolver) {
  const _ = {
    [displayName]: function (...args) {
      const word = fn(...args);
      if (resolver) {
        Object.defineProperty(word, RESOLVER, {
          enumerable: false,
          writable: false,
          value: resolver,
        });
      }
      return word;
    },
  };
  Object.defineProperty(_[displayName], RECOMPOSITE, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: {
      displayName,
      isFactory: true,
    },
  });
  return _[displayName];
}

export function forkResolver(unit, stack, context) {
  unit.apply(context, stack.slice().reverse());
  return stack;
}

export function isFunction(functionLike) {
  return typeof functionLike === 'function';
}

export function isObject(objectLike) {
  return objectLike !== null && typeof objectLike === 'object';
}

export function isArray(arrayLike) {
  return isObject(arrayLike) && arrayLike instanceof Array;
}

export function keys(objectLike) {
  return isObject(objectLike) ? Object.keys(objectLike) : [];
}

export function isNil(nilLike) {
  return nilLike == null;
}

export function isFactory(fn) {
  return isObject(fn) && fn[RECOMPOSITE] && fn[RECOMPOSITE].isFactory;
}

export function getDisplayName(fn) {
  return isObject(fn) && fn[RECOMPOSITE] && fn[RECOMPOSITE].displayName;
}
