import { useState, useEffect } from "react";
import "../../styles/Global.css";

const Slider = ({ onSliderChange }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const initialSliderValue = urlParams.get("sliderValue");

  const [leningpm, setLeningpm] = useState(initialSliderValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (initialSliderValue !== null) {
        setLeningpm(parseInt(initialSliderValue));
      } else {
        setLeningpm(0);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [initialSliderValue]);

  const handleChange = (e) => {
    const updatedValue = parseInt(e.target.value);
    setLeningpm(updatedValue);
    onSliderChange(updatedValue);
  };

  return (
    <section className="slider">
      <div>
        {" "}
        <input
          type="range"
          min="0"
          max="1000"
          value={leningpm}
          onChange={handleChange}
          step="1"
        />
        <label>Lening per maand: €{leningpm}</label>
      </div>
      <div>
        {" "}
        <input
          type="range"
          min="0"
          max="7"
          // value={value}
          onChange={handleChange}
          step="1"
        />
        <label>Leenduur: {leningpm} jaar</label>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="35"
          // value={value}
          onChange={handleChange}
          step="1"
        />
        <label>Aflosfase: {leningpm} jaar</label>
      </div>
      <div>
        <input
          // value={value}
          type="number"
          onChange={handleChange}
          step="1"
        />
        <label>Rentepercentage: {leningpm}%</label>
      </div>
    </section>
  );
};

export default Slider;
