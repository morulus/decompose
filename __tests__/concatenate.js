import concatenate from '../lib/concatenate';

describe('concatenate', () => {
  it('simple chain', () => {
    const test = concatenate(
      Math.round, // Stack: [float],
      Boolean, // Stack: [integer]
    );
    // Result boolean

    expect(test(0.6)).toBe(true);
    expect(test(0.4)).toBe(false);
  });

  it('Multiple initial arguments', () => {
    const test = concatenate(
      (a, b, c) => { // Stack: [1, 2, 3.4]
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(c).toBe(3.4);
        return a + b + c;
      },
      Math.round, // Stack: [float],
    );

    expect(test(1, 2, 3.4)).toBe(6);
  });

  it('Multiple initial arguments + append stack', () => {
    const test = concatenate(
      [4],
      // Appended value must be first arg
      (d, a, b, c) => {
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(c).toBe(3);
        expect(d).toBe(4);
        return a + b + c + d;
      }, // Stack: [4, 1, 2, 3]
      Math.round, // Stack: [float],
    );

    expect(test(1, 2, 3)).toBe(10);
  });

  it('Handle event', () => {
    const test = concatenate(
      [
        e => e.preventDefault,
        e => e.which === 13,
      ],
      (isEnter, preventDefault) => {
        if (isEnter) {
          preventDefault();
        }
      },
    );

    const mockEvent = {
      which: 13,
      preventDefault: jest.fn(),
    };
    test(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    const mockEvent2 = {
      which: 14,
      preventDefault: jest.fn(),
    };
    test(mockEvent2);
    expect(mockEvent2.preventDefault).not.toHaveBeenCalled();
  });

  it('Object unit', () => {
    const test = concatenate({
      a: a => a,
      b: (a, b) => b,
      c: (a, b, c) => c,
    });

    expect(test(1, 2, 3)).toMatchObject({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});
