import concatenate from '../src/concatenate';

describe('STANDART-1', () => {
  // Stack passes to args in reverse order
  // Arguments are stacked in reverse order
  it('#1.1.4, #1.1.5', () => {
    const test = concatenate(
      [4],
      (d, a, b, c) => {
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(c).toBe(3);
        expect(d).toBe(4);
      },
    );

    test(1, 2, 3);
  });

  // Function call erases the stack, but add one value on return
  it('#1.1.1.1', () => {
    const test = concatenate(
      (...args) => {
        expect(args.length).toBe(4);
        return [1, 2, 3, 4];
      },
      (...args) => expect(args.length).toBe(1),
    );

    test(1, 2, 3, 4);
  });

  // Non-function values increase the stack
  it('#1.1.1.2', () => {
    const test = concatenate(
      7,
      (a, b) => {
        expect(a).toBe(7);
        expect(b).toBe(undefined);
      },
    );

    test(4, 5);

    // Empty initial arguments
    const test2 = concatenate(
      7,
      (...args) => {
        expect(args.length).toBe(1);
      },
    );

    test2();
  });

  // Stack never empty
  it('#1.1.2.1', () => {
    const test = concatenate(
      (...args) => {
        expect(args.length).toBe(4);
      },
      (...args) => {
        expect(args.length).toBe(1);
        expect(args[0]).toBe(undefined);
      },
    );

    test(1, 2, 3, 4);
  });

  // An array will extends stack
  it('#1.1.6', () => {
    const test = concatenate(
      1,
      [2, 3, 4],
      (a, b, c) => {
        expect(a).toBe(4);
        expect(b).toBe(3);
        expect(c).toBe(2);
      },
    );

    test();
  });

  // Any functions stored in passed array will be executed in a series for getting value
  it('#1.1.6.2', () => {
    const test = concatenate(
      1,
      [2, 3, 4],
      (a, b, c, d) => {
        expect(a).toBe(4);
        expect(b).toBe(3);
        expect(c).toBe(2);
        expect(d).toBe(1);
      },
    );

    test();
  });

  // Any functions stored in passed array will be executed in a series for getting value
  it('#1.1.6.2.1', () => {
    const test = concatenate(
      ['a', 'b', 'c'],
      [(c, b, a) => {
        expect(a).toBe('a');
        expect(b).toBe('b');
        expect(c).toBe('c');
      }],
    );
    test();
  });

  // Any functions stored in passed array will be executed
  // with arguments from the stack, which formed by last unit
  it('#1.1.6.2.2', () => {
    const test = concatenate(
      1,
      [
        (a) => {
          expect(a).toBe(1);
          return 2;
        },
        (a) => {
          expect(a).toBe(1);
          return 3;
        },
      ],
      (a, b, c) => {
        expect(a).toBe(3);
        expect(b).toBe(2);
        expect(c).toBe(1);
      },
    );

    test();
  });
});
