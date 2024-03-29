"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "../../styles/Global.css";
import Backg1 from "../components/backg1";
import Logo from "../components/logo";
import Progressbar from "../components/progressbar";

const Step1 = () => {
  // State hooks voor het bijhouden van schermoriëntatie, getoonde tekst, antwoordstatus en verschillende parameters
  const [orientation, setOrientation] = useState("");
  const svgRef = useRef(null);
  const [displayedText, setDisplayedText] = useState("");
  const progressWidth = "9.09%";
  const currentPage = 0;
  const [antwoord, setAntwoord] = useState(false);

  // State hooks voor waarden gerelateerd aan studieschuld
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
    setMax35(urlParams.get("max35") === "false" ? false : true);
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
    const headerText = `Je studeert of gaat studeren, wat leuk is, maar het kost ook geld! Denk aan studieboeken, een laptop, huur en boodschappen. Hoeveel wil je per maand lenen? Let op, dit gaat alleen om je lening en niet om de eventuele basisbeurs!`;

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

  // Functie om maandelijkse leenbedrag bij te werken op basis van invoer
  const handleLeningpm = (e) => {
    // Zet de bijgewerkte waarde als een geheel getal in de state
    const updatedValue = parseInt(e.target.value);
    setLeningpm(updatedValue);
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
      {" "}
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
          <header>{displayedText}</header>
          {antwoord && (
            // Weergeef sectie met antwoordinvoer en opslaan-knop
            <section className="antwoord">
              <div>
                {/* Toon het leenbedrag en voeg een invoerschuifregelaar toe voor bijwerken */}
                <label>Lening per maand: €{leningpm}</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={leningpm}
                  onChange={handleLeningpm}
                  step="10"
                />
              </div>
              {/* Navigatielink naar volgende stap met parameters in URL */}
              <Link
                href={`/step2?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&max35=${max35}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&hypotheekRente=${hypotheekRente}&inkomen=${inkomen}&geleendPre2024=${geleendPre2024}`}
                className="opslaan"
              >
                Opslaan
              </Link>
            </section>
          )}

          <section className="vorige-volgende">
            <Link href={`/`}>Vorige</Link>
          </section>
          {/* Component voor de achtergrondillustratie */}
          <Backg1></Backg1>
          {/* SVG voor het poppetje */}
          <svg
            id="Laag_1"
            data-name="Laag 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 506.78 775.059"
            className="character-svg walking"
            onClick={characterAnimation}
            ref={svgRef}
          >
            <g className={`${leningpm > 500 ? "slide-animation" : ""}`}>
              <ellipse
                cx="144.414"
                cy="584.04"
                rx="19.933"
                ry="65.195"
                style={{
                  fill: "#f1d1b5",
                  transition: "fill .2s ease-in-out",
                  stroke: "#201f32",
                  strokeMiterlimit: 10,
                  strokeWidth: 10,
                }}
              />
              <ellipse
                cx="362.219"
                cy="586.777"
                rx="19.933"
                ry="60.162"
                style={{
                  fill: "#f1d1b5",
                  transition: "fill .2s ease-in-out",
                  stroke: "#201f32",
                  strokeMiterlimit: 10,
                  strokeWidth: 10,
                }}
              />
              <ellipse
                cx="144.414"
                cy="639.039"
                rx="19.933"
                ry="10.196"
                style={{
                  fill: "#f1d1b5",
                  transition: "fill .2s ease-in-out",
                  stroke: "#201f32",
                  strokeMiterlimit: 10,
                  strokeWidth: 10,
                }}
              />
              <ellipse
                cx="362.219"
                cy="640.431"
                rx="19.933"
                ry="10.196"
                style={{
                  fill: "#f1d1b5",
                  transition: "fill .2s ease-in-out",
                  stroke: "#201f32",
                  strokeMiterlimit: 10,
                  strokeWidth: 10,
                }}
              />
              <path
                d="M169.599,547.986c6.778,5.965,6.709,14.046,7.769,22.118,3.489,26.59,2.179,53.363,2.149,80.064.201,3.944-.681,7.743-2.384,11.227.948,2.649,1.522,5.442,1.668,8.317.177,3.479-.486,6.845-1.814,9.981v64.718h49.089c.928-4.817,1.861-9.634,2.859-14.439,1.853-8.926,4.125-17.684,5.259-26.714,1.042-8.296,2.378-16.262,6.18-23.979.579-1.175,1.437-1.897,2.412-2.268.452-.552,1.048-1.015,1.783-1.34.63-1.756,2.481-2.666,4.489-2.767,1.842-.868,4.086-.749,5.807,1.201,12,13.588,12.745,31.873,18.489,47.76,2.739,7.575,5.689,15.085,8.793,22.546h46.865l-3.428-83.41"
                style={{ fill: "#201f32", strokeWidth: 0 }}
              />
              <path
                d="M393.897,555.683l-2.571-63.525s.061-9.188-10.381-10.023c-10.441-.835-30.375-3.688-30.375-3.688h-196.791l-31.019,9.535s-1.222-.301-8.543,8.353l-1.336,60.531"
                style={{ fill: "#201f32", strokeWidth: 0 }}
              />
              <ellipse
                cx="191.64"
                cy="750.41"
                rx="37.422"
                ry="16.47"
                style={{ strokeWidth: 0 }}
              />
              <ellipse
                cx="317.954"
                cy="750.41"
                rx="37.422"
                ry="16.47"
                style={{ strokeWidth: 0 }}
              />
              <path
                d="M174.333,488.566v136.622c0,.593,0,1.186,0,1.779v29.422h158.125v-173.124s-56.056,29.604-158.125,5.301Z"
                style={{
                  fill: "#fff",
                  stroke: "#201f32",
                  strokeMiterlimit: 10,
                  strokeWidth: 10,
                }}
              />
            </g>
            <path
              d="M118.644,426.089s6.78,23.729,41.373,43.373c0,0,23.034,16.797,73.034,41.373,0,0,28.814,12.712,51.695,0,22.881-12.712,94.068-58.475,94.068-58.475,0,0,16.949-23.729,18.644-37.288s8.475-173.729,8.475-173.729l4.237-115.254s6.78-26.271-37.288-44.068l-9.62-6.871-14.109-10.078s-15.254-25.424-41.525-29.661c-26.271-4.237-183.051,33.051-183.051,33.051,0,0-30.508,19.492-16.102,48.305l7.627,20.339s-18.644,13.559-17.797,51.695-.028,86.979-.028,86.979l6.808,82.512s2.164,47.37,13.559,67.797Z"
              style={{
                fill: "#f1d1b5",
                transition: "fill .2s ease-in-out",
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
                transition: "fill .2s ease-in-out",
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
                transition: "fill .2s ease-in-out",
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
            <path
              d="M152.61,402.038l1.237,35.593s-8.864,21.186,72.492,68.644c0,0,35.593,12.712,64.407,0,28.814-12.712,54.237-35.593,54.237-35.593,0,0,21.186-15.254,24.576-37.288,3.39-22.034,4.237-36.864,4.237-36.864"
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
                d="M173.456,401.512s62.999,155.288,180.025-4.983l-180.025,4.983Z"
                style={{ fill: "#fff", strokeWidth: 0 }}
              />
              <path
                d="M353.482,396.529l-180.025,4.983s74.016-14.203,180.025-4.983Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="M173.456,401.611s.573,1.246,1.701,3.391c11.163,21.234,76.654,130.561,178.324-8.473,0,0-99.112,159.788-180.025,5.082Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="M205.672,400.675c-.357,9.03-.714,18.061-1.072,27.091-.137,3.458-.477,6.923-.466,10.385.01,3.209.343,6.638,2.109,9.405,1.036,1.622,3.633.12,2.59-1.514-1.657-2.595-1.746-5.857-1.693-8.843.062-3.476.361-6.952.498-10.427.344-8.699.688-17.398,1.032-26.097.076-1.931-2.924-1.927-3,0h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="M238.687,398.978c-.694,16.685-.649,33.398.156,50.078.231,4.789.526,9.575.879,14.356.141,1.914,3.142,1.929,3,0-1.229-16.654-1.721-33.36-1.453-50.057.077-4.794.218-9.587.418-14.377.08-1.93-2.92-1.927-3,0h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="M279.861,399.826c.76,15.508,1.947,31.005,3.726,46.431.496,4.301,1.045,8.595,1.652,12.882.27,1.904,3.161,1.094,2.893-.798-2.148-15.165-3.536-30.442-4.539-45.722-.28-4.262-.523-8.526-.732-12.792-.094-1.922-3.095-1.933-3,0h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="M174.181,404.925c4.874,2.135,8.32,6.233,12.264,9.647,2.03,1.757,4.2,3.362,6.658,4.468,2.568,1.155,5.272,1.829,8.055,2.208,6.31.86,12.79.503,19.141.493,6.829-.011,13.658-.022,20.487-.033,13.908-.022,27.816-.044,41.724-.066,6.821-.011,13.644.025,20.465-.042,6.273-.061,12.694-.398,18.664-2.49,11.789-4.131,20.319-14.046,31.867-18.615,1.774-.702,1.001-3.604-.798-2.893-10.181,4.028-17.989,11.986-27.705,16.84-5.456,2.726-11.363,3.764-17.414,4.042-6.598.304-13.23.139-19.833.149-13.658.022-27.316.043-40.974.065-6.829.011-13.658.022-20.487.033-6.534.01-13.094.191-19.624-.035-3.261-.113-6.527-.426-9.662-1.376-2.934-.889-5.53-2.421-7.872-4.382-4.375-3.664-8.105-8.266-13.442-10.603-1.752-.767-3.28,1.817-1.514,2.59h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <path
                d="M315.413,397.629c2.208.933,2.098,4.724,2.342,6.698.413,3.337.73,6.686.952,10.042.444,6.712.496,13.445.182,20.165-.09,1.93,2.91,1.925,3,0,.344-7.375.246-14.766-.323-22.128-.275-3.569-.665-7.127-1.15-10.673-.343-2.502-.865-5.585-3.489-6.694-.752-.318-1.598-.22-2.052.538-.375.625-.207,1.737.538,2.052h0Z"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
            </g>
            <g className={`${leningpm > 500 ? "slide-animation" : ""}`}>
              <path
                d="M168.728,45.472c-9.847,18.718-4.352,57.651-3.195,78.751-2.937.449-5.861.035-8.786-.16-.255-.017-.127.641-.16.639-2.339-.176-2.205-1.496-2.556-3.355-1.259-6.666-2.092-26.606-1.917-34.024.134-5.692.734-11.277,1.278-16.932,3-9.352,6.842-19.219,15.335-24.919Z"
                style={{ fill: "#5072a2", strokeWidth: 0 }}
              />
              <g>
                <path
                  d="M257.578,162.338c-3.668.662-11.022,12.414-53.472-26.513-11.94-10.949-38.66,9.32-45.442,3.893-2.23-1.785-2.285-3.782-2.396-6.39-.004-.097.275.246.319-1.917.046-2.235-.033-4.474,0-6.709.033.002-.095-.656.16-.639,2.925.195,5.849.609,8.786.16-1.158-21.1-6.652-60.033,3.195-78.751,1.256-2.388,2.796-4.457,4.473-6.549,19.771-24.672,51.837-26.729,55.43-29.232,2.497-1.74-.415-5.394,3.195-6.709,1.195-.435,11.61-.934,12.779-.639,3.76.95,1.007,5.654,3.834,6.709,2.147.802,27.489,3.313,44.408,10.862,7.497,3.346,12.677,7.454,18.051,13.578,9.456,10.776,17.442,23.809,19.169,38.178.666,5.538.347,10.841.639,16.293.158,2.961-.238,6.194,0,9.105.444,5.427,2.594,10.676,2.875,16.134-18.749-6.936-39.182-2.922-58.145.958-23.164,4.741-43.375,12.291-68.049,13.258,12.002,12.903,29.997,33.622,49.679,29.552,7.337-1.517,14.638-7.596,20.926-11.182,13.147-7.498,26.8-15.734,42.011-18.21,11.363-1.85,29.06-1.386,39.775,3.195,5.417,2.316,10.107,6.732,12.46,12.14,0,.639,0,1.278,0,1.917-1.707,2.047-4.067,1.502-6.39.958-5.791-1.355-18.503-11.413-25.079-13.418-10.895-3.321-19.009.424-23.641,1.597"
                  style={{ fill: "#060505", strokeWidth: 0 }}
                />
                <g>
                  <path
                    d="M319.841,52.181c13.159,23.186,5.895,31.108,11.661,55.909-12.335-2.967-23.36-3.022-35.941-1.757-.211-6.902-.293-13.92-1.278-20.766-.518-3.6-6.481-30.334-7.667-34.663l4.952-6.39q4.712,5.431,9.425,10.862c4.26,13.801,8.643,45.673,9.904,47.762,2.033,3.368.4-6.367-.319-10.862-1.218-7.613-5.978-31.989-7.987-38.337-2.255-7.125-6.063-13.412-10.543-19.328,2.015.711,4.4,3.586,6.549,5.112,3.684,2.616,7.799,4.744,11.501,7.348,4.839,3.403,9.316,9.3,9.744,5.112Z"
                    style={{ fill: "#5b65c6", strokeWidth: 0 }}
                  />
                  <g>
                    <path
                      d="M280.546,44.194c4.534,12.797,11.794,47.79,11.821,62.139-17.828,1.629-35.149,6.063-52.554,10.064-2.064-16.085-1.458-36.439-3.355-51.915-.177-1.447-.168-5.157-1.597-3.514,1.476,18.407,1.851,36.875,3.514,55.27-.394,1.237-21.216,4.158-24.121,4.952-4.422-25.695-8.072-53.493-.799-78.911,13.761.77,48.089-2.389,57.985-1.278,3.267.367,6.124,1.976,9.105,3.195Z"
                      style={{ fill: "#5072a2", strokeWidth: 0 }}
                    />
                    <path
                      d="M280.546,44.194c-2.981-1.219-5.838-2.828-9.105-3.195-9.896-1.111-44.225,2.048-57.985,1.278,4.014-14.028,10.162-23.938,21.565-33.226,2.351.366,5.8-.584,7.029-.319,3.181.685,15.891,14.637,20.287,16.453-2.649,4.634,3.839,14.174,9.105,11.98,5.219-2.174-4.139-10.739,0-7.987,3.414,2.27,7.704,11.061,9.105,15.015Z"
                      style={{ fill: "#626ee0", strokeWidth: 0 }}
                    />
                  </g>
                  <path
                    d="M319.841,52.181c-.428,4.188-4.905-1.708-9.744-5.112-3.703-2.604-7.817-4.732-11.501-7.348-2.149-1.526-4.535-4.4-6.549-5.112-.369-.13-.541-.381-.799-.639-1.075.505,5.626,8.066,9.744,21.405q-4.712-5.431-9.425-10.862l-4.952,6.39c-6.76-24.675-15.447-28.146-36.58-40.893,4.814.235,11.937,2.139,16.932,3.514,27.666,7.614,38.488,13.309,52.874,38.657Z"
                    style={{ fill: "#626ee0", strokeWidth: 0 }}
                  />
                  <g>
                    <path
                      d="M203.232,51.861c-2.083,13.992.864,36.027,0,51.276q1.917,10.223,3.834,20.447c-4.061.939-36.619,2.352-37.379.639-.116-16.735-3.515-59.11.639-72.681,11.162-6.825,21.485-4.342,32.906.319Z"
                      style={{ fill: "#5072a2", strokeWidth: 0 }}
                    />
                    <g>
                      <path
                        d="M217.608,13.524c-.1,1.881-1.967,4.57-.958,6.07-5.403,6.248-12.199,24.079-13.418,32.267-11.421-4.662-21.744-7.144-32.906-.319,1.543-5.041,7.51-13.825,11.182-17.731,9.475-10.08,23.075-16.548,36.101-20.287Z"
                        style={{ fill: "#5b65c6", strokeWidth: 0 }}
                      />
                      <path
                        d="M216.65,19.594c-1.009-1.5.858-4.189.958-6.07.901-.259,8.985-3.014,9.265-2.396-3.013,2.223-7.876,5.752-10.223,8.466Z"
                        style={{ fill: "#626ee0", strokeWidth: 0 }}
                      />
                    </g>
                  </g>
                  <path
                    d="M292.047,34.609c4.48,5.917,8.288,12.203,10.543,19.328,2.009,6.349,6.769,30.724,7.987,38.337.719,4.495,2.353,14.231.319,10.862-1.261-2.089-5.644-33.961-9.904-47.762-4.118-13.339-10.819-20.9-9.744-21.405.257.258.43.509.799.639Z"
                    style={{ fill: "#060505", strokeWidth: 0 }}
                  />
                </g>
              </g>
              <g>
                <path
                  d="M333.579,113.201c4.566,3.306,24.511,15.168,26.357,16.932.308.295.245.627-.16.639-10.715-4.581-28.412-5.045-39.775-3.195-15.212,2.477-28.864,10.712-42.011,18.21-1.658-.794-3.248-1.888-4.792-2.875-1.13-.722-.916-.293-.958-.319-3.099-1.928-6.157-4.13-9.265-6.07,9.893-2.509,28.388-12.737,48.401-16.293,5.281-.938,17.469-1.269,15.335-2.556-2.056-1.24-21.663,2.633-25.239,3.514-13.941,3.433-29.297,10.901-37.539,13.099-2.691-2.64-9.348-4.407-10.223-7.348,7.762.629,26.04-5.468,33.385-8.945,5.061-2.396-7.37,1.605-9.425,2.236-.946-.783,2.434-.617,1.278-3.035-.356-.744-3.083-1.604-3.514-3.035,18.963-3.881,39.396-7.895,58.145-.958Z"
                  style={{ fill: "#626ee0", strokeWidth: 0 }}
                />
                <path
                  d="M275.434,114.159c.432,1.431,3.159,2.291,3.514,3.035,1.156,2.418-2.224,2.252-1.278,3.035-4.392,1.349-10.409,3.55-14.536,4.473-5.879,1.314-16.441,1.668-9.425,2.236.875,2.941,7.533,4.708,10.223,7.348-1.448.386-5.536,1.511-6.549,1.597-6.367.542-23.002-3.891-11.182.319,6.183,2.202,10.563,1.894,16.773.319,3.108,1.94,6.166,4.142,9.265,6.07-15.019,4.998-27.82,1.071-41.053-6.39,10.635,10.257,29.187,15.752,42.011,6.709,1.544.987,3.134,2.081,4.792,2.875-6.287,3.586-13.588,9.665-20.926,11.182-19.682,4.07-37.677-16.649-49.679-29.552,24.674-.968,44.885-8.518,68.049-13.258Z"
                  style={{ fill: "#5b65c6", strokeWidth: 0 }}
                />
                <path
                  d="M262.974,136.523c-6.21,1.575-10.59,1.883-16.773-.319-11.82-4.211,4.814.223,11.182-.319,1.013-.086,5.101-1.211,6.549-1.597,8.241-2.197,23.598-9.665,37.539-13.099,3.576-.881,23.183-4.754,25.239-3.514,2.134,1.287-10.054,1.617-15.335,2.556-20.013,3.557-38.508,13.785-48.401,16.293Z"
                  style={{ fill: "#060505", strokeWidth: 0 }}
                />
                <path
                  d="M272.239,142.593c.043.027-.172-.403.958.319-12.824,9.043-31.376,3.548-42.011-6.709,13.233,7.461,26.034,11.387,41.053,6.39Z"
                  style={{ fill: "#060505", strokeWidth: 0 }}
                />
                <path
                  d="M253.709,126.939c-7.017-.568,3.546-.923,9.425-2.236,4.128-.922,10.144-3.123,14.536-4.473,2.055-.631,14.486-4.633,9.425-2.236-7.345,3.478-25.623,9.574-33.385,8.945Z"
                  style={{ fill: "#060505", strokeWidth: 0 }}
                />
              </g>
            </g>
          </svg>
        </>
      ) : orientation === "Portrait" ? (
        <section className="portretMode">
          <h1>Draai je scherm op Landscape mode!</h1>
        </section>
      ) : null}
    </>
  );
};

export default Step1;
