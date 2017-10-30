import concatenate from '../lib/concatenate';
import onError from '../lib/onError';

describe('onError', () => {
  it('Catch error', () => {
    const mockError = new Error();
    const chain = concatenate(
      1,
      () => { throw mockError; },
      () => 2,
      () => 3,
      onError((e) => {
        expect(e).toBe(mockError);
      }),
    );

    chain();
  });

  it('Catch error and reflow', () => {
    const mockError = new Error();
    const chain = concatenate(
      1,
      () => { throw mockError; },
      () => 2,
      () => 3,
      onError((e) => {
        expect(e).toBe(mockError);
        return 4;
      }),
      (a) => {
        expect(a).toBe(4);
      },
    );

    chain();
  });

  it('Re-catch error and reflow', () => {
    const mockError = new Error();
    const mockError2 = new Error();
    const chain = concatenate(
      1,
      () => { throw mockError; },
      () => 2,
      () => 3,
      onError((e) => {
        expect(e).toBe(mockError);
        return 4;
      }),
      (a) => {
        expect(a).toBe(4);
      },
      () => {
        throw mockError2;
      },
      () => 5,
      () => 6,
      onError((e) => {
        expect(e).toBe(mockError2);
        return 7;
      }),
      (a) => {
        expect(a).toBe(7);
      },
    );

    chain();
  });

  it('No errors', () => {
    const chain = concatenate(
      1,
      () => 2,
      () => 3,
      onError(() => 4),
      a => expect(a).toBe(3),
    );

    chain();
  });

  it('Follow context', () => {
    const mockError = new Error();
    const a = {};
    const chain = concatenate(
      1,
      () => { throw mockError; },
      () => 2,
      () => 3,
      onError(function (e) {
        expect(e).toBe(mockError);
        expect(this).toBe(a);
      }),
    );

    chain.call(a);
  });
});
