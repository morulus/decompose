import concatenate from './concatenate';
import withProps from './withProps';
import tillTruly from './tillTruly';
import whileTruly from './whileTruly';
import invoke from './invoke';
import fork from './fork';
import stub from './stub';
import memoize from './memoize';
import mapArgs from './mapArgs';
import onError from './onError';
import then from './then';
import tillMatch from './tillMatch';
import zipProps from './zipProps';
import branch from './branch';

const composite = concatenate;
const sequence = concatenate;
const sequ = concatenate;
const seq = concatenate;

const main = (...args) => composite(...args);

Object.assign(main, {
  composite,
  sequence,
  sequ,
  seq,
  concatenate,
  withProps,
  tillTruly,
  whileTruly,
  stub,
  memoize,
  invoke,
  fork,
  mapArgs,
  onError,
  then,
  tillMatch,
  zipProps,
  branch,
});

export default main;
