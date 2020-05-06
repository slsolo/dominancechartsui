import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [hasError, setErrors] = useState(false);
  const [furs, setFurs] = useState([]);
  useEffect(() => {
    fetch("https://solo-development-web.herokuapp.com/furs/")
      .then((res) => res.json())
      .then((res) => setFurs(res))
      .catch(() => setErrors(true));
  });
  return (
    <div className="App">
      <form>
        <select>
          <option> Trait </option> <option> Fur </option>
          <option> Eyes </option> <option> Confetti Furs </option>
          <option> Ears </option> <option> Tails </option>
          <option>Shades</option> <option>Whiskers</option>
          <option>Whisker Shape</option>
        </select>
        <select>
          {furs.map((k, v) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default App;
