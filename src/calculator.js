#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic arithmetic
 * operations:
 *   +  Addition
 *   -  Subtraction
 *   x  Multiplication (also accepts "*")
 *   /  Division
 *
 * Usage:
 *   node src/calculator.js <number1> <operator> <number2>
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 10 - 4
 *   node src/calculator.js 6 x 7
 *   node src/calculator.js 20 / 4
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

// Maps supported operator symbols to their corresponding operation function.
const OPERATIONS = {
  '+': add,
  '-': subtract,
  'x': multiply,
  '*': multiply,
  '/': divide,
};

// Parses and validates CLI arguments, then performs the requested calculation.
function calculate(args) {
  if (args.length !== 3) {
    throw new Error(
      'Usage: node src/calculator.js <number1> <operator> <number2>'
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
      `Unsupported operator "${operator}". Use one of: + - x /`
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

module.exports = { add, subtract, multiply, divide, calculate };
