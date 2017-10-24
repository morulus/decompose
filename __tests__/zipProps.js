import concatenate from '../src/concatenate';
import zipProps from '../src/zipProps';

describe('zipProps', () => {
  it('Basic usage', () => {
    const chain = concatenate(
      zipProps(['a', 'b', 'c', 'd']),
      ({ a, b, c, d }) => {
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(c).toBe(3);
        expect(d).toBe(undefined);
      },
    );

    chain(1, 2, 3);
  });
});
