import React, { useCallback, useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import "./App.css";
import { FiRefreshCcw } from "react-icons/fi";

const App = () => {
  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: false,
    numbers: true,
    symbols: true,
  });
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("");

  const handleChange = (option, e) => {
    let trueCount = 0;
    let lastTrueky;
    for (let prop in options) {
      if (options[prop]) {
        trueCount++;
        lastTrueky = prop;
      }
    }
    if (trueCount === 1 && e.target.name === lastTrueky) {
      generatepassword();
    } else {
      setOptions({ ...options, [option]: !options[option] });
    }
  };
  const generatepassword = useCallback(() => {
    let range = "";
    let pass = "";

    if (options.uppercase) {
      range += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (options.lowercase) {
      range += "abcdefghijklmnopqrstuvwxyz";
    }
    if (options.numbers) {
      range += "0123456789";
    }
    if (options.symbols) {
      range += "~`!@#$%^&*()_-+=|}]{:;/?.>,<";
    }

    for (let i = 0; i < length; i++) {
      pass += range[Math.floor(Math.random() * range.length)];
    }
    setPassword(pass);
  }, [options, length, setPassword]);
  useEffect(() => {
    generatepassword();
  }, [options, length]);

  return (
    <div>
      <h1></h1>
      <div className="password-wrapper">
        <div className="password-top">
          <p className="password">{password}</p>
          <div className="icons-container">
            <FaCopy size={30} />
            <FiRefreshCcw size={28} onClick={generatepassword} />
          </div>
        </div>
        <div className="password-bottom">
          <div className="length-wrapper">
            <div className="length-text-container">
              <p className="length">Length</p>
              <p>{length}</p>
            </div>
            <input
              type="range"
              className="gc"
              min={1}
              max={30}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="options-wrapper">
            {Object.keys(options).map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  className="cb"
                  checked={options[option]}
                  onChange={(event) => handleChange(option, event)}
                  name={option}
                  id={option}
                />
                <label htmlFor={option}>Add {option} characters</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
