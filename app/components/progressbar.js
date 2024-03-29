"use client";

import React, { useEffect, useState } from "react";
import ResultFlag from "./resultflag";
import "../../styles/Global.css";

const Progressbar = ({ progressWidth, currentPage }) => {
  // State hooks voor verschillende parameters gerelateerd aan studieschuld en hypotheek
  const [aflosFase, setAflosFase] = useState(0);
  const [aanloopfase, setAanloopfase] = useState("");
  const [rentepercentage, setRentepercentage] = useState(0);
  const [inkomen, setInkomen] = useState(0);
  const [leningpm, setLeningpm] = useState(0);
  const [leenduur, setLeenduur] = useState(0);
  const [max35, setMax35] = useState(null);
  const [hypotheekRente, setHypotheekRente] = useState(0);
  const [geleendPre2024, setGeleendPre2024] = useState(0);

  // Array met paginanamen voor navigatie
  const pages = [
    "step1",
    "step2",
    "step3",
    "step4",
    "step5",
    "step6",
    "step7",
    "step8",
    "step9",
    "step10",
    "result",
  ];

  // Functie om naar de geselecteerde pagina te navigeren met huidige parameters in de URL
  const handleCircleClick = (index) => {
    // Bouw query parameters op basis van huidige state
    const queryParams = `?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&max35=${max35}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&hypotheekRente=${hypotheekRente}&inkomen=${inkomen}&geleendPre2024=${geleendPre2024}`;

    // Navigeer naar de geselecteerde pagina met de opgebouwde query parameters
    window.location.href = `/${pages[index]}${queryParams}`;
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const initialAanloop = urlParams.get("aanloopfase");
    const initialAflos = urlParams.get("aflosfase");
    const initialRente = urlParams.get("rentepercentage");
    const initialInkomen = urlParams.get("inkomen");
    const initialLeningpm = urlParams.get("leningpm");
    const initialLeenduur = urlParams.get("leenduur");
    const initialmax35 = urlParams.get("max35");
    const initialHypoRente = urlParams.get("hypotheekRente");
    const initialPre2024 = urlParams.get("geleendPre2024");

    setAanloopfase(initialAanloop ? initialAanloop : "nee");
    setMax35(initialmax35 ? initialmax35 : true);
    setAflosFase(initialAflos ? initialAflos : 1);
    setRentepercentage(
      initialRente ? initialRente : initialmax35 === "true" ? 2.95 : 2.56
    );
    setInkomen(initialInkomen ? initialInkomen : 1500);
    setLeningpm(initialLeningpm ? initialLeningpm : 0);
    setLeenduur(initialLeenduur ? initialLeenduur : 1);
    setHypotheekRente(initialHypoRente ? initialHypoRente : 4.5);
    setGeleendPre2024(initialPre2024 ? initialPre2024 : 0);
  }, []);

  return (
    //Sectie voor voortgangsmeter met dynamische breedte
    <section
      className={"completeness-meter"}
      style={{ "--progress-width": progressWidth }}
    >
      {/* Container voor cirkels met paginanummers */}
      <section className="completeness-container">
        {/* Map over de paginanamen om cirkels weer te geven */}
        {pages.map((page, index) => (
          <section
            key={index}
            className={`circle 
          ${currentPage === index ? "active" : ""}
          ${currentPage > index ? "done" : ""}
        `}
            onClick={() => handleCircleClick(index)}
          >
            {/* Toon paginanummer of resultaatvlag voor de laatste pagina */}
            {index === pages.length - 1 ? <ResultFlag /> : index + 1}
          </section>
        ))}
      </section>
    </section>
  );
};

export default Progressbar;
