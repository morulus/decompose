import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import keys from 'lodash/keys';

function defaultOnFail() {
  return undefined;
}

export default function tillTruly(variants, match, onFail = defaultOnFail) {
  const matcher = isFunction(match)
    ? match
    : result => result === match;
  const isHashMap = !isArray(variants);
  const iterableKeys = isHashMap
    ? keys(variants)[Symbol.iterator]()
    : variants.keys();
  return function tillTrulyChain(...args) {
    let next = iterableKeys.next();
    while (!next.done) {
      const key = next.value;
      const result = isFunction(variants[key])
        ? variants[key].apply(this, args)
        : variants[key];
      if (matcher.apply(
        this,
        [result].concat(args))
      ) {
        return isHashMap ? key : result;
      }
      next = iterableKeys.next();
    }
    for (let i = 0; i < variants.length; i++) {
      const result = isFunction(variants[i])
        ? variants[i].apply(this, args)
        : variants[i];
      if (matcher.apply(this, [result].concat(args))) {
        return result;
      }
    }
    return isFunction(onFail)
      ? onFail.apply(this, args)
      : onFail;
  };
}
