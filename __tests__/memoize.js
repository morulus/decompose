import memoize from '../src/memoize';

describe('memoize', () => {
  it('With nums', () => {
    const hardSum = jest.fn((...args) => args.reduce((summ, n) => summ + n));
    const selector = memoize((a, b, c) => hardSum(a, b, c));

    expect(selector(1, 2, 3)).toBe(6);
    expect(selector(1, 2, 3)).toBe(6);
    expect(hardSum).toHaveBeenCalledTimes(1);
  });

  it('With mixed', () => {
    const hardCache = jest.fn(() => Math.random());
    const selector = memoize((a, b, c) => hardCache(a, b, c));

    const state = {};
    const type = 'entity';
    const id = 5;

    const result = selector(state, type, id);
    expect(selector(state, type, id)).toBe(result);
    // Should return next value
    expect(selector({}, type, id)).not.toBe(result);

    expect(hardCache).toHaveBeenCalledTimes(2);
  });
});
