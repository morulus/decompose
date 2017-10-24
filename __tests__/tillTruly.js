import concatenate from '../src/concatenate';
import tillTruly from '../src/tillTruly';

const validateValue = tillTruly(
  value => value.length < 5 && 'Value too short',
  value => (!/^[\w\d\s]*$/.test(value) ? 'Invalid symbols' : undefined),
  value => value.length > 20 && 'Value too big',
);

describe('tillTruly', () => {
  it('Basic usage', () => {
    expect(validateValue('abc')).toBe('Value too short');
    expect(validateValue('Abcde%')).toBe('Invalid symbols');
    expect(validateValue('Abcdefghijklmnopqrstu')).toBe('Value too big');
  });

  it('Follow context', () => {
    const a = {};
    const chain = concatenate(
      tillTruly(function () {
        expect(this).toBe(a);
      }),
    );

    chain.call(a);
  });
});
