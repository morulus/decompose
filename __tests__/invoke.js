import concatenate from '../lib/concatenate';
import invoke from '../lib/invoke';

describe('invoke', () => {
  it('Basic usage', () => {
    const onTrue = () => 1;
    const onFalse = () => 2;

    const chain = invoke(statement => (statement ? onTrue : onFalse));

    expect(chain(true)).toBe(1);
    expect(chain(false)).toBe(2);
  });

  it('Force args', () => {
    const onTrue = () => 1;
    const onFalse = () => 2;

    const chain = invoke(
      (statement, message, id) => (
        statement
        ? [onTrue, message, id]
        : [onFalse, message, id]
      ),
    );

    expect(chain(true, 'True message', 1)).toBe(1);
    expect(chain(false, 'False message', 2)).toBe(2);
  });

  it('Follow context', () => {
    const a = {};
    const invoker = function () {
      expect(this).toBe(a);
    };
    const chain = concatenate(
      invoke(function () {
        expect(this).toBe(a);
        return invoker;
      }),
    );

    chain.call(a);
  });
});
