import isNotProduction from 'is-not-production';
import warning from 'warning';
import { isObject, isNil, isFunction } from './internals/helpers';

function objectToTransformer(object) {
  return () => object;
}

export default function withProps(propsCreator) {
  const propsCreatorIsFunction = isFunction(propsCreator);
  if (isNotProduction) {
    warning(
      propsCreatorIsFunction || isObject(propsCreator),
      'withProps expects a function or object',
    );
  }
  propsCreator = propsCreatorIsFunction ? propsCreator : objectToTransformer(propsCreator);
  return function transform(...args) {
    const [props] = args;
    if (isNotProduction) {
      warning(isObject(props) || isNil(props), 'First argument must be an object like');
    }
    return Object.assign(
      {},
      props,
      propsCreator.apply(this, args),
    );
  };
}
