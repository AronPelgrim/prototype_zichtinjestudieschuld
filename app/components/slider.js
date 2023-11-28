import { useState } from "react";
import "../../styles/Global.css";

const Slider = ({ onSliderChange }) => {
  const [value, setValue] = useState(0);

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
