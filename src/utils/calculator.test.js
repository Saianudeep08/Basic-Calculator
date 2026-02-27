import { describe, it, expect } from 'vitest';
import { calculate } from './calculator';

describe('calculator logic', () => {
  it('should add two numbers', () => {
    expect(calculate('2 + 2')).toBe('4');
  });

  it('should subtract two numbers', () => {
    expect(calculate('5 - 3')).toBe('2');
  });

  it('should multiply two numbers', () => {
    expect(calculate('4 * 3')).toBe('12');
  });

  it('should divide two numbers', () => {
    expect(calculate('10 / 2')).toBe('5');
  });

  it('should handle decimals', () => {
    expect(calculate('0.1 + 0.2')).toBe('0.3');
  });

  it('should handle complex expressions', () => {
    expect(calculate('2 + 3 * 4')).toBe('14');
  });

  it('should handle scientific functions', () => {
      expect(calculate('sqrt(16)')).toBe('4');
      expect(calculate('2^3')).toBe('8');
  });

  it('should return Error for invalid expressions', () => {
    expect(calculate('2 + / 3')).toBe('Error');
  });
});
