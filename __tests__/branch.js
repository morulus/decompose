import concatenate from '../src/concatenate';
import branch from '../src/branch';

describe('branch', () => {
  it('onTrue', () => {
    const onTrue = jest.fn(() => 1);
    const onFalse = jest.fn(() => 2);
    const chain = concatenate(
      true,
      branch(
        Boolean,
        onTrue,
        onFalse,
      ),
    );

    chain();
    expect(onTrue).toHaveBeenCalled();
    expect(onFalse).not.toHaveBeenCalled();
  });

  it('onFalse', () => {
    const onTrue = jest.fn(() => 1);
    const onFalse = jest.fn(() => 2);
    const chain = concatenate(
      false,
      branch(
        Boolean,
        onTrue,
        onFalse,
      ),
    );

    chain();
    expect(onTrue).not.toHaveBeenCalled();
    expect(onFalse).toHaveBeenCalled();
  });

  it('Accept args & affect stack', () => {
    const onTrue = jest.fn((a, b) => {
      expect(a).toBe(true);
      expect(b).toBe(1);
      return 2;
    });
    const onFalse = jest.fn();
    const chain = concatenate(
      [1, true],
      branch(
        Boolean,
        onTrue,
        onFalse,
      ),
      a => expect(a).toBe(2),
    );

    chain();
    expect(onTrue).toHaveBeenCalled();
  });

  it('No onFalse', () => {
    const onTrue = jest.fn();
    const chain = concatenate(
      [1, false],
      branch(
        Boolean,
        onTrue,
      ),
      a => expect(a).toBe(false),
    );

    chain();
    expect(onTrue).not.toHaveBeenCalled();
  });

  it('No onTrue / static', () => {
    const onFalse = jest.fn();
    const chain = concatenate(
      [1, true],
      branch(
        Boolean,
        2,
        onFalse,
      ),
      a => expect(a).toBe(2),
    );

    chain();
    expect(onFalse).not.toHaveBeenCalled();
  });

  it('Standalone usage', () => {
    const test = branch(Boolean, () => 'A', () => 'B');
    expect(test(true)).toBe('A');
  });
});
