import { evaluate } from 'mathjs';

export const calculate = (expression) => {
  try {
    // Replace 'x' with '*' for multiplication if needed, though mathjs handles most
    // But for better UI experience we might use 'x' on button but '*' in logic
    // For now let's assume standard symbols.

    // transform some UI symbols to mathjs compatible
    let sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');

    const result = evaluate(sanitized);

    // Handle floating point precision issues if necessary, but mathjs is good.
    // Let's format to avoid long decimals
    return parseFloat(result.toPrecision(14)).toString();
  } catch (error) {
    return 'Error';
  }
};

export const isOperator = (char) => {
  return ['+', '-', '*', '/', '%', '^'].includes(char);
};

export const isScientific = (char) => {
    return ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'pi', 'e', '(', ')'].includes(char);
}
