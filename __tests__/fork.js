import concatenate from '../src/concatenate';
import fork from '../src/fork';

describe('fork', () => {
  it('Basic usage', () => {
    const chain = concatenate(
      [3, 2, 1],
      fork(() => 4),
      (...args) => {
        expect(args.length).toBe(3);
      },
    );

    chain();
  });

  it('Follow context', () => {
    const a = {};
    const chain = concatenate(
      fork(function () {
        expect(this).toBe(a);
      }),
    );

    chain.call(a);
  });
});
