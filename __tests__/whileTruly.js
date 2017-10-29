import whileTruly from '../src/whileTruly';

const decreaseValue = whileTruly(
  value => value - 1,
  value => value - 1,
  value => value - 1,
);

describe('whileTruly', () => {
  it('Basic usage', () => {
    expect(decreaseValue(1)).toBe(0);
    expect(decreaseValue(4)).toBe(1);
  });
});
