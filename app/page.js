"use client";

import { useState, useEffect } from "react";
import "../styles/Global.css";
import Character from "./components/character";

const Onboarding = () => {
  const [displayedText, setDisplayedText] = useState("");

  const [value, setValue] = useState(50);
  const [test, setTest] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const text = `De eerste 2 jaar na je studie heb je een zogenaamde
      'aanloopfase'. Hierin hoef je nog niks af te lossen, maar als
      je dat wil dan kan dat wel. Na twee jaar volgt de zogenaamde
      'aflosfase'. Je moet vanaf dan maandelijks gaan afbetalen.`;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header>{displayedText}</header>

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
      <section className="prevenext">
        <a href="https://ahrefs.com" target="_blank">
          Vorige{" "}
        </a>
        <a href="https://ahrefs.com" target="_blank">
          Volgende{" "}
        </a>
      </section>
      <Character></Character>
    </>
  );
};

export default Onboarding;
