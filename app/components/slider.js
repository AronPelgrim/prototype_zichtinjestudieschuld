import { useState, useEffect } from "react";
import "../../styles/Global.css";

const Slider = ({ onSliderChange }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const initialSliderValue = urlParams.get("sliderValue");

  const [value, setValue] = useState(initialSliderValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (initialSliderValue !== null) {
        setValue(parseInt(initialSliderValue));
      } else {
        setValue(0);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [initialSliderValue]);

  const handleChange = (e) => {
    const updatedValue = parseInt(e.target.value);
    setValue(updatedValue);
    onSliderChange(updatedValue);
  };

  return (
    <section className="slider">
      <input
        type="range"
        min="0"
        max="1000"
        value={value}
        onChange={handleChange}
        step="1"
      />
      <p>Lening per maand: €{value}</p>
    </section>
  );
};

export default Slider;
