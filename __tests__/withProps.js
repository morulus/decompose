import withProps from '../src/withProps';

describe('withProps', () => {
  it('Basic usage', () => {
    const chain = withProps(() => ({
      b: 2,
    }));

    expect(chain({
      a: 1,
    })).toMatchObject({
      a: 1,
      b: 2,
    });
  });

  it('Static props', () => {
    const chain = withProps({
      b: 2,
    });

    expect(chain({
      a: 1,
    })).toMatchObject({
      a: 1,
      b: 2,
    });
  });

  it('Follow context', () => {
    const a = {};
    const chain = withProps(function () {
      expect(this).toBe(a);
    });
    chain.call(a);
  });
});

describe('withProps:hit-test', () => {
  it('Warnings on current prop is not object like', () => {
    console.error = jest.fn();
    const chain = withProps(() => ({
      b: 2,
    }));

    expect(chain(5)).toMatchObject({
      b: 2,
    });
    expect(console.error).toHaveBeenCalledWith('Warning: First argument must be an object like');
  });

  it('No warnings with current prop is nil', () => {
    console.error = jest.fn();
    const chain = withProps(() => ({
      b: 2,
    }));

    expect(chain(undefined)).toMatchObject({
      b: 2,
    });
    expect(console.error).not.toHaveBeenCalled();
  });
});
