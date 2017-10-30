import concatenate from '../lib/concatenate';
import tillMatch from '../lib/tillMatch';

const getQuota = tillMatch(
  [
    () => 2,
    () => 4,
    () => 10,
  ],
  (q, a) => a + q > 0,
  'A',
);

describe('tillMatch', () => {
  it('Basic usage', () => {
    expect(getQuota(-1)).toBe(2);
    expect(getQuota(-3)).toBe(4);
    expect(getQuota(-9)).toBe(10);
  });

  it('On fail static', () => {
    expect(getQuota(-11)).toBe('A');
  });

  it('On fail dynamic', () => {
    const test = tillMatch(
      [
        () => false,
      ],
      q => q,
      a => `${a}B`,
    );
    expect(test('A')).toBe('AB');
  });

  it('Hashmap', () => {
    const detectMailService = tillMatch({
      gmail: '@gmail.com',
      facebook: '@facebook.com',
      yandex: '@yandex.ru',
    },
    (suffix, email) => email.endsWith(suffix),
    );

    expect(detectMailService('vladimirmorulus@gmail.com')).toBe('gmail');
  });

  it('Hashmap on fail', () => {
    const detectMailService = tillMatch({
      gmail: '@gmail.com',
      facebook: '@facebook.com',
      yandex: '@yandex.ru',
    },
    (suffix, email) => email.endsWith(suffix),
    'unknown',
    );

    expect(detectMailService('vladimirmorulus@yahoo.com')).toBe('unknown');
  });

  it('Follow context', () => {
    const a = {};
    const chain = concatenate(
      tillMatch([function () {
        expect(this).toBe(a);
      }], function () {
        expect(this).toBe(a);
      }),
    );

    chain.call(a);
  });
});
