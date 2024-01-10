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
import Character from "../components/character";

import Link from "next/link";

const Result = () => {
  const [orientation, setOrientation] = useState("");
  const [extraInfo, setExtraInfo] = useState(false);
  const [studieSchuld, setStudieSchuld] = useState(0);
  const [hypotheek, setHypotheek] = useState(0);
  const [afloskosten, setAfloskosten] = useState(0);
  const [rentebetaald, setRentebetaald] = useState(0);
  const [koopkracht, setKoopkracht] = useState(0);
  const [jarenPre2024, setJarenPre2024] = useState({});
  const progressWidth = "100%";
  const currentPage = 10;

  const [aflosFase, setAflosFase] = useState(0);
  const [aanloopfase, setAanloopfase] = useState("");
  const [rentepercentage, setRentepercentage] = useState(0);
  const [inkomen, setInkomen] = useState(0);
  const [leningpm, setLeningpm] = useState(0);
  const [leenduur, setLeenduur] = useState(0);
  const [max35, setMax35] = useState(null);
  const [hypotheekRente, setHypotheekRente] = useState(0);
  const [geleendPre2024, setGeleendPre2024] = useState(0);

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
      initialmax35 === "true" ? true : initialmax35 === "false" ? true : null
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
  }, []);

  useEffect(() => {
    const rentePre2024 = [0.46, 0.0, 0.0, 0.0, 0.1, 0.1, 0.1, 0.0, 0.12, 0.81];
    const rente = rentepercentage / 100;
    const months = leenduur * 12;
    let totalAmount = 0;
    const rentePersoonlijk = [];

    for (let i = 0; i < months; i++) {
      if (i < geleendPre2024 * 12) {
        rentePersoonlijk.push(
          rentePre2024[Math.floor((geleendPre2024 * 12 - i - 1) / 12)] /
            100 /
            12
        );
      } else {
        rentePersoonlijk.push(rente / 12);
      }
    }

    for (let i = 0; i < months; i++) {
      totalAmount += leningpm * Math.pow(1 + rentePersoonlijk[i], i + 1);
    }

    if (aanloopfase === "ja") {
      for (let i = 0; i < 24; i++) {
        totalAmount = totalAmount * (1 + rente / 12);
      }
    }

    setStudieSchuld(totalAmount);
  }, [leningpm, leenduur, rentepercentage, aanloopfase, geleendPre2024]);

  useEffect(() => {
    const monthlyRate = hypotheekRente / 100 / 12;
    const loanTermMonths = 30 * 12;

    const maxLoanAmount =
      (afloskosten / monthlyRate) *
      (1 - Math.pow(1 + monthlyRate, -loanTermMonths));

    setHypotheek(maxLoanAmount.toFixed(2));
  }, [afloskosten, hypotheekRente]);

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
    const koopkrachtBerekenen = inkomen - afloskosten;
    setKoopkracht(koopkrachtBerekenen);
  }, [inkomen, afloskosten]);

  useEffect(() => {
    const generateRentePerJaar = (startJaar) => {
      const rentepercentages = [
        { jaar: 2023, rente: 0.46 },
        { jaar: 2022, rente: 0.0 },
        { jaar: 2021, rente: 0.0 },
        { jaar: 2020, rente: 0.0 },
        { jaar: 2019, rente: 0.01 },
        { jaar: 2018, rente: 0.01 },
        { jaar: 2017, rente: 0.01 },
        { jaar: 2016, rente: 0.0 },
        { jaar: 2015, rente: 0.12 },
        { jaar: 2014, rente: 0.81 },
      ];

      const jarenMetRente = {};

      for (let i = startJaar; i >= 1; i--) {
        jarenMetRente[2024 - i] = rentepercentages[i - 1]?.rente || 0;
      }

      return jarenMetRente;
    };

    const renteVoorJaren = generateRentePerJaar(geleendPre2024);
    setJarenPre2024(renteVoorJaren);
  }, [geleendPre2024]);

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
    setHypotheekRente(value);
  };

  const handleSliderChange7 = (value) => {
    setGeleendPre2024(value);
  };

  const handleSliderChange8 = (value) => {
    if (value === "true") {
      setRentepercentage(2.56);
      setMax35(true);
    } else if (value === "false") {
      setRentepercentage(2.95);
      setMax35(false);
    }
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
            {extraInfo && (
              <section className="open">
                <span
                  class="info-icon"
                  onClick={() =>
                    setExtraInfo(extraInfo == false ? true : false)
                  }
                >
                  X
                </span>
                <p>
                  Dit is dus de studieschuld die je na {leenduur} jaar lenen
                  hebt opgebouwd, {aanloopfase == "ja" ? "met" : "zonder"} de
                  rente van de aanloopfase meegerekend. Deze schuld is opgebouwd
                  met de volgende rentepercentages:
                </p>
                <ul
                  style={{
                    animation: "appear1 .2s ease-in",
                  }}
                >
                  {Object.entries(jarenPre2024).map(([jaar, rente]) => (
                    <li key={jaar}>
                      Jaar {jaar}:{" "}
                      <span style={{ color: "#FD317D" }}>
                        {parseFloat(rente).toLocaleString("nl-NL", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) + "% "}
                      </span>
                      rente{"."}
                    </li>
                  ))}
                  {leenduur != geleendPre2024 ? (
                    <li>
                      Vanaf jaar 2024:{" "}
                      <span style={{ color: "#FD317D" }}>
                        {parseFloat(rentepercentage).toLocaleString("nl-NL", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) + "%"}
                      </span>{" "}
                      rente{" "}
                      {max35 === true
                        ? "(regeling SF35)"
                        : max35 === false
                        ? "(regeling SF15)"
                        : null}
                      {"."}
                    </li>
                  ) : null}
                </ul>
                <h1>€{formatToLocaleString(studieSchuld)}</h1>
                <StudieschuldSVG leningpm={leningpm}></StudieschuldSVG>
                <Character />
              </section>
            )}
            <section className="result-grid">
              <section>
                <span
                  class="info-icon"
                  onClick={() =>
                    setExtraInfo(extraInfo == false ? true : false)
                  }
                >
                  i
                </span>
                <p>
                  Je studieschuld na de studie,{" "}
                  {aanloopfase == "ja" ? "met" : "zonder"} aanloopfase.
                  Opgebouwd met {rentepercentage}% rente
                </p>
                <h1>€{formatToLocaleString(studieSchuld)}</h1>
                <StudieschuldSVG leningpm={leningpm}></StudieschuldSVG>
              </section>
              <section>
                <span class="info-icon">i</span>
                <p>Maandelijkse afloskosten</p>
                <h1>€{formatToLocaleString(afloskosten)}</h1>
                <AflosSVG leningpm={leningpm}></AflosSVG>
              </section>
              <section>
                <span class="info-icon">i</span>
                <p>Bedrag betaald aan rente na {aflosFase} jaar</p>
                <h1>€{formatToLocaleString(rentebetaald)}</h1>
                <RenteBetaaldSVG leningpm={leningpm}></RenteBetaaldSVG>
              </section>
              <section>
                {" "}
                <span class="info-icon">i</span>
                <p>Vermindering maximale hypotheekbedrag</p>
                <h1>€{formatToLocaleString(hypotheek)}</h1>
                <HypotheekSVG leningpm={leningpm}></HypotheekSVG>
              </section>
              <section>
                <span class="info-icon">i</span>
                <p>Je koopkracht na je maandelijkse aflossing</p>
                <h1>€{formatToLocaleString(koopkracht)}</h1>
                <HypotheekSVG leningpm={leningpm}></HypotheekSVG>
              </section>
            </section>
            <Slider
              onChange1={handleSliderChange1}
              onChange2={handleSliderChange2}
              onChange3={handleSliderChange3}
              onChange4={handleSliderChange4}
              onChange5={handleSliderChange5}
              onChange6={handleSliderChange6}
              onChange7={handleSliderChange7}
              onChange8={handleSliderChange8}
            />{" "}
          </section>
        </>
      ) : orientation === "Portrait" ? (
        <section className="portretMode">
          <h1>Draai je scherm op Landscape mode!</h1>
        </section>
      ) : null}
    </>
  );
};

export default Result;
