"use client";

import React, { useEffect, useState } from "react";
import "../../styles/Global.css";

const Progressbar = ({ progressWidth, currentPage }) => {
  const [aflosFase, setAflosFase] = useState(0);
  const [aanloopfase, setAanloopfase] = useState("");
  const [rentepercentage, setRentepercentage] = useState(0);
  const [inkomen, setInkomen] = useState(0);
  const [leningpm, setLeningpm] = useState(0);
  const [leenduur, setLeenduur] = useState(0);

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
  ];

  const handleCircleClick = (index) => {
    const queryParams = `?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&inkomen=${inkomen}`;

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

    setAanloopfase(initialAanloop ? initialAanloop : "nee");
    setAflosFase(initialAflos ? initialAflos : 0);
    setRentepercentage(initialRente ? initialRente : 0);
    setInkomen(initialInkomen ? initialInkomen : 0);
    setLeningpm(initialLeningpm ? initialLeningpm : 0);
    setLeenduur(initialLeenduur ? initialLeenduur : 0);
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
            {index + 1}
          </section>
        ))}
      </section>
    </section>
  );
};

export default Progressbar;
