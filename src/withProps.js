import isNotProduction from 'is-not-production';
import isObject from 'lodash/isObject';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import isObjectLike from 'lodash/isObjectLike';
import warning from 'warning';

function objectToTransformer(object) {
  return () => object;
}

export default function withProps(propsCreator) {
  const propsCreatorIsFunction = isFunction(propsCreator);
  if (isNotProduction) {
    warning(
      propsCreatorIsFunction || isObjectLike(propsCreator),
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
