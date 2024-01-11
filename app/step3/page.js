"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "../../styles/Global.css";
import Backg4 from "../components/backg4";
import Logo from "../components/logo";
import Progressbar from "../components/progressbar";

const Step3 = () => {
  // State hooks voor schermoriëntatie, getoonde tekst, antwoordstatus en verschillende parameters
  const [orientation, setOrientation] = useState("");
  const svgRef = useRef(null);
  const [displayedText, setDisplayedText] = useState("");
  const progressWidth = "27.27%";
  const currentPage = 2;
  const [antwoord, setAntwoord] = useState(false);

  // State hooks voor parameters gerelateerd aan studieschuld en hypotheek
  const [aflosFase, setAflosFase] = useState(0);
  const [aanloopfase, setAanloopfase] = useState("");
  const [rentepercentage, setRentepercentage] = useState(0);
  const [inkomen, setInkomen] = useState(0);
  const [leningpm, setLeningpm] = useState(0);
  const [leenduur, setLeenduur] = useState(0);
  const [max35, setMax35] = useState(null);
  const [hypotheekRente, setHypotheekRente] = useState(0);
  const [geleendPre2024, setGeleendPre2024] = useState(0);

  // Effect om initiële waarden in te stellen op basis van query parameters in de URL
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Haal query parameters op en zet deze als initiële waarden voor de states
    setAanloopfase(urlParams.get("aanloopfase") || "nee");
    setMax35(urlParams.get("max35") === "true" || false);
    setAflosFase(urlParams.get("aflosfase") || 1);
    setRentepercentage(urlParams.get("rentepercentage") || 0);
    setInkomen(urlParams.get("inkomen") || 1500);
    setLeningpm(urlParams.get("leningpm") || 0);
    setLeenduur(urlParams.get("leenduur") || 1);
    setHypotheekRente(urlParams.get("hypotheekRente") || 4.5);
    setGeleendPre2024(urlParams.get("geleendPre2024") || 0);
  }, []);

  // Effect om schermoriëntatie te controleren en bij te werken
  useEffect(() => {
    const handleOrientationChange = () => {
      // Controleer of de huidige oriëntatie staand (portrait) of liggend (landscape) is
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      // Zet de oriëntatie state op basis van de schermoriëntatie
      setOrientation(isPortrait ? "Portrait" : "Landscape");
    };

    // Roep de oriëntatiefunctie aan bij het laden en luister naar wijzigingen
    handleOrientationChange();
    window.addEventListener("resize", handleOrientationChange);

    // Voorkom geheugenlekken door luisteraar te verwijderen bij het opruimen
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  // Effect voor het geleidelijk weergeven van een introductietekst
  useEffect(() => {
    // Introductietekst instellen
    const headerText = `Er zijn verschillende aflosregelingen. Ben je je studie begonnen voor 1 september 2015: dan duurt je aflosfase maximaal 15 jaar (SF15). Ben je gestart op of na 1 september 2015: dan duurt je aflosfase maximaal 35 jaar (SF35). Selecteer de juiste regeling en vervolgens in hoeveel tijd jij je studieschuld zou willen afbetalen.`;

    // Variabele en interval voor het geleidelijk updaten van de getoonde tekst
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(headerText.substring(0, index));
      index++;

      // Stop het interval en geef antwoordstatus als de tekst compleet is
      if (index > headerText.length) {
        clearInterval(interval);
        setAntwoord(true);
      }
    }, 10);

    // Voorkom geheugenlekken door interval te wissen bij het opruimen
    return () => clearInterval(interval);
  }, []);

  // Functie om aflosregeling bij te werken op basis van invoer
  const handleRegeling = (e) => {
    // Zet de aflosregeling op basis van de geselecteerde waarde
    setMax35(e.target.value === "true");
    setAflosFase(1);
  };

  // Functie om aflosfase bij te werken op basis van invoer
  const handleAflosFase = (e) => {
    // Zet de bijgewerkte waarde als een geheel getal in de state
    const updatedValue = parseInt(e.target.value);
    setAflosFase(updatedValue);
  };

  // Animatiefunctie voor karakter
  const characterAnimation = () => {
    // Haal het SVG-element op met behulp van de ref
    const svgElement = svgRef.current;

    // Voeg een klasse toe voor animatie als het SVG-element bestaat
    if (svgElement) {
      svgElement.classList.add("explode");
    }
  };

  return (
    <>
      {/* Voorwaardelijke weergave op basis van schermoriëntatie */}
      {orientation === "Landscape" ? (
        <>
          <Link href={`/`}>
            <Logo />
          </Link>
          {/* Voortgangsbalk met dynamische breedte en huidige pagina */}
          <Progressbar
            progressWidth={progressWidth}
            currentPage={currentPage}
          ></Progressbar>
          {/* Header met dynamische tekst */}
          <header>{displayedText}</header>
          {antwoord && (
            <section className="antwoord">
              <div style={{ marginBottom: ".5em" }}>
                {/* Radio-inputs voor het selecteren van aflosregeling (SF35 of SF15) */}
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={max35 === true}
                    onChange={handleRegeling}
                    style={{ marginRight: "1em" }}
                  />
                  SF35
                </label>

                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={max35 === false}
                    onChange={handleRegeling}
                    style={{ marginRight: "1em" }}
                  />
                  SF15
                </label>
              </div>

              {/* Dynamisch weergeven van aflosfase input op basis van geselecteerde regeling */}
              {max35 === true ? (
                <div>
                  {/* Label en schuifregelaar voor aflosfase SF35 */}
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
                  {/* Label en schuifregelaar voor aflosfase SF15 */}
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

              <Link
                href={`/step4?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&max35=${max35}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&hypotheekRente=${hypotheekRente}&inkomen=${inkomen}&geleendPre2024=${geleendPre2024}`}
                className="opslaan"
              >
                Opslaan
              </Link>
              <Link
                href={`https://duo.nl/particulier/studieschuld-terugbetalen/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Meer info over de aflosfase{" "}
              </Link>
            </section>
          )}
          <section className="vorige-volgende">
            <Link
              href={`/step2?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&max35=${max35}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&hypotheekRente=${hypotheekRente}&inkomen=${inkomen}&geleendPre2024=${geleendPre2024}`}
            >
              Vorige
            </Link>
          </section>
          <Backg4></Backg4>
          {aflosFase == 1 ? (
            <svg
              ref={svgRef}
              id="Laag_1"
              data-name="Laag 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 506.78 775.059"
              className="character-svg walking"
              onClick={characterAnimation}
            >
              <path
                d="m385.539,492.19s.054-9.322-9.268-10.169c-9.322-.847-27.119-3.742-27.119-3.742h-175.696l-27.694,9.674s-7.627-3.39-7.627,8.475v171.186s-3.39,11.017,6.78,12.712c10.169,1.695,49.26,0,49.26,0v67.797h43.827c.829-4.887,1.662-9.774,2.553-14.65,1.655-9.056,3.683-17.942,4.695-27.104.93-8.417,2.123-16.499,5.517-24.329.517-1.192,1.283-1.925,2.153-2.301.404-.56.935-1.029,1.591-1.359.562-1.781,2.215-2.705,4.008-2.807,1.645-.88,3.648-.759,5.185,1.218,10.714,13.787,11.378,32.338,16.507,48.457,2.445,7.685,5.08,15.305,7.851,22.875h41.841v-63.559l43.893-.847s11.602,0,11.699-10.169,0-79.661,0-79.661l.043-101.695Z"
                style={{ fill: "#201f32", strokeWidth: 0 }}
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
                    : "talking .5s ease-in infinite alternate",
                }}
              >
                <path
                  d="m173.456,401.512s62.999,155.288,180.025-4.983l-180.025,4.983Z"
                  style={{
                    fill: "#fff",
                    transition: "fill 0.5s ease-in-out",
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
            </svg>
          ) : (
            <>
              <svg
                ref={svgRef}
                id="Laag_1"
                data-name="Laag 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 506.78 775.059"
                className="character-svg walking"
                onClick={characterAnimation}
              >
                <path
                  d="M405.666,247.595c-6.277-27.06-37.869-65.574-37.869-65.574,22.881-53.39-13.754-77.119-13.754-77.119-183.246,44.068-217.602,38.983-217.602,38.983-5.932,8.475,5.085,38.136,5.085,38.136l-38.136,50.847-5.113-66.102,17.825-29.661-11.281-32.203,15.371-33.079,60.317-16.013,127.119-20.4,30.826,16.63,19.174,20.659,39.686,23.729,11.692,16.776-3.339,134.392Z"
                  style={{ fill: "#201e32", strokeWidth: 0 }}
                />
                <g>
                  <path
                    d="M385.539,492.19s.054-9.322-9.268-10.169c-9.322-.847-27.119-3.742-27.119-3.742h-175.696l-27.694,9.674s-7.627-3.39-7.627,8.475v171.186s-3.39,11.017,6.78,12.712c10.169,1.695,49.26,0,49.26,0v67.797h43.827c.829-4.887,1.662-9.774,2.553-14.65,1.655-9.056,3.683-17.942,4.695-27.104.93-8.417,2.123-16.499,5.517-24.329.517-1.192,1.283-1.925,2.153-2.301.404-.56.935-1.029,1.591-1.359.562-1.781,2.215-2.705,4.008-2.807,1.645-.88,3.648-.759,5.185,1.218,10.714,13.787,11.378,32.338,16.507,48.457,2.445,7.685,5.08,15.305,7.851,22.875h41.841v-63.559l43.893-.847s11.602,0,11.699-10.169,0-79.661,0-79.661l.043-101.695Z"
                    style={{ fill: "#201f32", strokeWidth: 0 }}
                  />
                  <path
                    d="M224.176,660.834h71.587v-148.91s-25.378,25.463-71.587,4.559v144.35Z"
                    style={{ fill: "#c2bfe0", strokeWidth: 0 }}
                  />
                  <path
                    d="M118.644,426.089s6.78,23.729,41.373,43.373c0,0,23.034,16.797,73.034,41.373,0,0,28.814,12.712,51.695,0,22.881-12.712,94.068-58.475,94.068-58.475,0,0,16.949-23.729,18.644-37.288s8.475-173.729,8.475-173.729l4.237-115.254s6.78-26.271-37.288-44.068l-9.62-6.871-14.109-10.078s-15.254-25.424-41.525-29.661c-26.271-4.237-183.051,33.051-183.051,33.051,0,0-30.508,19.492-16.102,48.305l7.627,20.339s-18.644,13.559-17.797,51.695-.028,86.979-.028,86.979l6.808,82.512s2.164,47.37,13.559,67.797Z"
                    style={{
                      fill: "#f1d1b5",
                      stroke: "#201f32",
                      strokeMiterlimit: 10,
                      strokeWidth: 10,
                    }}
                  />
                  <path
                    d="M363.262,75.15c42.075-11.109,53.688,21.278,53.688,21.278,0,0-5.474-42.167-62.907-27.863"
                    style={{ fill: "#201e32", strokeWidth: 0 }}
                  />
                  <path
                    d="M405.666,247.595c-6.277-27.06-37.869-65.574-37.869-65.574,22.881-53.39-13.754-77.119-13.754-77.119-183.246,44.068-217.602,38.983-217.602,38.983-5.932,8.475,5.085,38.136,5.085,38.136l-38.136,50.847-5.113-66.102,17.825-29.661-11.281-32.203,15.371-33.079,60.317-16.013,127.119-20.4,30.826,16.63,19.174,20.659,39.686,23.729,11.692,16.776-3.339,134.392Z"
                    style={{ fill: "#201e32", strokeWidth: 0 }}
                  />
                  <polygon
                    points="270.339 315.072 270.339 232.868 376.271 258.292 376.271 276.701 283.051 259.987 274.681 296.256 270.339 315.072"
                    style={{ fill: "#201f32", strokeWidth: 0 }}
                  />
                  <path
                    d="M274.681,296.256c7.732,11.693,24.472,10.341,24.472,10.341,0,0-22.9-7.827-21.186-19.915"
                    style={{ fill: "#201e32", strokeWidth: 0 }}
                  />
                  <path
                    d="M137.288,286.682l-4.237-12.712s87.288-33.475,105.085-25l3.39,73.729-5.886-26.035-5.131-22.693-93.22,12.712Z"
                    style={{ fill: "#201f32", strokeWidth: 0 }}
                  />
                  <path
                    d="M235.639,296.663c-9.276,14.643-22.927,9.981-22.927,9.981,0,0,13.651,4.19,22.927-19.963"
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
                      stroke: "#201f32",
                      strokeMiterlimit: 10,
                      strokeWidth: 10,
                    }}
                  />
                  <path
                    d="M241.525,345.58s-7.279,34.347,15.678,35.593c22.957,1.247,17.478-35.593,17.478-35.593"
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
                    style={{ fill: "#f1d1b5", strokeWidth: 0 }}
                  />
                  <ellipse
                    cx="359.685"
                    cy="631.173"
                    rx="17.797"
                    ry="11.017"
                    style={{ fill: "#f1d1b5", strokeWidth: 0 }}
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
                    d="M152.61,402.038l1.237,35.593s-8.864,21.186,72.492,68.644c0,0,35.593,12.712,64.407,0,28.814-12.712,54.237-35.593,54.237-35.593,0,0,21.186-15.254,24.576-37.288,3.39-22.034,4.237-36.864,4.237-36.864"
                    style={{
                      fill: "none",
                      stroke: "#201e32",
                      strokeMiterlimit: 10,
                      strokeWidth: 2,
                    }}
                  />
                  <path
                    d="M233.264,427.536l65.861-5.572s-24.872,42.33-65.861,5.572Z"
                    style={{ fill: "#201e32", strokeWidth: 0 }}
                  />
                </g>
                <path
                  d="M386.028,750.078c-1.698.963-2.549,2.086-4.722,3.124-4.71,2.25-10.089,3.999-15.741,5.207-29.996-13.44-25.254-55.902-28.334-58.314q-7.871,1.822-15.741,3.645,2.361-5.467,4.722-10.934c1.114-.289,1.611,1.293,3.935,1.041,1.3-.141-.091-2.011,2.361-2.083,31.731-.929,54.966,19.416,77.131,31.76q-11.806,13.277-23.612,26.554Z"
                  style={{ fill: "#eec09f", strokeWidth: 0 }}
                />
                <path
                  d="M365.564,756.538c-.885.2-7.313,4.096-17.623.914-14.89-4.595-19.298-43.758-5.874-52.101,2.554,2.117-1.378,39.39,23.497,51.187Z"
                  style={{ fill: "#b4836c", strokeWidth: 0 }}
                />
                <g>
                  <path
                    d="M407.455,494.105c6.812,11.929,14.388,24.022,22.192,35.648,10.906,37.981,56.186,68.103,54.827,107.858-7.458,23.94-43.87,54.275-63.965,74.952-19.838-10.533-35.506-25.999-58.743-32.449q31.003-26.279,62.006-52.558c38.334.255,62.916-1.256,8.485-4.113q-18.928-35.648-37.857-71.296c-3.309,4.716-1.852,10.194-2.611,15.082-2.381,15.332-6.734,35.26-6.527,50.273q-45.689,18.738-91.378,37.476c1.058-49.012,2.251-97.927,10.443-146.705,37.762-1.108,43.558-3.55,1.958-3.199-6.089-13.39,14.114-20.001,16.317-35.191l3.263-.457q40.794,12.34,81.587,24.679Z"
                    style={{ fill: "#eec09f", strokeWidth: 0 }}
                  />
                  <path
                    d="M390.485,648.579c-15.603,13.07-33.025,25.427-43.078,41.132-2.034.063-.88,1.705-1.958,1.828-1.927.221-2.34-1.168-3.263-.914-3.587.987-9.855,7.978-9.138,10.512.397,1.402,7.546,3.845,7.832,4.57.454,1.149-4.007,12.217-2.611,23.765,2.687,22.22,20.789,34.501,48.3,16.91-.055,8.996,4.675,20.993,6.527,30.164-.192,40.153,8.493,80.185,13.054,120.197-10.908,6.205-105.144,18.715-108.348,15.539-1.106-85.788-5.768-171.502-3.916-257.304q45.689-18.738,91.378-37.476c.099,7.135,3.096,23.403,5.222,31.078Z"
                    style={{ fill: "#caa186", strokeWidth: 0 }}
                  />
                </g>
                <g>
                  <g>
                    <path
                      d="M174.168,711.361c30.854,23.855,10.856,16.048,11.883,29.707.418,5.558,6.878,13.013,7.312,20.566-20.685,13.07-37.882-10.448-44.788-28.335,7.906-8,16.38-15.474,25.593-21.937Z"
                      style={{ fill: "#eec09f", strokeWidth: 0 }}
                    />
                    <path
                      d="M193.363,761.633c.016.278,2.292.762-.914,5.484-7.088,2.879-9.035,5.867-17.367,6.398-20.409,1.301-29.066-15.397-33.82-32.906,2.31-2.854,4.804-4.774,7.312-7.312,6.906,17.888,24.103,41.406,44.788,28.335Z"
                      style={{ fill: "#b4836c", strokeWidth: 0 }}
                    />
                    <path
                      d="M175.082,773.516c-17.536,11.066-36.166-5.683-41.132-23.308-.19-2.775,4.08-5.605,7.312-9.597,4.754,17.509,13.411,34.207,33.82,32.906Z"
                      style={{ fill: "#654035", strokeWidth: 0 }}
                    />
                  </g>
                  <path
                    d="M226.269,385.046c5.64,5.317-3.799,10.463-14.625,6.398-.629-6.127,6.203-6.462,6.398-5.941.163.434-6.541,6.15,1.371,5.941,9.603-.253-4.01-10.231,6.855-6.398Z"
                    style={{ fill: "#fcfcfc", strokeWidth: 0 }}
                  />
                  <g>
                    <path
                      d="M186.965,916.107c-8.216-44.992-10.06-90.826-15.539-136.193,5.852-1.184,17.636-7.807,21.023-12.797,3.206-4.722.93-5.207.914-5.484-.435-7.553-6.895-15.008-7.312-20.566-1.027-13.659,18.972-5.852-11.883-29.707,2.298-3.522-7.556-5.914-6.398-11.883.546-29.144,4.23-107.291,1.828-128.424-.504-4.437-4.497-11.768-4.57-16.91.114-.003.725-1.837,1.371-1.828,7.012.096,18.964,4.345,26.964,3.656,5.578,5.797,21.585,17.483,8.226,4.113v-22.394q14.168,23.08,28.335,46.159c.314,2.592-.454,6.957,0,8.226,10.577,29.556,14.898,44.799,16.453,76.78q1.371,125.681,2.742,251.363c-1.834,2.586-54.898-3.202-62.155-4.113Z"
                      style={{ fill: "#caa186", strokeWidth: 0 }}
                    />
                    <path
                      d="M147.661,485.591c13.087,15.614,32.514,55.394,42.96,67.639q-12.568-1.828-25.136-3.656c-6.431-22.036-3.225-6.892-1.371,4.57-6.244.369-8.116,4.546-14.625-21.48-1.384-5.532-1.7-20.398-3.656-14.625-1.022,3.016-7.724,38.985-10.969,52.101-4.879,19.722-10.056,39.856-15.539,59.413-.285,1.018-1.112,3.777-2.742,3.199-2.541-1.21-11.847-3.277-15.539-4.113,23.939,23.277,41.723,52.49,65.811,75.866-8.595,6.463-16.584,13.501-24.679,20.566-27.536-29.374-71.705-69.659-68.554-111.514,7.947-29.135,36.079-85.597,48.444-117.455,2.692-3.125,20.525-8.416,25.593-10.512Z"
                      style={{ fill: "#caa186", strokeWidth: 0 }}
                    />
                    <path
                      d="M171.426,779.914c5.478,45.367,7.322,91.201,15.539,136.193-28.69-3.602-57.107-8.985-84.092-19.652,7.288-18.01,19.848-138.238,23.765-144.419,7.824-12.345,4.868,35.957,44.788,27.878Z"
                      style={{ fill: "#594b4e", strokeWidth: 0 }}
                    />
                    <path
                      d="M164.113,554.145c.303-.018.61.009.914,0,.073,5.142,4.066,12.473,4.57,16.91,2.402,21.132-1.282,99.279-1.828,128.424q-17.367-20.338-34.734-40.675,8.226-58.956,16.453-117.912h-1.828c-3.252,25.818-10.542,50.858-15.539,76.323-3.994.955-11.557,16.466-11.883,19.195-1.381-2.296-1.081-2.429-3.656-3.656,1.63.578,2.457-2.181,2.742-3.199,5.483-19.558,10.659-39.691,15.539-59.413,3.245-13.116,9.947-49.085,10.969-52.101,1.956-5.774,2.273,9.093,3.656,14.625,6.509,26.026,8.38,21.849,14.625,21.48Z"
                      style={{ fill: "#594b4e", strokeWidth: 0 }}
                    />
                    <path
                      d="M142.176,725.071c-6.155,5.372-15.098,15.837-16.91,15.539-32.981-38.74-66.509-72.553-51.644-127.053-3.152,41.855,41.018,82.14,68.554,111.514Z"
                      style={{ fill: "#594b4e", strokeWidth: 0 }}
                    />
                    <path
                      d="M201.589,537.692v22.394c13.358,13.37-2.648,1.683-8.226-4.113-.908-.943-1.93-1.79-2.742-2.742-10.447-12.245-29.873-52.025-42.96-67.639,3.909-1.616,30.64-12.95,32.449-11.883q-2.057,18.052-4.113,36.105c4.58,4.83,20.588.111,21.937,3.656-6.446,16.246-2.714,13.29,3.656,24.222Z"
                      style={{ fill: "#594b4e", strokeWidth: 0 }}
                    />
                    <path
                      d="M192.906,468.224c5.633.211,2.33,5.422,5.941,14.168,4.638,11.234,13.363,20.361,17.367,31.992,4.324,12.561,9.136,44.861,11.426,59.87-2.99-6.849-27.47-46.117-27.878-48.902-1.19-8.116,5.163-13.079,10.055-16.453l-28.335-2.742c1.584-4.92,3.469-34.228,4.57-35.648.221-.286,6.494-2.299,6.855-2.285Z"
                      style={{ fill: "#594b4e", strokeWidth: 0 }}
                    />
                    <path
                      d="M132.122,617.214c-4.083,20.807-2.756,46.232-11.883,19.195.326-2.729,7.889-18.24,11.883-19.195Z"
                      style={{ fill: "#b7adc8", strokeWidth: 0 }}
                    />
                    <path
                      d="M190.621,553.231c.812.952,1.834,1.799,2.742,2.742-8.001.688-19.952-3.56-26.964-3.656-.646-.009-1.257,1.825-1.371,1.828-.304.009-.611-.018-.914,0-1.854-11.462-5.06-26.606,1.371-4.57q12.568,1.828,25.136,3.656Z"
                      style={{ fill: "#1e191a", strokeWidth: 0 }}
                    />
                  </g>
                </g>
                <g>
                  <path
                    d="M189.679,378.673c-4.559,1.305-1.222,6.071,0,9.121-5.336,22.863.342,51.699,7.984,73.884,8.053,23.377,51.935,96.857,69.864,119.491-2.911,1.954-8.276,7.559-10.979,7.297-38.559-35.923-75.813-76.236-80.842-128.612-1.343-13.982.951-78.564,11.977-84.829.042,1.525,1.464,1.901,1.996,3.649Z"
                    style={{ fill: "#8670a3", strokeWidth: 0 }}
                  />
                  <path
                    d="M335.395,371.376c19.19,86.308,14.302,154.633-67.868,209.793-17.929-22.634-61.81-96.114-69.864-119.491-7.643-22.185-13.321-51.02-7.984-73.884,9.257,23.102,12.15,18.376,17.965,25.54,26.469,32.61,57.433,59.233,97.809,21.891,8.546-7.903,12.491-12.859,15.969-23.716,1.306-4.077,6.557-16.949.998-16.419-41.142,17.68-62.029,39.467-99.805,5.473-20.53,6.421-28.042-5.815-32.936-21.891-.532-1.748-1.954-2.123-1.996-3.649.268-.152,3.015.242,5.988-1.824,6.28,6.683,16.364,3.042,23.953,0,17.527,21.601,58.35,23.009,73.856,0,4.47-6.633-.906-8.025.998-9.121,4.086-2.353,16.553,8.974,42.916,7.297Z"
                    style={{ fill: "#fcfcfc", strokeWidth: 0 }}
                  />
                </g>
                <path
                  d="M402.852,248.872c-6.2-27.06-37.401-65.574-37.401-65.574,22.598-53.39-13.584-77.119-13.584-77.119-180.979,44.068-214.911,38.983-214.911,38.983-5.859,8.475,5.022,38.136,5.022,38.136l-37.664,50.847-5.05-66.102,17.604-29.661-11.141-32.203,15.18-33.079,59.571-16.013,125.546-20.4,30.445,16.63,18.937,20.659,39.195,23.729,11.547,16.776-3.298,134.392Z"
                  style={{ fill: "#fcfcfc", strokeWidth: 0 }}
                />
              </svg>
            </>
          )}
        </>
      ) : orientation === "Portrait" ? (
        <section className="portretMode">
          <h1>Draai je scherm op Landscape mode!</h1>
        </section>
      ) : null}
    </>
  );
};

export default Step3;
