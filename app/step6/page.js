"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "../../styles/Global.css";
import Backg5 from "../components/backg5";
import Logo from "../components/logo";
import Progressbar from "../components/progressbar";

const Step6 = () => {
  // State hooks voor schermoriëntatie, getoonde tekst, antwoordstatus en parameters
  const [orientation, setOrientation] = useState("");
  const svgRef = useRef(null);
  const [displayedText, setDisplayedText] = useState("");
  const progressWidth = "54.54%";
  const currentPage = 5;
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
    const headerText = `Tijdens de aflosfase kun je tot wel 60 maanden aanvragen waarin je niet hoeft af te lossen (aflosvrije periodes). Dit kan handig zijn in geval van bijvoorbeeld ziekte, maar kan je altijd aanvragen. De maanden waarin je niet hebt afgelost, worden aan het einde van de aflosfase (na 15 of 35 jaar) toegevoegd.`;

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
      {orientation === "Landscape" ? (
        <>
          <Link href={`/`}>
            <Logo />
          </Link>
          <Progressbar
            progressWidth={progressWidth}
            currentPage={currentPage}
          ></Progressbar>
          <header>{displayedText}</header>
          {/* Voorwaardelijke weergave van antwoordsectie */}
          {antwoord && (
            <section className="antwoord">
              {/* Externe link naar DUO-website voor informatie over aflosvrije periode */}
              <Link
                href={`https://duo.nl/particulier/minder-of-niets-aflossen/aflosvrije-periode.jsp`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Meer info over de aflosvrije periode
              </Link>

              {/* Navigatielink naar de volgende stap met parameters in URL */}
              <Link
                href={`/step7?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&max35=${max35}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&hypotheekRente=${hypotheekRente}&inkomen=${inkomen}&geleendPre2024=${geleendPre2024}`}
              >
                Helder verhaal, door naar de volgende!
              </Link>
            </section>
          )}
          <section className="vorige-volgende">
            <Link
              href={`/step5?leningpm=${leningpm}&leenduur=${leenduur}&aanloopfase=${aanloopfase}&max35=${max35}&aflosfase=${aflosFase}&rentepercentage=${rentepercentage}&hypotheekRente=${hypotheekRente}&inkomen=${inkomen}&geleendPre2024=${geleendPre2024}`}
            >
              Vorige
            </Link>{" "}
          </section>
          {/* Component voor de achtergrondillustratie */}
          <Backg5></Backg5>
          {/* SVG voor het poppetje */}{" "}
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
                d="M185.246,686.448v67.797h41.712c.789-4.887,1.582-9.774,2.43-14.65,1.575-9.056,3.505-17.942,4.469-27.104.885-8.417,2.021-16.499,5.251-24.329.492-1.192,1.221-1.925,2.049-2.301.384-.56.89-1.029,1.515-1.359.535-1.781,2.109-2.705,3.815-2.807,1.565-.88,3.472-.759,4.935,1.218,10.197,13.787,10.829,32.338,15.711,48.457,2.327,7.685,4.835,15.305,7.472,22.875h39.822v-63.559"
                style={{ fill: "#201f32", strokeWidth: 0 }}
              />
              <ellipse
                cx="195.218"
                cy="757.635"
                rx="32.218"
                ry="17.797"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <ellipse
                cx="304.945"
                cy="757.635"
                rx="32.218"
                ry="17.797"
                style={{ fill: "#201e32", strokeWidth: 0 }}
              />
              <g>
                <path
                  d="M335.691,530.096c-2.531,13.985-8.933,27.058-12.967,40.75q5.268,3.94,10.536,7.88c3.913.835,19.94-9.7,25.124-10.806,12.717,29.143,20.613,59.805,35.119,88.478-5.799,1.248-41.736,12.163-44.034,11.932-2.195-.221-3.847-7.517-4.593-9.456.619.064.57-2.353.54-2.476-3.965-16.333-19.207-52.291-23.773-72.494-1.645-13.774-.166-27.602,0-41.425-.854-.764-1.23.461-1.621,1.351-2.704,6.154-4.525,24.609-7.564,32.87l.54,2.476c-1.788,7.161-2.696,14.382-3.242,21.613-2.193,1.249-9.546,18.667-11.346,17.335-2.207-11.66-2.913-2.707-2.161,3.152,2.753,21.448,19.328,18.914-19.721,21.388q-.135-24.652-.27-49.305h-1.081c-1.876,6.518-.444,46.829-1.621,49.08-.229.438-5.479.969-3.242,3.602,1.041,1.225,31.655-2.139,35.93-2.026,6.055,8.824,7.223,26.406,6.213,36.472-.719,7.164-3.206,14.583-7.834,20.712l-32.958-.45c.003-65.276-2.575-58.691-1.891,1.576q18.1.338,36.2.675c-1.466,5.697-5.312,10.756-8.645,15.759-6.648.67-19.178,1.09-26.475,1.351-7.026.251-14.035.442-21.072.45-.36,0-.72,0-1.081,0,.007-29.19-5.779-55.383,1.621-84.201,1.771-6.897,16.469-49.436,18.91-53.582,2.053,1.22,4.131,1.646,6.484.901,4.328,4.941,10.771,4.017,14.588-.45,5.246.668,5.783-.028,5.403-2.702q6.754-.338,13.507-.675,4.322-17.786,8.645-35.571c5.122-7.642,7.733-15.911,10.806-24.54,2.361,1.895,5.135,7.592,7.024,10.356Z"
                  style={{ fill: "#03445f", strokeWidth: 0 }}
                />
                <path
                  d="M309.756,600.789c-.063.829,1.303,2.776,1.081,4.728q-3.512,7.88-7.024,15.759c5.209,24.582,8.646,17.642,9.725,18.911.556.653.95,13.859,1.081,15.985.524,8.552.244,17.1,1.081,25.665l-1.081,1.351c-.187-2.139.879-3.016-2.161-2.702,1.01-10.066-.159-27.648-6.213-36.472-4.275-.113-34.889,3.251-35.93,2.026-2.238-2.633,3.013-3.165,3.242-3.602,1.177-2.25-.255-42.561,1.621-49.08h1.081q.135,24.652.27,49.305c39.048-2.474,22.474.061,19.721-21.388-.752-5.859-.046-14.812,2.161-3.152,1.8,1.332,9.154-16.087,11.346-17.335Z"
                  style={{ fill: "#08090a", strokeWidth: 0 }}
                />
                <g>
                  <path
                    d="M358.383,567.919c-5.184,1.107-21.211,11.641-25.124,10.806q-5.268-3.94-10.536-7.88c4.034-13.691,10.436-26.764,12.967-40.75,5.781,8.46,10.804,17.305,17.289,25.44,1.929,4.091,3.602,8.255,5.403,12.382Z"
                    style={{ fill: "#195b7e", strokeWidth: 0 }}
                  />
                  <path
                    d="M344.876,658.874c-2.069-5.379-3.851-10.827-5.943-16.21-3.238-8.329-6.283-16.716-9.725-24.99-5.344-12.844-13.912-24.875-16.209-38.498l-.54-2.476c3.039-8.26,4.86-26.715,7.564-32.87.391-.89.767-2.114,1.621-1.351-.166,13.823-1.645,27.651,0,41.425,4.566,20.203,19.808,56.16,23.773,72.494.03.123.079,2.54-.54,2.476Z"
                    style={{ fill: "#08090a", strokeWidth: 0 }}
                  />
                </g>
                <path
                  d="M189.27,581.877c-6.036,14.974-14.046,29.35-19.991,44.352-4.595,11.597-7.432,23.756-11.887,35.346-.839,2.183-1.941,4.32-2.701,6.529-.514.57-.906-.134-2.161-.225,9.823-27.432,17.423-55.39,29.716-82.174-4.021-60.231-10.363-71.615,7.024-3.827Z"
                  style={{ fill: "#08090a", strokeWidth: 0 }}
                />
                <path
                  d="M297.33,718.76c3.333-5.003,7.178-10.063,8.645-15.759,3.714-3.469,8.999-15.765,8.645-19.812l1.081-1.351c1.051,10.757,3.889,21.417,4.863,32.194-.703,1.885-20.203,4.422-23.233,4.728Z"
                  style={{ fill: "#0b1934", strokeWidth: 0 }}
                />
                <g>
                  <path
                    d="M328.667,519.74c-3.073,8.628-5.684,16.898-10.806,24.54q-4.322,17.786-8.645,35.571-6.754.338-13.507.675c-.226-1.585-1.61-1.689-1.621-1.801-.677-7.095,4.103-18.64,1.081-36.472-.916-5.404-1.587-9.697-5.943-13.958,1.165-8.477,2.906-17.145,1.621-25.665,13.025,5.1,25.542,10.872,37.821,17.11Z"
                    style={{ fill: "#2e7999", strokeWidth: 0 }}
                  />
                  <path
                    d="M290.846,502.63c1.285,8.52-.455,17.188-1.621,25.665-.249-.243-2.734-1.077-3.782-2.026,1.427-8.421,4.189-16.944,1.621-25.44,1.33.491,2.533,1.312,3.782,1.801Z"
                    style={{ fill: "#0f4873", strokeWidth: 0 }}
                  />
                </g>
                <g>
                  <path
                    d="M281.661,499.028c-.281.059-.92.341-1.081.45-16.659-4.419-37.795-4.042-54.84-.901q6.348.563,12.697,1.126l-2.431,16.435-13.237-9.906c-1.261-1.752-2.701-2.788-3.242-3.602-.467-.704.124-1.815-1.081-2.702,11.584-6.034,34.989-6.385,48.357-4.953,8.82.945,11.452,2.947,14.858,4.052Z"
                    style={{ fill: "#0b1934", strokeWidth: 0 }}
                  />
                  <path
                    d="M283.282,499.478c.605,1.487.79,2.969,1.081,4.503.046.939-1.934,2.276-3.782,4.052q-5.538,3.827-11.076,7.655-.135-7.542-.27-15.084c3.765-.891,8.466.84,11.346-1.126.161-.11.799-.391,1.081-.45.284.092.846.185,1.621.45Z"
                    style={{ fill: "#08090a", strokeWidth: 0 }}
                  />
                  <path
                    d="M280.58,499.478c-2.88,1.966-7.581.235-11.346,1.126q.135,7.542.27,15.084,5.538-3.827,11.076-7.655c-10.62,10.208-20.667,20.799-30.527,31.519-9.631-10.846-18.962-21.756-27.285-33.32l13.237,9.906,2.431-16.435q-6.348-.563-12.697-1.126c17.045-3.142,38.181-3.519,54.84.901Z"
                    style={{ fill: "#fdfdfd", strokeWidth: 0 }}
                  />
                </g>
                <path
                  d="M196.835,640.863c-1.249-.067-2.527.03-3.782,0,11.987-25.824,2.553-22.945,0-33.095-.855-3.4-.087-6.256-.54-8.78q4.593,9.118,9.185,18.236-2.431,11.82-4.863,23.639Z"
                  style={{ fill: "#0b1934", strokeWidth: 0 }}
                />
                <path
                  d="M210.882,538.201c-.276-.046-.876.708-2.431.45-2.421-11.803-.652-27.233,10.536-36.022-.626,3.593-4.416,6.615-5.943,10.131-3.376,7.771-3.682,17.316-2.161,25.44Z"
                  style={{ fill: "#0f4873", strokeWidth: 0 }}
                />
                <g>
                  <path
                    d="M222.769,506.232c8.323,11.564,17.654,22.474,27.285,33.32,9.859-10.719,19.907-21.311,30.527-31.519,1.848-1.777,3.828-3.114,3.782-4.052.009.046,1.034-.15,1.081.225.213,1.708-2.442,19.417-3.242,20.712-.785,2.106-5.982-.207-10.806,4.503-3,2.929-4.633,9.473-4.863,13.283-.282,4.663,1.161,10.284,2.161,15.084,1.642,7.877,5.162,16.006,5.943,19.137-.834.581-1.405,1.626-2.161,2.251-1.73,1.431-1.041-.136-3.242,3.602-2.441,4.146-17.139,46.685-18.91,53.582l-2.161,1.126c-.477-13.093,2.351-91.23,1.081-95.908-.017-.064-.883-1.46-1.081-.901-1.2,24.575,1.261,70.134-.54,91.405-.578,6.828-3.771,15.461-4.322,21.163-1.748,18.063,2.954,48.043,3.782,67.315-21.815-.109-43.982-.91-65.106-5.854.108-12.811,2.542-25.518,3.512-38.273,2.294,8.646,2.925,19.11,9.995,26.566,4.536-.54,31.039,1.169,32.148-1.126.169-38.637-.454-41.747-2.431-.675l-29.176-.45c-7.754-10.415-8.776-27.879-9.455-29.493-.148-.351-.723-.224-1.081-.225.628-8.925.529-22.971,1.081-27.467,8.539-.576,30.484,2.691,36.47,2.251,5.719-.42.862-2.662.81-2.927-1.017-5.212.632-40.49-.81-51.556q-.675,25.778-1.351,51.556c-8.324-.072-16.591-1.58-24.854-2.026q2.431-11.82,4.863-23.639-4.593-9.118-9.185-18.236c-1.023-5.698-1.494-11.502-3.242-17.11-17.387-67.787-11.045-56.404-7.024,3.827-12.293,26.784-19.894,54.743-29.716,82.174-2.073-.15-37.96-9.421-39.712-10.356-1.093-.584-1.314-.325-1.351-1.576-.059-2.021,13.709-32.867,15.669-38.273,13.69-37.779,16.381-58.683,44.574-95.683,13.682-6.407,26.522-14.267,41.333-18.911-8.007,7.867-10.622,25.806-8.645,35.797-.358.516-4.604.3-6.484,2.702,1.113,5.566,3.696,39.584,4.863,41.425,1.928,3.044,17.512.793,18.37-1.351-1.542-8.843-3.339-33.979-4.863-39.174-1.051-3.581-1.392-3.607-5.403-4.278-1.521-8.125-1.215-17.669,2.161-25.44,1.527-3.516,5.318-6.538,5.943-10.131h.54c.541.814,1.981,1.85,3.242,3.602Z"
                    style={{ fill: "#1c6a8c", strokeWidth: 0 }}
                  />
                  <g>
                    <path
                      d="M250.324,636.36c-7.4,28.818-1.614,55.01-1.621,84.201-.54,0-1.081.003-1.621,0-.828-19.272-5.53-49.252-3.782-67.315.552-5.702,3.744-14.335,4.322-21.163,1.802-21.271-.66-66.83.54-91.405.198-.56,1.063.837,1.081.901,1.27,4.677-1.557,82.815-1.081,95.908l2.161-1.126Z"
                      style={{ fill: "#195b7e", strokeWidth: 0 }}
                    />
                    <g>
                      <path
                        d="M186.569,643.565c.139-1.135-.522-2.377.81-3.152,2.195-.321,4.04.412,5.673.45,1.255.03,2.533-.067,3.782,0,8.262.446,16.53,1.954,24.854,2.026q.675-25.778,1.351-51.556c1.442,11.066-.207,46.344.81,51.556.052.265,4.908,2.507-.81,2.927-5.986.44-27.931-2.827-36.47-2.251Z"
                        style={{ fill: "#0d161d", strokeWidth: 0 }}
                      />
                      <path
                        d="M185.488,676.434c.136-1.788-.126-3.614,0-5.403.357,0,.933-.126,1.081.225.679,1.614,1.701,19.078,9.455,29.493l29.176.45c1.978-41.072,2.6-37.962,2.431.675-1.108,2.295-27.612.586-32.148,1.126-7.07-7.456-7.701-17.92-9.995-26.566Z"
                        style={{ fill: "#032b3f", strokeWidth: 0 }}
                      />
                      <path
                        d="M196.024,653.47q12.292.788,24.583,1.576c-8.221.721-16.376-.829-24.583-.675v-.901Z"
                        style={{ fill: "#032b3f", strokeWidth: 0 }}
                      />
                    </g>
                    <path
                      d="M272.476,579.176c.757-.626,1.327-1.671,2.161-2.251.513,2.053,1.533,3.588-2.161,2.251Z"
                      style={{ fill: "#0d161d", strokeWidth: 0 }}
                    />
                    <path
                      d="M177.114,530.997c.2,0,.571,2.987.54,3.152-.403,2.148-1.482-3.152-.54-3.152Z"
                      style={{ fill: "#195b7e", strokeWidth: 0 }}
                    />
                  </g>
                </g>
                <path
                  d="M312.458,680.487c3.04-.315,1.974.563,2.161,2.702.355,4.047-4.931,16.343-8.645,19.812q-18.1-.338-36.2-.675c-.684-60.267,1.894-66.852,1.891-1.576l32.958.45c4.628-6.129,7.116-13.548,7.834-20.712Z"
                  style={{ fill: "#0d161d", strokeWidth: 0 }}
                />
                <g>
                  <path
                    d="M218.446,499.928c1.204.887.613,1.998,1.081,2.702h-.54c-11.188,8.789-12.956,24.219-10.536,36.022,1.556.258,2.155-.496,2.431-.45,4.011.67,4.352.696,5.403,4.278,1.524,5.194,3.32,30.331,4.863,39.174-.858,2.144-16.442,4.394-18.37,1.351-1.166-1.841-3.75-35.859-4.863-41.425,1.88-2.402,6.125-2.185,6.484-2.702-1.977-9.991.637-27.929,8.645-35.797,1.532-1.505,3.495-2.158,5.403-3.152Z"
                    style={{ fill: "#0d161d", strokeWidth: 0 }}
                  />
                  <path
                    d="M210.612,540.452c.536.031,1.083-.021,1.621,0,2.238.71,5.143,34.725,6.213,39.399-.321.641-12.344,4.909-14.048-.45-1.006-3.166-3.008-29.179-4.322-36.922.248-.4,9.996-2.057,10.536-2.026Z"
                    style={{ fill: "#fdfdfd", strokeWidth: 0 }}
                  />
                </g>
                <g>
                  <path
                    d="M287.064,500.829c2.568,8.496-.194,17.019-1.621,25.44,1.048.949,3.533,1.783,3.782,2.026,4.357,4.261,5.027,8.554,5.943,13.958-.369.16-1.066,2.131-1.081,2.251.27-2.023-1.233-1.897-3.242-1.801-.308-4.111-.068-9.784-4.322-12.608-4.835-3.209-11.132-1.203-14.048,2.927-2.072,2.935-1.585,7.233-3.782,10.131l-2.161-.45c.23-3.81,1.862-10.354,4.863-13.283,4.824-4.71,10.021-2.397,10.806-4.503.8-1.295,3.455-19.004,3.242-20.712-.047-.375-1.072-.179-1.081-.225-.29-1.534-.476-3.016-1.081-4.503,1.312.449,2.489.874,3.782,1.351Z"
                    style={{ fill: "#08090a", strokeWidth: 0 }}
                  />
                  <path
                    d="M268.694,543.154c.513,6.693,2.24,13.254,3.782,19.812.827,3.516,1.536,6.892,2.701,10.356,1.372,4.075,3.992,16.222,10.266,6.754,4.757-7.179,6.036-28.927,5.403-37.372,2.009-.096,3.512-.222,3.242,1.801-1.093,8.753-1.063,28.234-5.943,36.022-4.943,7.889-11.45,1.608-12.157,1.801-.52.142-.169,1.319-.27,1.351-2.352.746-4.43.319-6.484-.901,2.201-3.738,1.511-2.171,3.242-3.602,3.695,1.336,2.674-.199,2.161-2.251-.782-3.13-4.301-11.259-5.943-19.137-1.001-4.8-2.443-10.421-2.161-15.084l2.161.45Z"
                    style={{ fill: "#fdfdfd", strokeWidth: 0 }}
                  />
                  <path
                    d="M288.685,580.527c-1.928,2.828-1.011,2.367,1.621,2.702-3.817,4.467-10.26,5.391-14.588.45.101-.032-.25-1.209.27-1.351.706-.193,7.214,6.087,12.157-1.801h.54Z"
                    style={{ fill: "#0b1934", strokeWidth: 0 }}
                  />
                  <path
                    d="M295.709,580.527c.38,2.674-.157,3.369-5.403,2.702-2.632-.335-3.549.126-1.621-2.702l5.403-1.801c.011.112,1.395.216,1.621,1.801Z"
                    style={{ fill: "#fdfdfd", strokeWidth: 0 }}
                  />
                  <path
                    d="M294.088,578.726l-5.403,1.801h-.54c4.88-7.788,4.85-27.268,5.943-36.022.015-.121.711-2.092,1.081-2.251,3.023,17.832-1.757,29.377-1.081,36.472Z"
                    style={{ fill: "#0f4873", strokeWidth: 0 }}
                  />
                  <g>
                    <path
                      d="M290.846,542.704c.633,8.446-.646,30.193-5.403,37.372-9.354.886-5.497-2.394-10.266-6.754-1.166-3.464-1.875-6.841-2.701-10.356,2.042-10.975-5.274-30.983,14.048-32.87,4.254,2.824,4.014,8.497,4.322,12.608Z"
                      style={{ fill: "#1c6a8c", strokeWidth: 0 }}
                    />
                    <path
                      d="M286.524,530.096c-19.322,1.887-12.006,21.895-14.048,32.87-1.542-6.558-3.269-13.119-3.782-19.812,2.198-2.898,1.71-7.196,3.782-10.131,2.916-4.13,9.213-6.136,14.048-2.927Z"
                      style={{ fill: "#0f4873", strokeWidth: 0 }}
                    />
                  </g>
                  <path
                    d="M285.443,580.076c-6.274,9.468-8.894-2.679-10.266-6.754,4.769,4.36.912,7.64,10.266,6.754Z"
                    style={{ fill: "#0c2844", strokeWidth: 0 }}
                  />
                </g>
              </g>
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
              <ellipse
                cx="371.354"
                cy="663.119"
                rx="22.491"
                ry="13.923"
                style={{ fill: "#f1d1b5", strokeWidth: 0 }}
              />
              <ellipse
                cx="129.659"
                cy="666.374"
                rx="22.491"
                ry="13.923"
                style={{ fill: "#f1d1b5", strokeWidth: 0 }}
              />
              <g>
                <rect
                  x="202.659"
                  y="660.649"
                  width="8.938"
                  height="28.423"
                  style={{ fill: "red", strokeWidth: 0 }}
                />
                <rect
                  x="202.472"
                  y="661.219"
                  width="9.311"
                  height="27.283"
                  transform="translate(881.988 467.733) rotate(90)"
                  style={{ fill: "red", strokeWidth: 0 }}
                />
              </g>
              <g>
                <path
                  d="M96.634,284.786c-.145-.026-1.448-1.06-2.774-.936,1.259,8.724,10.938,68.675,12.864,71.853.352.58,4.573,3.623,4.54,1.872-2.263-11.208-12.754-59.066-12.611-64.597.089-3.452,1.946-1.143,4.54-1.17q6.558,34.054,13.116,68.108c.915,1.937,10.974,4.665,13.368,4.915,12.903,1.348,103.038-7,117.285-10.766l1.009,2.809c-1.599.656-3.334,1.106-5.045,1.404-13.499,2.357-26.939,4.724-40.609,6.085-11.705,1.166-64.886,3.446-69.11,4.681-5.857,1.712-6.978,10.802-7.315,15.447-.673,9.297,1.586,33.848,3.531,43.533.459,2.288.975,8.392,2.27,9.83,11.822,5.534,20.627,14.993,31.276,22,17.313,11.393,46.96,24.505,67.597,28.554,2.251.442,18.918,2.803,19.926,2.809-1.184,7.893-1.44,15.924-.504,23.873-50.193-.936-92.566-41.349-121.069-76.065-3.801-13.545-11.216-26.007-15.638-39.32-2.111-6.355-3.269-12.998-5.045-19.426-.679-2.458-3.138-14.084-3.531-14.745-.541-.908-13.569-6.439-2.522-12.639-2.894-10.241-14.307-68.797-13.116-73.491,1.032-4.065,9.233-4.587,10.846,6.319-.925-.75-2.163-.738-3.279-.936Z"
                  style={{ fill: "#100f1c", strokeWidth: 0 }}
                />
                <g>
                  <path
                    d="M254.023,351.724c.025,1.868,4.293,1.348,4.54,1.404,40.087,9.193,62.823,7.993,102.656,12.639,13.202.445,21.439-.737,33.546-5.149,1.395-.508,2.587-.808,4.036-1.404,5.74-2.363,6.677-4.059,7.062-4.213.169-.067,3.348-.944,3.531-.936,3.225.133,7.877,6.002-3.027,11.468-2.367,22.042-12.997,48.628-22.7,69.044.767-10.259,4.968-61.002-4.288-65.533-3.761-1.841-65.886-4.342-84.748-6.553-13.21-1.548-26.331-3.974-39.347-6.553q-3.657.468-7.315.936l-1.009-2.809c1.435-.379,6.339-1.725,7.062-2.34Z"
                    style={{ fill: "#5b5279", strokeWidth: 0 }}
                  />
                  <path
                    d="M409.395,354.064c-.183-.008-3.363.869-3.531.936-.352-.625-.595-.828-.504-1.638.199-1.79,7.271-30.068,8.576-35.107,1.222-4.721,10.431-33.318,10.089-35.107-.877-4.583-12.173,8.515-9.585-.936,1.195-4.364,14.619-9.669,14.125.468-.097,1.985-9.573,32.561-11.098,38.384-2.862,10.932-4.832,22.133-8.071,33.001Z"
                    style={{ fill: "#5b5279", strokeWidth: 0 }}
                  />
                  <path
                    d="M398.801,359.213c-1.448.596-2.641.896-4.036,1.404,4.597-23.154,10.955-45.931,16.899-68.81,1.561-.122,3.298-1.386,3.783.702.778,3.346-15.329,58.188-16.647,66.703Z"
                    style={{ fill: "#45446e", strokeWidth: 0 }}
                  />
                </g>
                <path
                  d="M96.634,284.786c1.353,9.225,2.289,3.637,6.558,7.021-2.594.027-4.451-2.282-4.54,1.17-.142,5.531,10.348,53.39,12.611,64.597.033,1.75-4.189-1.292-4.54-1.872-1.926-3.178-11.605-63.128-12.864-71.853,1.327-.124,2.63.91,2.774.936Z"
                  style={{ fill: "#ecd2d8", strokeWidth: 0 }}
                />
                <g>
                  <path
                    d="M381.65,436.449c-.001.096.766-.278.504,1.872-.117.204.452.45-2.522,3.979-1.516,1.799-31.694,29.314-35.06,32.064-20.227,16.53-57.341,37.196-83.992,40.724-3.729.494-6.918.069-10.594,0-.935-7.949-.68-15.98.504-23.873.08,0-.236-.692,1.513-.468h4.54c10.738-2.511,21.961-3.942,32.537-7.021,34.094-9.927,62.074-31.073,92.567-47.278Z"
                    style={{ fill: "#017094", strokeWidth: 0 }}
                  />
                  <path
                    d="M383.668,434.576c-.512,1.078-.443,1.884-1.513,3.745.262-2.15-.506-1.776-.504-1.872.03-2.481.824-5.372,1.009-7.958.094-1.305-.011-1.652,0-1.872.258-5.205.44-10.238.504-15.447.017-1.404,0-2.809,0-4.213-.002-3.208,1.376-21.952-1.261-22.937-42.562-.892-85.414-3.983-127.122-12.17-5.047-.15-11.255,2.257-11.855,2.34-.164.023-.34-.023-.504,0q.252-7.958.504-15.915c1.711-.299,3.445-.748,5.045-1.404q3.657-.468,7.315-.936c13.016,2.579,26.138,5.005,39.347,6.553,18.862,2.211,80.987,4.712,84.748,6.553,9.256,4.531,5.055,55.274,4.288,65.533Z"
                    style={{ fill: "#f9eae2", strokeWidth: 0 }}
                  />
                  <path
                    d="M242.421,374.192c-38.026,5.391-76.552,9.003-115.015,10.298-.503.017-1.009-.01-1.513,0,.336-4.645,1.458-13.735,7.315-15.447,4.224-1.235,57.406-3.515,69.11-4.681,13.669-1.362,27.109-3.729,40.609-6.085q-.252,7.958-.504,15.915Z"
                    style={{ fill: "#d1b3b5", strokeWidth: 0 }}
                  />
                  <g>
                    <path
                      d="M383.163,406.959c-23.032,4.284-85.64,9.83-103.665,18.256-6.445,3.013-2.644,8.895-.504,8.894,1.285,0,18.478-5.249,24.718-6.553,15.514-3.244,31.447-5.089,46.914-8.426,10.88-2.347,21.384-6.515,32.537-7.958-.065,5.209-.247,10.243-.504,15.447-17.874,9.101-88.863,25.608-96.098,29.022-9.254,4.366-5.504,14.91-4.54,14.979,15.645-15.001,38.903-16.776,59.021-23.873,14.308-5.047,27.817-12.172,41.617-18.256-.185,2.586-.979,5.477-1.009,7.958-30.493,16.205-58.473,37.351-92.567,47.278-10.576,3.079-21.799,4.511-32.537,7.021-1.643-4.239.506-31.203-.504-32.533-.631-.83-6.333.591-7.062-.936q.504-22,1.009-44.001l-7.062-39.086c.599-.083,6.808-2.491,11.855-2.34,41.708,8.187,84.561,11.278,127.122,12.17,2.638.985,1.259,19.729,1.261,22.937Z"
                      style={{ fill: "#76c4c6", strokeWidth: 0 }}
                    />
                    <g>
                      <path
                        d="M383.163,406.959c0,1.404.017,2.809,0,4.213-11.154,1.442-21.657,5.61-32.537,7.958-15.468,3.337-31.4,5.182-46.914,8.426-6.24,1.305-23.433,6.553-24.718,6.553-2.14.001-5.94-5.881.504-8.894,18.026-8.426,80.633-13.972,103.665-18.256Z"
                        style={{ fill: "#5b5279", strokeWidth: 0 }}
                      />
                      <path
                        d="M382.659,428.491c-13.801,6.084-27.309,13.208-41.617,18.256-20.118,7.097-43.376,8.872-59.021,23.873-.964-.069-4.714-10.613,4.54-14.979,7.235-3.414,78.225-19.921,96.098-29.022-.011.22.094.567,0,1.872Z"
                        style={{ fill: "#5b5279", strokeWidth: 0 }}
                      />
                    </g>
                  </g>
                  <g>
                    <path
                      d="M207.613,428.959c-2.294,7.813-.645,15.589,1.513,23.171,7.16,3.364,23.927,4.456,25.727,12.873-.636-1.38-3.682-4.493-4.792-5.149-4.749-2.806-53.266-15.381-64.066-18.724-11.965-3.704-23.573-8.309-35.564-11.936-.136,1.14-.053,1.358.757,2.106,1.176,1.086,26.666,11.332,30.267,12.639,24.227,8.788,58.456,13.382,69.867,31.83-1.197.069-1.528-1.379-3.783-.936-3.178,4.504-9.28.595-7.062,10.298q15.764,2.809,31.528,5.617c-1.749-.224-1.434.469-1.513.468-1.008-.006-17.675-2.367-19.926-2.809-20.636-4.049-50.284-17.16-67.597-28.554-10.649-7.008-19.454-16.466-31.276-22-1.295-1.438-1.811-7.542-2.27-9.83l1.009.234c-.439-4.58-1.153-9.202-1.513-13.809,26.028,5.721,52.613,9.07,78.695,14.511Z"
                      style={{ fill: "#017584", strokeWidth: 0 }}
                    />
                    <path
                      d="M127.405,384.49c.012,8.607.904,17.169,1.513,25.745.099,1.393-.109,2.822,0,4.213.361,4.607,1.074,9.228,1.513,13.809l-1.009-.234c-1.945-9.685-4.205-34.236-3.531-43.533.504-.01,1.01.017,1.513,0Z"
                      style={{ fill: "#d8e7eb", strokeWidth: 0 }}
                    />
                    <path
                      d="M242.421,374.192c.164-.023.34.023.504,0l7.062,39.086q-.504,22-1.009,44.001c.729,1.527,6.431.106,7.062.936,1.011,1.329-1.138,28.293.504,32.533h-4.54q-15.764-2.809-31.528-5.617c-2.218-9.704,3.884-5.794,7.062-10.298,2.255-.443,2.587,1.005,3.783.936,3.605-.208,4.321-7.071,3.531-10.766-1.8-8.417-18.568-9.508-25.727-12.873-2.159-7.582-3.807-15.358-1.513-23.171,7.544,1.574,14.906,4.013,22.448,5.617,5.665-6.988-.714-9.652-12.611-12.639-20.014-5.025-65.326-7.501-88.532-11.702-.609-8.577-1.502-17.139-1.513-25.745,38.464-1.295,76.99-4.907,115.015-10.298Z"
                      style={{ fill: "#017584", strokeWidth: 0 }}
                    />
                    <g>
                      <path
                        d="M207.613,428.959c-26.082-5.441-52.666-8.79-78.695-14.511-.109-1.391.099-2.82,0-4.213,23.205,4.202,68.517,6.677,88.532,11.702,11.897,2.987,18.277,5.65,12.611,12.639-7.542-1.605-14.904-4.043-22.448-5.617Z"
                        style={{ fill: "#100f1c", strokeWidth: 0 }}
                      />
                      <path
                        d="M234.854,465.003c.79,3.695.074,10.558-3.531,10.766-11.411-18.448-45.64-23.043-69.867-31.83-3.601-1.306-29.091-11.552-30.267-12.639-.81-.748-.893-.966-.757-2.106,11.991,3.627,23.599,8.233,35.564,11.936,10.8,3.343,59.316,15.918,64.066,18.724,1.111.656,4.156,3.769,4.792,5.149Z"
                        style={{ fill: "#0d121a", strokeWidth: 0 }}
                      />
                    </g>
                  </g>
                </g>
              </g>
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
            </svg>
          </>
        </>
      ) : orientation === "Portrait" ? (
        <section className="portretMode">
          <h1>Draai je scherm op Landscape mode!</h1>
        </section>
      ) : null}
    </>
  );
};

export default Step6;
