// module.test.js
import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = 2;
  const got = mut.div(10, 5);
  expect(got).toBe(expected);
});

test('Testing div by zero', () => {
  const got = mut.div(10, 0);
  expect(got).toBe(Infinity);
});

test('Testing div with negative numbers', () => {
  const expected = -2;
  const got = mut.div(10, -5);
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- contains number', () => {
  const got = mut.containsNumbers('Hello123');
  expect(got).toBe(true);
});

test('Testing containsNumbers -- no numbers', () => {
  const got = mut.containsNumbers('Hello');
  expect(got).toBe(false);
});

test('Testing containsNumbers -- only numbers', () => {
  const got = mut.containsNumbers('12345');
  expect(got).toBe(true);
});

test('Testing containsNumbers -- empty string', () => {
  const got = mut.containsNumbers('');
  expect(got).toBe(false);
});
