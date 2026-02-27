import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { calculate } from './utils/calculator'; // Import the calculation logic

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const displayRef = useRef(null);

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        const res = calculate(input);
        setInput(res);
        setResult(''); // Clear intermediate result
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else {
      // Prevent multiple operators in a row if needed, but for now just append
      setInput((prev) => prev + value);
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key;

    if (/\d/.test(key)) {
      handleClick(key);
    } else if (['+', '-', '*', '/', '.', '(', ')', '^'].includes(key)) {
      handleClick(key);
    } else if (key === 'Enter') {
      handleClick('=');
    } else if (key === 'Backspace') {
      handleClick('DEL');
    } else if (key === 'Escape') {
      handleClick('C');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]); // Re-bind listener on input change to capture latest state if needed (though not strictly necessary here due to setState func update)

  // Expanded button layout for Scientific Calculator
  const buttons = [
    // Row 1: Scientific Functions
    'sin(', 'cos(', 'tan(', 'log(', 'ln(',
    // Row 2: More Functions & Memory/Clear
    '(', ')', '^', 'sqrt(', 'C',
    // Row 3: Numbers & Operators
    '7', '8', '9', '/', 'DEL',
    // Row 4
    '4', '5', '6', '*', 'pi',
    // Row 5
    '1', '2', '3', '-', 'e',
    // Row 6
    '0', '.', '=', '+', '%'
  ];

  return (
    <div className="container">
      <div className="calculator">
        <div className="display-container">
             <div className="previous-operand">{result}</div>
             <input
                ref={displayRef}
                type="text"
                value={input}
                readOnly
                className="display"
                placeholder="0"
             />
        </div>
        <div className="buttons-grid">
          {buttons.map((btn, i) => (
            <button
                key={i}
                onClick={() => handleClick(btn)}
                className={`btn ${
                    ['C', 'DEL'].includes(btn) ? 'btn-danger' :
                    ['=', '+', '-', '*', '/', '^', '%'].includes(btn) ? 'btn-operator' :
                    ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', 'pi', 'e'].includes(btn) ? 'btn-scientific' : ''
                }`}
            >
              {btn.endsWith('(') && btn.length > 1 ? btn.slice(0, -1) : btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
