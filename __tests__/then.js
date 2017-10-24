import concatenate from '../src/concatenate';
import then from '../src/then';

describe('then', () => {
  it('With promise', () => {
    const chain = concatenate(
      then((payload) => {
        expect(payload).toBe(1);
        return 2;
      }),
      then(payload => expect(payload).toBe(2)),
    );

    chain(Promise.resolve(1));
  });

  it('With promise reject', () => {
    const mockError = new Error();
    const chain = concatenate(
      then(() => {}, (e) => {
        expect(e).toBe(mockError);
      }),
    );

    chain(Promise.reject(mockError));
  });

  it('Without promise', () => {
    const chain = concatenate(
      then((payload) => {
        expect(payload).toBe(1);
        return 2;
      }),
      then(payload => expect(payload).toBe(2)),
    );

    chain(1);
  });

  it('Simple function after then', () => {
    const chain = concatenate(
      then((payload) => {
        expect(payload).toBe(1);
        return 2;
      }),
      (payload) => {
        // Expect Promise object
        expect(typeof payload).toBe('object');
      },
    );

    chain(Promise.resolve(1));
  });

  it('Not follow context', () => {
    const a = {};
    const chain = concatenate(
      then(function () {
        expect(this).not.toBe(a);
      }),
    );

    chain.call(a, Promise.resolve(1));
  });

  it('Not follow context catch', () => {
    const a = {};
    const chain = concatenate(
      then(() => {}, function () {
        expect(this).not.toBe(a);
      }),
    );

    chain.call(a, Promise.reject(new Error()));
  });
});
