import concatenate from '../lib/concatenate';

describe('Exemples', () => {
  it('Random PIN', () => {
    const random = Math.random();

    const getRandomPin = concatenate(
      rand => rand * 1000,
      Math.round,
    );

    const result = getRandomPin(random);

    expect(result).toBe(Math.round(random * 1000));
  });

  it('Hello, World', () => {
    const logHello = concatenate(
      name => `Hello, ${name}!`,
    );

    expect(logHello('Jest')).toBe('Hello, Jest!');
  });

  it('Password validator', () => {
    function eventToValue(event) {
      return event.target.value;
    }

    function validate(value) {
      return value.length < 7
        ? 'Password is too short'
        : undefined;
    }

    const notify = jest.fn(
      message => expect(message).toBe('Password is too short'),
    );

    const test = concatenate(
      eventToValue,         // Select value from event
      validate,             // Validate selected value
      notify,               // Notify if the value is invalid
    );

    const mockEvent = {
      target: {
        value: '12345',
      },
    };

    test(mockEvent);

    expect(notify).toHaveBeenCalled();
  });

  it('pow 3 (extend stack)', () => {
    const test = concatenate(
      [3, Number],
      Math.pow,
    );

    expect(test('4')).toBe(64);
  });
});
