import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { FETCH_FURS, COMPARE_FURS } from "./actions";

const initialFormData = Object.freeze({first: "", second:""});

function App() {
  const furs = useSelector((state) => state.furReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: FETCH_FURS });
  }, [dispatch]);

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    dispatch({type: COMPARE_FURS, payload: JSON.stringify(formData)});
  };

  return (
    <div className="App">
      <form>
        <select name={"first"} onChange={handleChange}>
          <option>Option 1</option>
          {furs.furs.map((v, k) => (
            <option key={k} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select name={"second"} onChange={handleChange}>
          <option>Option 2</option>
          {furs.furs.map((v, k) => (
            <option key={k} value={v}>
              {v}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Check</button>
      </form>
          <p>{furs.comparison}</p>
    </div>
  );
}

export default App;
