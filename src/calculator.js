#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic arithmetic
 * operations, plus modulo, exponentiation, and square root:
 *   +     Addition
 *   -     Subtraction
 *   x     Multiplication (also accepts "*")
 *   /     Division
 *   %     Modulo (remainder of division)
 *   ^     Exponentiation (power)
 *   sqrt  Square root (unary operation)
 *
 * Usage:
 *   node src/calculator.js <number1> <operator> <number2>
 *   node src/calculator.js sqrt <number>
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 10 - 4
 *   node src/calculator.js 6 x 7
 *   node src/calculator.js 20 / 4
 *   node src/calculator.js 10 % 3
 *   node src/calculator.js 2 ^ 8
 *   node src/calculator.js sqrt 16
 */

// Addition: returns the sum of two numbers.
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of two numbers.
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of two numbers.
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of two numbers.
// Throws an error if dividing by zero.
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

// Modulo: returns the remainder of a divided by b.
// Throws an error if dividing by zero.
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

// Power: returns base raised to the exponent.
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Square root: returns the square root of n.
// Throws an error if n is negative, since the result would not be a real number.
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }
  return Math.sqrt(n);
}

// Maps supported binary operator symbols to their corresponding operation function.
const OPERATIONS = {
  '+': add,
  '-': subtract,
  'x': multiply,
  '*': multiply,
  '/': divide,
  '%': modulo,
  '^': power,
};

// Maps supported unary operator names to their corresponding operation function.
const UNARY_OPERATIONS = {
  'sqrt': squareRoot,
};

// Parses and validates CLI arguments, then performs the requested calculation.
// Supports both binary operations (<number1> <operator> <number2>) and
// unary operations (<operator> <number>), such as `sqrt <number>`.
function calculate(args) {
  if (args.length === 2) {
    const [operator, rawN] = args;
    const unaryOperation = UNARY_OPERATIONS[operator];

    if (unaryOperation) {
      const n = Number(rawN);
      if (Number.isNaN(n)) {
        throw new Error('The operand must be a valid number.');
      }
      return unaryOperation(n);
    }
  }

  if (args.length !== 3) {
    throw new Error(
      'Usage: node src/calculator.js <number1> <operator> <number2>\n' +
        '   or: node src/calculator.js sqrt <number>'
    );
  }

  const [rawA, operator, rawB] = args;
  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Both operands must be valid numbers.');
  }

  const operation = OPERATIONS[operator];
  if (!operation) {
    throw new Error(
      `Unsupported operator "${operator}". Use one of: + - x / % ^ sqrt`
    );
  }

  return operation(a, b);
}

// Entry point when run directly from the command line.
function main() {
  const args = process.argv.slice(2);

  try {
    const result = calculate(args);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
};
