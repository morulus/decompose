import concatenate from './concatenate';
import withProps from './withProps';
import tillTruly from './tillTruly';
import invoke from './invoke';
import fork from './fork';

const composite = concatenate;

export {
  composite,
  flow,
  f,
  withProps,
  tillTruly,
  invoke,
  fork,
};

const main = (...args) => composite(...args);

Object.assign(main, {
  composite,
  flow,
  f,
  withProps,
  tillTruly,
  invoke,
  fork,
});

export default main;
