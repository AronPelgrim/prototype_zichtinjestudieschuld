import React, { useState, useEffect } from "react";
import "../../styles/Global.css";

const Slider = ({ onChange1, onChange2, onChange3, onChange4 }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const initialLeningpm = urlParams.get("leningpm");
  const initialLeenduur = urlParams.get("leenduur");
  const initialAflosFase = urlParams.get("aflosfase");
  const initialRentepercentage = urlParams.get("rentepercentage");

  const [leningpm, setLeningpm] = useState(initialLeningpm || 0);
  const [leenduur, setLeenduur] = useState(initialLeenduur || 0);
  const [aflosFase, setAflosFase] = useState(initialAflosFase || 0);
  const [rentepercentage, setRentepercentage] = useState(
    initialRentepercentage || 0
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (initialLeningpm !== null) {
        setLeningpm(parseInt(initialLeningpm));
      } else {
        setLeningpm(0);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [initialLeningpm]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (initialLeenduur !== null) {
        setLeenduur(parseInt(initialLeenduur));
      } else {
        setLeenduur(1);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [initialLeenduur]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (initialAflosFase !== null) {
        setAflosFase(parseInt(initialAflosFase));
      } else {
        setAflosFase(0);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [initialAflosFase]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (initialRentepercentage !== null) {
        setRentepercentage(parseFloat(initialRentepercentage));
      } else {
        setRentepercentage(0);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [initialRentepercentage]);

  const handleLeningpm = (e) => {
    const updatedValue = parseInt(e.target.value);
    setLeningpm(updatedValue);
    onChange1(updatedValue);
  };

  const handleLeenduur = (e) => {
    const updatedValue = parseInt(e.target.value);
    setLeenduur(updatedValue);
    onChange2(updatedValue);
  };

  const handleAflosFase = (e) => {
    const updatedValue = parseInt(e.target.value);
    setAflosFase(updatedValue);
    onChange3(updatedValue);
  };

  const handleRentepercentage = (e) => {
    const inputValue = e.target.value;

    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === "") {
      setRentepercentage(inputValue);
      onChange4(inputValue);
    }
  };

  return (
    <section className="slider">
      <h1>Jouw gegevens</h1>
      <div>
        <input
          type="range"
          min="0"
          max="1000"
          value={leningpm}
          onChange={handleLeningpm}
          step="1"
        />
        <label>Lening per maand: €{leningpm}</label>
      </div>
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={leenduur}
          onChange={handleLeenduur}
          step="1"
        />
        <label>Leenduur: {leenduur} jaar</label>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="35"
          value={aflosFase}
          onChange={handleAflosFase}
          step="1"
        />
        <label>Aflosfase: {aflosFase} jaar</label>
      </div>
      <div>
        <input
          type="text"
          value={rentepercentage}
          onChange={handleRentepercentage}
          placeholder="0.00"
        />
        <label>
          Rentepercentage:{" "}
          {rentepercentage !== null && !isNaN(parseFloat(rentepercentage))
            ? parseFloat(rentepercentage).toFixed(2) + "%"
            : "0.00%"}
        </label>
      </div>
    </section>
  );
};

export default Slider;
