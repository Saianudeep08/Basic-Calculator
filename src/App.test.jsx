import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

describe('Calculator App', () => {
  it('renders the calculator', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
  });

  it('updates display when number buttons are clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('8'));
    expect(screen.getByDisplayValue('78')).toBeInTheDocument();
  });

  it('performs addition correctly', () => {
    render(<App />);
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('handles scientific functions', () => {
    render(<App />);
    // "sin(" button text is "sin" in the UI because of replace
    fireEvent.click(screen.getByText('sin'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText(')'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByDisplayValue('0')).toBeInTheDocument(); // sin(0) = 0
  });

  it('handles keyboard input', () => {
    render(<App />);
    // Simulating keyboard events
    // Note: fireEvent.keyDown needs the event object with 'key' property
    fireEvent.keyDown(window, { key: '5' });
    fireEvent.keyDown(window, { key: '*' });
    fireEvent.keyDown(window, { key: '2' });
    fireEvent.keyDown(window, { key: 'Enter' });

    // The previous implementation of the test might have failed if it relied on exact display value update timing
    // but React testing library usually handles it.
    // However, looking at the code:
    // window.addEventListener('keydown', handleKeyDown);
    // handleKeyDown calls handleClick which calls setInput.

    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('clears the display', () => {
    render(<App />);
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('C'));
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('handles error gracefully', () => {
      render(<App />);
      fireEvent.click(screen.getByText('7'));
      fireEvent.click(screen.getByText('/')); // 7/
      fireEvent.click(screen.getByText('=')); // Error
      // calculate('7/') might throw or return result depending on mathjs version,
      // but usually '7/' is invalid syntax in mathjs evaluate.

      // Let's verify what calculator.js returns for '7/'.
      // If it throws, App sets result to 'Error'.
      // But wait, App sets *input* to 'Error' inside catch block?
      // Yes: setInput('Error');

      // We need to wait for the update? FireEvent is synchronous but React updates might need 'await findBy...'
      // though usually for simple state updates it's fine.

      // Let's check if 'Error' is displayed.
      // But wait, mathjs might evaluate '7/' as '3.5' if it treats missing operand as implicit? No.
      // Let's assume it throws.

      // Actually, let's trigger a sure error: "7 / / 2" -> "7//2" might be comment in JS but here it is passed to evaluate.
      // "7 ++ 2" -> valid?
      // "sin(" -> unexpected end of expression.

      fireEvent.click(screen.getByText('C'));
      fireEvent.click(screen.getByText('sin'));
      fireEvent.click(screen.getByText('='));
      expect(screen.getByDisplayValue('Error')).toBeInTheDocument();
  });
});
