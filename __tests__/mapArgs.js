import concatenate from '../src/concatenate';
import mapArgs from '../src/mapArgs';

describe('mapArgs', () => {
  it('Basic usage', () => {
    const chain = concatenate(
      [1, 2, 3, 4],
      mapArgs((...args) => args.map(
        (v, index) => `${index}-${v}`),
      ),
      (...args) => {
        const [a, b, c, d] = args;
        expect(args.length).toBe(4);
        expect(a).toBe('0-4');
        expect(b).toBe('1-3');
        expect(c).toBe('2-2');
        expect(d).toBe('3-1');
      },
    );

    chain();
  });
});
