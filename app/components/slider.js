import React, { useState, useEffect } from "react";
import "../../styles/Global.css";

const Slider = ({ onChange1, onChange2, onChange3, onChange4, onChange5 }) => {
  const [aflosFase, setAflosFase] = useState(0);
  const [aanloopfase, setAanloopfase] = useState("");
  const [rentepercentage, setRentepercentage] = useState(0);
  const [inkomen, setInkomen] = useState(0);
  const [leningpm, setLeningpm] = useState(0);
  const [leenduur, setLeenduur] = useState(0);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const initialAanloop = urlParams.get("aanloopfase");
    const initialAflos = urlParams.get("aflosfase");
    const initialRente = urlParams.get("rentepercentage");
    const initialInkomen = urlParams.get("inkomen");
    const initialLeningpm = urlParams.get("leningpm");
    const initialLeenduur = urlParams.get("leenduur");

    setAanloopfase(initialAanloop ? initialAanloop : "");
    setAflosFase(initialAflos ? initialAflos : 0);
    setRentepercentage(initialRente ? initialRente : 0);
    setInkomen(initialInkomen ? initialInkomen : 0);
    setLeningpm(initialLeningpm ? initialLeningpm : 0);
    setLeenduur(initialLeenduur ? initialLeenduur : 0);
  }, []);

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

  const handleInkomen = (e) => {
    const inputValue = e.target.value;

    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === "") {
      setInkomen(inputValue);
      onChange4(inputValue);
    }
  };

  const handleRentepercentage = (e) => {
    const inputValue = e.target.value;

    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === "") {
      setRentepercentage(inputValue);
      onChange5(inputValue);
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
          step="10"
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
          type="range"
          min="1500"
          max="10000"
          value={inkomen}
          onChange={handleInkomen}
          step="50"
        />
        <label>
          Inkomen:{" "}
          {inkomen !== null && !isNaN(parseFloat(inkomen))
            ? "€" + inkomen + " p/m"
            : "€0.00"}
        </label>
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
