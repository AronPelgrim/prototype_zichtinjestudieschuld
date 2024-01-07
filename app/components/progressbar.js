"use client";

import React, { useEffect, useState } from "react";
import ResultFlag from "./resultflag";
import "../../styles/Global.css";

const Progressbar = ({ progressWidth, currentPage }) => {
  const [aflosFase, setAflosFase] = useState(0);
  const [aanloopfase, setAanloopfase] = useState("");
  const [rentepercentage, setRentepercentage] = useState(0);
  const [inkomen, setInkomen] = useState(0);
  const [leningpm, setLeningpm] = useState(0);
  const [leenduur, setLeenduur] = useState(0);
  const [max35, setMax35] = useState(null);

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
    "result",
  ];

  const handleCircleClick = (index) => {
    const queryParams = `?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&max35=${max35}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&inkomen=${inkomen}`;

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

    setAanloopfase(initialAanloop ? initialAanloop : "");
    setMax35(initialmax35 ? initialmax35 : null);
    setAflosFase(initialAflos ? initialAflos : 1);
    setRentepercentage(initialRente ? initialRente : 0);
    setInkomen(initialInkomen ? initialInkomen : 1500);
    setLeningpm(initialLeningpm ? initialLeningpm : 0);
    setLeenduur(initialLeenduur ? initialLeenduur : 1);
  }, []);

  return (
    <section
      className={"completeness-meter"}
      style={{ "--progress-width": progressWidth }}
    >
      <section className="progress-container">
        {pages.map((page, index) => (
          <section
            key={index}
            className={`circle 
      ${currentPage === index ? "active" : ""}
      ${currentPage > index ? "done" : ""}
    `}
            onClick={() => handleCircleClick(index)}
          >
            {index === pages.length - 1 ? <ResultFlag /> : index + 1}
          </section>
        ))}
      </section>
    </section>
  );
};

export default Progressbar;
