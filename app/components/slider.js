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
      <label>Lening per maand: €{leningpm}</label>
      <input
        type="range"
        min="0"
        max="1000"
        value={leningpm}
        onChange={handleChange}
        step="1"
      />
      <label>Leenduur: {leningpm} jaar</label>
      <input
        type="range"
        min="0"
        max="7"
        // value={value}
        onChange={handleChange}
        step="1"
      />
      <label>Aflosfase: {leningpm} jaar</label>
      <input
        type="range"
        min="0"
        max="35"
        // value={value}
        onChange={handleChange}
        step="1"
      />
      <label>Rentepercentage: {leningpm} %</label>
      <input
        // value={value}
        type="text"
        onChange={handleChange}
        step="1"
      />
    </section>
  );
};

export default Slider;
