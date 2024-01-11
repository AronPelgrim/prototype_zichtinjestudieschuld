"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "../../styles/Global.css";
import Backg10 from "../components/backg10";
import Logo from "../components/logo";
import Progressbar from "../components/progressbar";

const Step10 = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [orientation, setOrientation] = useState("");
  const svgRef = useRef(null);
  const progressWidth = "90.9%";
  const currentPage = 9;
  const [antwoord, setAntwoord] = useState(false);

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
    const initialRente = urlParams.get("rentepercentage");
    const initialInkomen = urlParams.get("inkomen");
    const initialLeningpm = urlParams.get("leningpm");
    const initialLeenduur = urlParams.get("leenduur");
    const initialmax35 = urlParams.get("max35");
    const initialHypoRente = urlParams.get("hypotheekRente");
    const initialPre2024 = urlParams.get("geleendPre2024");

    setAanloopfase(initialAanloop ? initialAanloop : "nee");
    setMax35(initialmax35 ? initialmax35 : null);
    setAflosFase(initialAflos ? initialAflos : 1);
    setRentepercentage(initialRente ? initialRente : 0);
    setInkomen(initialInkomen ? initialInkomen : 0);
    setLeningpm(initialLeningpm ? initialLeningpm : 0);
    setLeenduur(initialLeenduur ? initialLeenduur : 1);
    setHypotheekRente(initialHypoRente ? initialHypoRente : 4.5);
    setGeleendPre2024(initialPre2024 ? initialPre2024 : 0);
  }, []);

  useEffect(() => {
    const headerText = `Het is belangrijk om rekening te houden met het verwachte inkomen na je studie, omdat je studieschuld invloed heeft op je maandelijkse kosten. Op deze manier kun je beoordelen of het bedrag dat je leent een goede investering is in vergelijking met je verwachte inkomsten. Wat wordt jouw verwachte bruto-inkomen per maand?`;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(headerText.substring(0, index));
      index++;
      if (index > headerText.length) {
        clearInterval(interval);
        setAntwoord(true);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

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

  const handleInkomen = (e) => {
    const inputValue = e.target.value;

    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === "") {
      setInkomen(inputValue);
    }
  };

  const characterAnimation = () => {
    const svgElement = svgRef.current;
    if (svgElement) {
      svgElement.classList.add("explode");
    }
  };

  return (
    <>
      {orientation === "Landscape" ? (
        <>
          {" "}
          <Link href={`/`}>
            <Logo />
          </Link>
          <Progressbar
            progressWidth={progressWidth}
            currentPage={currentPage}
          ></Progressbar>
          <header>{displayedText}</header>
          {antwoord && (
            <section className="antwoord">
              <div>
                <label>
                  Verwachte inkomen: € {formatToLocaleString(inkomen)}
                </label>
                <input
                  type="range"
                  min="1500"
                  max="10000"
                  value={inkomen}
                  onChange={handleInkomen}
                  step="50"
                />
              </div>
              <Link
                href={`/result?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&max35=${max35}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&hypotheekRente=${hypotheekRente}&inkomen=${inkomen}&geleendPre2024=${geleendPre2024}`}
                className="opslaan"
              >
                Opslaan
              </Link>
              <Link
                href={`https://loonwijzer.nl/salaris/salarischeck#/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Wat wordt mijn inkomen?
              </Link>
            </section>
          )}
          <section className="vorige-volgende">
            <Link
              href={`/step9?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&max35=${max35}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&hypotheekRente=${hypotheekRente}&inkomen=${inkomen}&geleendPre2024=${geleendPre2024}`}
            >
              Vorige
            </Link>{" "}
          </section>
          <Backg10 />
          <svg
            ref={svgRef}
            id="Laag_1"
            data-name="Laag 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 506.78 775.059"
            className="character walking"
            onClick={characterAnimation}
          >
            <path
              d="m385.539,492.19s.054-9.322-9.268-10.169c-9.322-.847-27.119-3.742-27.119-3.742h-175.696l-27.694,9.674s-7.627-3.39-7.627,8.475v171.186s-3.39,11.017,6.78,12.712c10.169,1.695,49.26,0,49.26,0v67.797h43.827c.829-4.887,1.662-9.774,2.553-14.65,1.655-9.056,3.683-17.942,4.695-27.104.93-8.417,2.123-16.499,5.517-24.329.517-1.192,1.283-1.925,2.153-2.301.404-.56.935-1.029,1.591-1.359.562-1.781,2.215-2.705,4.008-2.807,1.645-.88,3.648-.759,5.185,1.218,10.714,13.787,11.378,32.338,16.507,48.457,2.445,7.685,5.08,15.305,7.851,22.875h41.841v-63.559l43.893-.847s11.602,0,11.699-10.169,0-79.661,0-79.661l.043-101.695Z"
              style={{
                fill: inkomen > 1500 ? "#C1972B" : "#201f32",
                transition: "fill .2s ease-in-out",
                strokeWidth: 0,
              }}
            />
            <path
              d="m224.176,660.834h71.587v-148.91s-25.378,25.463-71.587,4.559v144.35Z"
              style={{ fill: "#c2bfe0", strokeWidth: 0 }}
            />
            <path
              d="m118.644,426.089s6.78,23.729,41.373,43.373c0,0,23.034,16.797,73.034,41.373,0,0,28.814,12.712,51.695,0,22.881-12.712,94.068-58.475,94.068-58.475,0,0,16.949-23.729,18.644-37.288s8.475-173.729,8.475-173.729l4.237-115.254s6.78-26.271-37.288-44.068l-9.62-6.871-14.109-10.078s-15.254-25.424-41.525-29.661c-26.271-4.237-183.051,33.051-183.051,33.051,0,0-30.508,19.492-16.102,48.305l7.627,20.339s-18.644,13.559-17.797,51.695-.028,86.979-.028,86.979l6.808,82.512s2.164,47.37,13.559,67.797Z"
              style={{
                fill: "#f1d1b5",
                stroke: "#201f32",
                strokeMiterlimit: 10,
                strokeWidth: 10,
                transition: "fill .5s ease-in-out",
                fill: "#f1d1b5",
              }}
            />
            <path
              d="m363.262,75.15c42.075-11.109,53.688,21.278,53.688,21.278,0,0-5.474-42.167-62.907-27.863"
              style={{ fill: "#201e32", strokeWidth: 0 }}
            />
            <path
              d="m405.666,247.595c-6.277-27.06-37.869-65.574-37.869-65.574,22.881-53.39-13.754-77.119-13.754-77.119-183.246,44.068-217.602,38.983-217.602,38.983-5.932,8.475,5.085,38.136,5.085,38.136l-38.136,50.847-5.113-66.102,17.825-29.661-11.281-32.203,15.371-33.079,60.317-16.013,127.119-20.4,30.826,16.63,19.174,20.659,39.686,23.729,11.692,16.776-3.339,134.392Z"
              style={{ fill: "#201e32", strokeWidth: 0 }}
            />
            <polygon
              points="270.339 315.072 270.339 232.868 376.271 258.292 376.271 276.701 283.051 259.987 274.681 296.256 270.339 315.072"
              style={{ fill: "#201f32", strokeWidth: 0 }}
            />
            <path
              d="m274.681,296.256c7.732,11.693,24.472,10.341,24.472,10.341,0,0-22.9-7.827-21.186-19.915"
              style={{ fill: "#201e32", strokeWidth: 0 }}
            />
            <path
              d="m137.288,286.682l-4.237-12.712s87.288-33.475,105.085-25l3.39,73.729-5.886-26.035-5.131-22.693-93.22,12.712Z"
              style={{ fill: "#201f32", strokeWidth: 0 }}
            />
            <path
              d="m235.639,296.663c-9.276,14.643-22.927,9.981-22.927,9.981,0,0,13.651,4.19,22.927-19.963"
              style={{ fill: "#201e32", strokeWidth: 0 }}
            />
            <ellipse
              cx="76.39"
              cy="323.211"
              rx="26.422"
              ry="60.96"
              transform="translate(-61.059 20.872) rotate(-11.15)"
              style={{
                fill: "#f1d1b5",
                transition: "fill 1s ease-in-out",
                stroke: "#201f32",
                strokeMiterlimit: 10,
                strokeWidth: 10,
              }}
            />
            <ellipse
              cx="434.017"
              cy="327.36"
              rx="60.96"
              ry="26.422"
              transform="translate(28.908 689.882) rotate(-78.85)"
              style={{
                fill: "#f1d1b5",
                transition: "fill 1s ease-in-out",
                stroke: "#201f32",
                strokeMiterlimit: 10,
                strokeWidth: 10,
              }}
            />
            <path
              d="m241.525,345.58s-7.279,34.347,15.678,35.593c22.957,1.247,17.478-35.593,17.478-35.593"
              style={{
                fill: "none",
                stroke: "#201e31",
                strokeMiterlimit: 10,
                strokeWidth: 5,
              }}
            />
            <ellipse
              cx="319.872"
              cy="286.984"
              rx="20.719"
              ry="10.032"
              style={{ fill: "#fff", strokeWidth: 0 }}
            />
            <ellipse
              cx="194.176"
              cy="286.984"
              rx="20.719"
              ry="10.032"
              style={{ fill: "#fff", strokeWidth: 0 }}
            />
            <circle
              cx="194.176"
              cy="286.984"
              r="10.032"
              style={{ fill: "#033b00", strokeWidth: 0 }}
            />
            <circle
              cx="319.872"
              cy="286.984"
              r="10.032"
              style={{ fill: "#033b00", strokeWidth: 0 }}
            />
            <ellipse
              cx="161.017"
              cy="631.173"
              rx="17.797"
              ry="11.017"
              style={{
                fill: "#f1d1b5",
                transition: "fill 1.5s ease-in-out",
                strokeWidth: 0,
              }}
            />
            <ellipse
              cx="359.685"
              cy="631.173"
              rx="17.797"
              ry="11.017"
              style={{
                fill: "#f1d1b5",
                transition: "fill 1.5s ease-in-out",
                strokeWidth: 0,
              }}
            />
            <polygon
              points="241.525 538.801 257.841 551.512 240.429 649.818 259.969 674.394 279.661 649.818 263.203 552.36 274.681 538.801 260.045 524.715 241.525 538.801"
              style={{ fill: "#3f6dff", strokeWidth: 0 }}
            />
            <ellipse
              cx="204.208"
              cy="751.512"
              rx="33.41"
              ry="17.797"
              style={{ fill: "#201e32", strokeWidth: 0 }}
            />
            <ellipse
              cx="320.071"
              cy="751.512"
              rx="33.41"
              ry="17.797"
              style={{ fill: "#201e32", strokeWidth: 0 }}
            />
            <path
              d="m152.61,402.038l1.237,35.593s-8.864,21.186,72.492,68.644c0,0,35.593,12.712,64.407,0,28.814-12.712,54.237-35.593,54.237-35.593,0,0,21.186-15.254,24.576-37.288,3.39-22.034,4.237-36.864,4.237-36.864"
              style={{
                fill: "none",
                stroke: "#201e32",
                strokeMiterlimit: 10,
                strokeWidth: 2,
              }}
            />
            <g
              style={{
                animation: antwoord
                  ? ""
                  : "appear .5s ease-in infinite alternate",
              }}
            >
              <path
                d="m173.456,401.512s62.999,155.288,180.025-4.983l-180.025,4.983Z"
                style={{
                  fill: inkomen > 1500 ? "#C1972B" : "#fff",
                  transition: "fill .2s ease-in-out",
                  strokeMiterlimit: 10,
                }}
              />
              <path
                d="m353.482,396.529l-180.025,4.983s74.016-14.203,180.025-4.983Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="m173.456,401.611s.573,1.246,1.701,3.391c11.163,21.234,76.654,130.561,178.324-8.473,0,0-99.112,159.788-180.025,5.082Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="m205.672,400.675c-.357,9.03-.714,18.061-1.072,27.091-.137,3.458-.477,6.923-.466,10.385.01,3.209.343,6.638,2.109,9.405,1.036,1.622,3.633.12,2.59-1.514-1.657-2.595-1.746-5.857-1.693-8.843.062-3.476.361-6.952.498-10.427.344-8.699.688-17.398,1.032-26.097.076-1.931-2.924-1.927-3,0h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="m238.687,398.978c-.694,16.685-.649,33.398.156,50.078.231,4.789.526,9.575.879,14.356.141,1.914,3.142,1.929,3,0-1.229-16.654-1.721-33.36-1.453-50.057.077-4.794.218-9.587.418-14.377.08-1.93-2.92-1.927-3,0h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="m279.861,399.826c.76,15.508,1.947,31.005,3.726,46.431.496,4.301,1.045,8.595,1.652,12.882.27,1.904,3.161,1.094,2.893-.798-2.148-15.165-3.536-30.442-4.539-45.722-.28-4.262-.523-8.526-.732-12.792-.094-1.922-3.095-1.933-3,0h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="m174.181,404.925c4.874,2.135,8.32,6.233,12.264,9.647,2.03,1.757,4.2,3.362,6.658,4.468,2.568,1.155,5.272,1.829,8.055,2.208,6.31.86,12.79.503,19.141.493,6.829-.011,13.658-.022,20.487-.033,13.908-.022,27.816-.044,41.724-.066,6.821-.011,13.644.025,20.465-.042,6.273-.061,12.694-.398,18.664-2.49,11.789-4.131,20.319-14.046,31.867-18.615,1.774-.702,1.001-3.604-.798-2.893-10.181,4.028-17.989,11.986-27.705,16.84-5.456,2.726-11.363,3.764-17.414,4.042-6.598.304-13.23.139-19.833.149-13.658.022-27.316.043-40.974.065-6.829.011-13.658.022-20.487.033-6.534.01-13.094.191-19.624-.035-3.261-.113-6.527-.426-9.662-1.376-2.934-.889-5.53-2.421-7.872-4.382-4.375-3.664-8.105-8.266-13.442-10.603-1.752-.767-3.28,1.817-1.514,2.59h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="m315.413,397.629c2.208.933,2.098,4.724,2.342,6.698.413,3.337.73,6.686.952,10.042.444,6.712.496,13.445.182,20.165-.09,1.93,2.91,1.925,3,0,.344-7.375.246-14.766-.323-22.128-.275-3.569-.665-7.127-1.15-10.673-.343-2.502-.865-5.585-3.489-6.694-.752-.318-1.598-.22-2.052.538-.375.625-.207,1.737.538,2.052h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
            </g>
          </svg>{" "}
        </>
      ) : orientation === "Portrait" ? (
        <section className="portretMode">
          <h1>Draai je scherm op Landscape mode!</h1>
        </section>
      ) : null}
    </>
  );
};

export default Step10;
