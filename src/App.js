import { useState } from 'react';
import { BsFillBackspaceFill } from "react-icons/bs"
import './App.css';

function App() {
  const [display, setDisplay] = useState("");
  const [secondDisplay, setSecodeDisplay] = useState("");
  const [prev, setPrev] = useState(true);
  const [value, setValue] = useState({
    first: 0,
    second: 0,
    result: 0,
    operator: "+"
  });

  const handleBackspace = () => {
    setDisplay(display.slice(0, -1))
    if(prev){
      setValue({ ...value, first: Number(display.slice(0, -1)) });
    }else{
      setValue({ ...value, second: Number(display.slice(0, -1)) });
    }
  }

  const handleClick = (e) => {
    if (e.target.id === "c") {
      setValue({
        ...value,
        first: 0,
        second: 0,
        operator: "+"
      })
      setDisplay("");
      setSecodeDisplay("");
      setPrev(true);
    }

    if (e.target.className === "number") {
      const clickedNumber = e.target.id;

      if (clickedNumber === "." && display.includes(".")) {
        return;
      }
      setDisplay(display.concat(clickedNumber));
      if (prev) {
        setValue({ ...value, first: Number(display.concat(clickedNumber)) });
      } else {
        setValue({ ...value, second: Number(display.concat(clickedNumber)) });
      }
    }

    if (e.target.className === "operator") {
      const op = e.target.id;
      if (op === "/" || op === "*" || op === "-" || op === "+") {
        setValue({ ...value, operator: op })
        console.log()
        setSecodeDisplay(display)
        setDisplay("")
        setPrev(false);
        if (!prev) {
          const result = calculator();
          setSecodeDisplay("");
          setPrev(true);
          setValue({ ...value, first: result, second: 0 })
          setDisplay(String(result));
        }
      }
    }
    if (e.target.id === "=") {
      const result = calculator();
      setSecodeDisplay("");
      setPrev(true);
      setValue({ ...value, first: result, second: 0 })
      setDisplay(String(result));
    }
  }

  const calculator = () => {
    switch (value.operator) {
      case "+":
        return value.first + value.second;
      case "-":
        return value.first - value.second;
      case "*":
        return value.first * value.second;
      case "/":
        return value.first / value.second;
      default:
        return NaN;
    }
  }

  return (
    <div className="App flex justify-center items-center">
      <div className='flex flex-col w-1/4 shadow-2xl rounded-lg' style={{minWidth: "450px"}}>
        <div className='text-right p-2 text-4xl text-gray-400 h-14 rounded-t-lg' style={{backgroundColor: "#0C356A"}}>{secondDisplay}</div>
        <div className='text-right p-2 text-6xl text-white h-20' style={{backgroundColor: "#0C356A"}}>{display}</div>
        <div className='grid grid-cols-4 grid-flow-row text-6xl gap-1 p-1 rounded-b-xl text-white text-center' style={{backgroundColor: "#0C356A"}}>
          <button onClick={handleClick} id='c' className='operator col-span-2'>C</button>
          <button onClick={handleBackspace} id='backspace' className='operator col-span-2'><BsFillBackspaceFill /></button>
          <button onClick={handleClick} id='1' className='number'>1</button>
          <button onClick={handleClick} id='2' className='number'>2</button>
          <button onClick={handleClick} id='3' className='number'>3</button>
          <button onClick={handleClick} id='/' className='operator'>/</button>
          <button onClick={handleClick} id='4' className='number'>4</button>
          <button onClick={handleClick} id='5' className='number'>5</button>
          <button onClick={handleClick} id='6' className='number'>6</button>
          <button onClick={handleClick} id='*' className='operator'>*</button>
          <button onClick={handleClick} id='7' className='number'>7</button>
          <button onClick={handleClick} id='8' className='number'>8</button>
          <button onClick={handleClick} id='9' className='number'>9</button>
          <button onClick={handleClick} id='-' className='operator'>-</button>
          <button onClick={handleClick} id='.' className='number'>.</button>
          <button onClick={handleClick} id='0' className='number'>0</button>
          <button onClick={handleClick} id='=' className='operator'>=</button>
          <button onClick={handleClick} id='+' className='operator'>+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
