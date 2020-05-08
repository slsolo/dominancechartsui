import React from "react";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const furs = useSelector((state) => state.furs);
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
          {furs.map((v, k) => (
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
