"use client";

import { useState, useEffect } from "react";
import "../styles/Global.css";
import Character from "./components/character";
import Slider from "./components/slider";

const Step1 = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [sliderValue, setSliderValue] = useState(0);

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

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <>
      <header>{displayedText}</header>

      <Slider onSliderChange={handleSliderChange} />
      <section className="prevenext">
        <a href="" disabled>
          Vorige{" "}
        </a>
        <a href="/step2">Volgende </a>
      </section>
      <Character></Character>
    </>
  );
};

export default Step1;
