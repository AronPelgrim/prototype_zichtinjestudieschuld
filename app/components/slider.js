import React, { useState, useEffect, useRef } from "react";
import "../../styles/Global.css";

const Slider = ({
  onChange1,
  onChange2,
  onChange3,
  onChange4,
  onChange5,
  onChange6,
  onChange7,
}) => {
  const sliderRef = useRef(null);
  const [sliderHeight, setSliderHeight] = useState(0);
  const [hidePanel, setHidePanel] = useState(true);
  const [aflosFase, setAflosFase] = useState(0);
  const [aanloopfase, setAanloopfase] = useState("");
  const [rentepercentage, setRentepercentage] = useState(0);
  const [inkomen, setInkomen] = useState(0);
  const [leningpm, setLeningpm] = useState(0);
  const [leenduur, setLeenduur] = useState(0);
  const [max35, setMax35] = useState(null);
  const [hypotheekRente, setHypotheekRente] = useState(0);
  const [geleendPre2024, setGeleendPre2024] = useState(0);
  const [toggleChecked, setToggleChecked] = useState(false);

  const formatToLocaleString = (value) => {
    return parseFloat(value).toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const initialAanloop = urlParams.get("aanloopfase");
    const initialAflos = urlParams.get("aflosfase");
    const initialInkomen = urlParams.get("inkomen");
    const initialLeningpm = urlParams.get("leningpm");
    const initialLeenduur = urlParams.get("leenduur");
    const initialmax35 = urlParams.get("max35");
    const initialHypoRente = urlParams.get("hypotheekRente");
    const initialPre2024 = urlParams.get("geleendPre2024");

    setAanloopfase(initialAanloop ? initialAanloop : "nee");
    setMax35(
      initialmax35 === "true" ? true : initialmax35 === "false" ? false : null
    );
    setAflosFase(initialAflos ? initialAflos : 1);
    setRentepercentage(
      initialmax35 === "true" ? 2.56 : initialmax35 === "false" ? 2.95 : null
    );
    setInkomen(initialInkomen ? initialInkomen : 0);
    setLeningpm(initialLeningpm ? initialLeningpm : 0);
    setLeenduur(initialLeenduur ? initialLeenduur : 1);
    setHypotheekRente(initialHypoRente ? initialHypoRente : 4.5);
    setGeleendPre2024(initialPre2024 ? initialPre2024 : 0);

    if (initialAanloop == "ja") {
      setToggleChecked(true);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      if (sliderRef.current) {
        setSliderHeight(sliderRef.current.clientHeight);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const handleAanloopfase = (event) => {
    setToggleChecked(event.target.checked);
    if (toggleChecked == false) {
      setAanloopfase("ja");
      onChange4("ja");
    } else if (toggleChecked == true) {
      setAanloopfase("nee");
      onChange4("nee");
    }
  };

  const handleInkomen = (e) => {
    const inputValue = e.target.value;

    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === "") {
      setInkomen(inputValue);
      onChange5(inputValue);
    }
  };

  const handleHypotheekrente = (e) => {
    const inputValue = e.target.value;

    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === "") {
      setHypotheekRente(inputValue);
      onChange6(inputValue);
    }
  };

  const handlePre2024 = (e) => {
    const updatedValue = parseFloat(e.target.value);
    setGeleendPre2024(updatedValue);
    onChange7(updatedValue);
  };

  return (
    <>
      <section
        ref={sliderRef}
        className="slider"
        style={{
          bottom: hidePanel ? `-${sliderHeight}px` : "0",
          transition: "bottom 0.4s ease, height 0.4s ease",
        }}
      >
        {" "}
        <button
          onClick={() => setHidePanel(hidePanel == false ? true : false)}
          style={{
            animation: hidePanel
              ? "heartbeat 1.5s ease-in-out infinite both"
              : "none",
          }}
        >
          Klik voor het {hidePanel == false ? "verbergen" : "bewerken"} van je
          verzamelde gegevens
        </button>
        <div>
          <label>Lening per maand: €{formatToLocaleString(leningpm)}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={leningpm}
            onChange={handleLeningpm}
            step="10"
          />
        </div>
        <div>
          {" "}
          <label>Totale leenduur: {leenduur} jaar</label>
          <input
            type="range"
            min="1"
            max="10"
            value={leenduur}
            onChange={handleLeenduur}
            step="1"
          />
        </div>
        <div>
          <label>Geleend voor 2024: {geleendPre2024} jaar</label>
          <input
            type="range"
            min="0"
            max={parseInt(leenduur)}
            value={geleendPre2024}
            onChange={handlePre2024}
            step="1"
          />
        </div>
        {max35 === true ? (
          <div>
            <label>
              Aflosfase SF35: {aflosFase == null ? 0 : aflosFase} jaar
            </label>
            <input
              type="range"
              min="1"
              max="35"
              value={aflosFase}
              onChange={handleAflosFase}
              step="1"
            />
          </div>
        ) : max35 === false ? (
          <div>
            <label>
              Aflosfase SF15: {aflosFase == null ? 0 : aflosFase} jaar
            </label>
            <input
              type="range"
              min="1"
              max="15"
              value={aflosFase}
              onChange={handleAflosFase}
              step="1"
            />
          </div>
        ) : null}
        <div>
          {" "}
          <label>Aanloopfase: {aanloopfase}</label>
          <input
            type="checkbox"
            id="switch"
            checked={toggleChecked}
            onChange={handleAanloopfase}
          />
          <label className="label-toggle" htmlFor="switch">
            Toggle
          </label>
        </div>{" "}
        <div>
          <label>
            Hypotheekrente:{" "}
            {hypotheekRente !== null && !isNaN(parseFloat(hypotheekRente))
              ? parseFloat(hypotheekRente).toLocaleString("nl-NL", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              : "0,00%"}
          </label>
          <input
            type="number"
            value={hypotheekRente}
            onChange={handleHypotheekrente}
            placeholder="0,00"
            step={0.01}
          />
        </div>
        <div>
          {" "}
          <label>Inkomen: € {formatToLocaleString(inkomen)}</label>
          <input
            type="range"
            min="1500"
            max="10000"
            value={inkomen}
            onChange={handleInkomen}
            step="50"
          />
        </div>
      </section>
    </>
  );
};

export default Slider;
