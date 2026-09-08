/**
 * calculator.test.js
 *
 * Comprehensive unit tests for the calculator functions defined in
 * src/calculator.js, covering addition, subtraction, multiplication,
 * and division, along with the CLI `calculate` entry point and
 * edge cases such as division by zero.
 */

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
} = require('../calculator');

describe('add', () => {
  // Example from images/calc-basic-operations.png: 2 + 3
  test('adds two positive numbers (2 + 3 = 5)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2);
  });

  test('adds two negative numbers', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  test('adds decimal numbers', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test('adds zero as an identity value', () => {
    expect(add(7, 0)).toBe(7);
  });
});

describe('subtract', () => {
  // Example from images/calc-basic-operations.png: 10 - 4
  test('subtracts two positive numbers (10 - 4 = 6)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracts a larger number from a smaller number (negative result)', () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  test('subtracts negative numbers', () => {
    expect(subtract(-5, -5)).toBe(0);
  });

  test('subtracts decimal numbers', () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });

  test('subtracts zero as an identity value', () => {
    expect(subtract(9, 0)).toBe(9);
  });
});

describe('multiply', () => {
  // Example from images/calc-basic-operations.png: 45 * 2
  test('multiplies two positive numbers (45 * 2 = 90)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplies a positive and a negative number', () => {
    expect(multiply(4, -3)).toBe(-12);
  });

  test('multiplies two negative numbers', () => {
    expect(multiply(-6, -7)).toBe(42);
  });

  test('multiplies by zero', () => {
    expect(multiply(123, 0)).toBe(0);
  });

  test('multiplies decimal numbers', () => {
    expect(multiply(1.5, 2)).toBeCloseTo(3);
  });
});

describe('divide', () => {
  // Example from images/calc-basic-operations.png: 20 / 5
  test('divides two positive numbers (20 / 5 = 4)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divides a negative number by a positive number', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test('divides two negative numbers', () => {
    expect(divide(-9, -3)).toBe(3);
  });

  test('divides resulting in a decimal value', () => {
    expect(divide(7, 2)).toBeCloseTo(3.5);
  });

  test('dividing zero by a non-zero number returns zero', () => {
    expect(divide(0, 5)).toBe(0);
  });

  // Edge case: division by zero must throw an error.
  test('throws an error when dividing by zero', () => {
    expect(() => divide(20, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('modulo', () => {
  // Example from images/calc-extended-operations.png: modulo with 5 % 2
  test('returns the remainder of two positive numbers (5 % 2 = 1)', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('returns the remainder of two positive numbers (10 % 3 = 1)', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('returns 0 when a is evenly divisible by b', () => {
    expect(modulo(9, 3)).toBe(0);
  });

  test('handles negative dividends', () => {
    expect(modulo(-10, 3)).toBe(-1);
  });

  test('handles decimal operands', () => {
    expect(modulo(5.5, 2)).toBeCloseTo(1.5);
  });

  // Edge case: modulo by zero must throw an error.
  test('throws an error when modulo by zero', () => {
    expect(() => modulo(10, 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('power', () => {
  // Example from images/calc-extended-operations.png: power with 2 ^ 3
  test('raises a positive base to a positive exponent (2 ^ 3 = 8)', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('raises a positive base to a positive exponent (2 ^ 8 = 256)', () => {
    expect(power(2, 8)).toBe(256);
  });

  test('returns 1 when the exponent is zero', () => {
    expect(power(5, 0)).toBe(1);
  });

  test('handles negative exponents', () => {
    expect(power(2, -2)).toBeCloseTo(0.25);
  });

  test('handles negative bases with an even exponent', () => {
    expect(power(-2, 2)).toBe(4);
  });

  test('handles decimal bases', () => {
    expect(power(1.5, 2)).toBeCloseTo(2.25);
  });
});

describe('squareRoot', () => {
  test('returns the square root of a perfect square (sqrt 16 = 4)', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('returns 0 for the square root of 0', () => {
    expect(squareRoot(0)).toBe(0);
  });

  test('returns a decimal result for non-perfect squares', () => {
    expect(squareRoot(2)).toBeCloseTo(1.4142135623730951);
  });

  // Edge case: square root of a negative number must throw an error.
  test('throws an error when given a negative number', () => {
    expect(() => squareRoot(-4)).toThrow(
      'Cannot calculate the square root of a negative number.'
    );
  });
});

describe('calculate (CLI argument parsing)', () => {
  test('parses and computes addition from CLI-style args (2 + 3)', () => {
    expect(calculate(['2', '+', '3'])).toBe(5);
  });

  test('parses and computes subtraction from CLI-style args (10 - 4)', () => {
    expect(calculate(['10', '-', '4'])).toBe(6);
  });

  test('parses and computes multiplication from CLI-style args (45 * 2)', () => {
    expect(calculate(['45', '*', '2'])).toBe(90);
  });

  test('parses and computes multiplication using the "x" operator (45 x 2)', () => {
    expect(calculate(['45', 'x', '2'])).toBe(90);
  });

  test('parses and computes division from CLI-style args (20 / 5)', () => {
    expect(calculate(['20', '/', '5'])).toBe(4);
  });

  test('parses and computes modulo from CLI-style args (10 % 3)', () => {
    expect(calculate(['10', '%', '3'])).toBe(1);
  });

  // Example from images/calc-extended-operations.png: modulo with 5 % 2
  test('parses and computes modulo from CLI-style args (5 % 2)', () => {
    expect(calculate(['5', '%', '2'])).toBe(1);
  });

  test('parses and computes exponentiation from CLI-style args (2 ^ 8)', () => {
    expect(calculate(['2', '^', '8'])).toBe(256);
  });

  // Example from images/calc-extended-operations.png: power with 2 ^ 3
  test('parses and computes exponentiation from CLI-style args (2 ^ 3)', () => {
    expect(calculate(['2', '^', '3'])).toBe(8);
  });

  // Example from images/calc-extended-operations.png: square root with √16
  test('parses and computes square root from CLI-style args (sqrt 16)', () => {
    expect(calculate(['sqrt', '16'])).toBe(4);
  });

  // Edge case: division by zero via the CLI parser.
  test('throws an error when dividing by zero via CLI args', () => {
    expect(() => calculate(['20', '/', '0'])).toThrow(
      'Division by zero is not allowed.'
    );
  });

  test('throws an error when taking square root of a negative number via CLI args', () => {
    expect(() => calculate(['sqrt', '-9'])).toThrow(
      'Cannot calculate the square root of a negative number.'
    );
  });

  test('throws an error when given an unsupported operator', () => {
    expect(() => calculate(['5', '&', '2'])).toThrow(/Unsupported operator/);
  });

  test('throws an error when an operand is not a valid number', () => {
    expect(() => calculate(['abc', '+', '3'])).toThrow(
      'Both operands must be valid numbers.'
    );
  });

  test('throws an error when given the wrong number of arguments', () => {
    expect(() => calculate(['5', '+'])).toThrow(/Usage:/);
  });
});
