import stub from '../src/stub';

const stub15 = stub(
  15,
);

describe('stub', () => {
  it('Basic usage', () => {
    const mockObj = {};

    expect(stub15(undefined)).toBe(15);
    expect(stub15(false)).toBe(15);
    expect(stub15(null)).toBe(15);
    expect(stub15(0)).toBe(15);
    expect(stub15('z')).toBe('z');
    expect(stub15(mockObj)).toBe(mockObj);
  });
});
