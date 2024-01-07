"use client";

import { useEffect, useState } from "react";
import "../../styles/Global.css";
import AflosSVG from "../components/aflossvg";
import HypotheekSVG from "../components/hypotheeksvg";
import Logo from "../components/logo";
import Progressbar from "../components/progressbar";
import RenteBetaaldSVG from "../components/rentebetaaldsvg";
import Slider from "../components/slider";
import StudieschuldSVG from "../components/studieschuld";

import Link from "next/link";

const Result = () => {
  const [orientation, setOrientation] = useState("");
  const [studieSchuld, setStudieSchuld] = useState(0);
  const [hypotheek, setHypotheek] = useState(0);
  const [afloskosten, setAfloskosten] = useState(0);
  const [rentebetaald, setRentebetaald] = useState(0);
  const progressWidth = "100%";
  const currentPage = 9;

  const [aflosFase, setAflosFase] = useState(0);
  const [aanloopfase, setAanloopfase] = useState("");
  const [rentepercentage, setRentepercentage] = useState(0);
  const [inkomen, setInkomen] = useState(0);
  const [leningpm, setLeningpm] = useState(0);
  const [leenduur, setLeenduur] = useState(0);
  const [max35, setMax35] = useState(null);

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
    setAflosFase(initialAflos ? initialAflos : 0);
    setRentepercentage(initialRente ? initialRente : 0);
    setInkomen(initialInkomen ? initialInkomen : 0);
    setLeningpm(initialLeningpm ? initialLeningpm : 0);
    setLeenduur(initialLeenduur ? initialLeenduur : 0);
  }, []);

  useEffect(() => {
    const rente = rentepercentage / 100;
    let berekenSchuld = 0;

    if (rente !== 0 && aanloopfase == "nee") {
      berekenSchuld =
        (leningpm * 12 * (Math.pow(1 + rente, leenduur) - 1)) / rente;
    } else if (rente !== 0 && aanloopfase == "ja") {
      let schuldMetRente =
        (leningpm * 12 * (Math.pow(1 + rente, leenduur) - 1)) / rente;

      for (let i = 0; i < 2; i++) {
        schuldMetRente *= 1 + rente;
      }

      berekenSchuld = schuldMetRente;
    } else {
      berekenSchuld = leningpm * 12 * leenduur;
    }

    setStudieSchuld(berekenSchuld.toFixed(2));
  }, [leningpm, leenduur, aanloopfase, rentepercentage]);

  useEffect(() => {
    const monthlyRate = 4.5 / 100 / 12;
    const loanTermMonths = 30 * 12;

    const maxLoanAmount =
      (afloskosten / monthlyRate) *
      (1 - Math.pow(1 + monthlyRate, -loanTermMonths));

    setHypotheek(maxLoanAmount.toFixed(2));
  }, [afloskosten]);

  useEffect(() => {
    const maandelijkseRente = rentepercentage / 12 / 100;
    const totaleBetalingen = aflosFase * 12;

    const maandelijkseBetaling =
      (maandelijkseRente * studieSchuld) /
      (1 - Math.pow(1 + maandelijkseRente, -totaleBetalingen));

    setAfloskosten(maandelijkseBetaling.toFixed(2));
  }, [studieSchuld, aflosFase, rentepercentage]);

  useEffect(() => {
    const totaleBetalingen = afloskosten * aflosFase * 12;
    const totaalBetaaldeRente = totaleBetalingen - studieSchuld;

    setRentebetaald(totaalBetaaldeRente.toFixed(2));
  }, [afloskosten, aflosFase, studieSchuld]);

  useEffect(() => {
    const handleOrientationChange = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      if (isPortrait) {
        setOrientation("Portrait");
      } else {
        setOrientation("Landscape");
      }
    };

    handleOrientationChange();

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  const formatToLocaleString = (value) => {
    return parseFloat(value).toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSliderChange1 = (value) => {
    setLeningpm(value);
  };

  const handleSliderChange2 = (value) => {
    setLeenduur(value);
  };

  const handleSliderChange3 = (value) => {
    setAflosFase(value);
  };

  const handleSliderChange4 = (value) => {
    setAanloopfase(value);
  };

  const handleSliderChange5 = (value) => {
    setInkomen(value);
  };

  const handleSliderChange6 = (value) => {
    setRentepercentage(value);
  };

  return (
    <>
      {" "}
      {orientation === "Landscape" ? (
        <>
          <section className="scroll">
            <Progressbar
              progressWidth={progressWidth}
              currentPage={currentPage}
            ></Progressbar>
            <Link href={`/`}>
              <Logo />
            </Link>
            <section className="result-grid">
              <section>
                <p>
                  Je studieschuld na de studie,{" "}
                  {aanloopfase == "ja" ? "met" : "zonder"} aanloopfase
                </p>
                <h1>€{formatToLocaleString(studieSchuld)}</h1>
                <StudieschuldSVG leningpm={leningpm}></StudieschuldSVG>
              </section>
              <section>
                <p>Maandelijkse afloskosten</p>
                <h1>€{formatToLocaleString(afloskosten)}</h1>
                <AflosSVG leningpm={leningpm}></AflosSVG>
              </section>
              <section>
                <p>Bedrag betaald aan rente na {aflosFase} jaar</p>
                <h1>€{formatToLocaleString(rentebetaald)}</h1>
                <RenteBetaaldSVG leningpm={leningpm}></RenteBetaaldSVG>
              </section>
              <section>
                <p>Vermindering maximale hypotheekbedrag</p>
                <h1>€{formatToLocaleString(hypotheek)}</h1>
                <HypotheekSVG leningpm={leningpm}></HypotheekSVG>
              </section>
              <section></section>
            </section>
            <Slider
              onChange1={handleSliderChange1}
              onChange2={handleSliderChange2}
              onChange3={handleSliderChange3}
              onChange4={handleSliderChange4}
              onChange5={handleSliderChange5}
              onChange6={handleSliderChange6}
            />{" "}
          </section>
        </>
      ) : (
        <section className="portretMode">
          <h1>Draai je scherm op Landscape mode!</h1>
        </section>
      )}
    </>
  );
};

export default Result;
