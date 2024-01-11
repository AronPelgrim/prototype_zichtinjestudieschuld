import { useEffect, useRef, useState } from "react";
import "../../styles/Global.css";

const SliderPanel = ({
  onChange1,
  onChange2,
  onChange3,
  onChange4,
  onChange5,
  onChange6,
  onChange7,
  onChange8,
}) => {
  // Ref voor de slider, hoogte van de slider, paneelverbergingsstatus, en schakelstatus
  const sliderRef = useRef(null);
  const [sliderHeight, setSliderHeight] = useState(0);
  const [hidePanel, setHidePanel] = useState(true);
  const [toggleChecked, setToggleChecked] = useState(false);

  // States voor verschillende parameters gerelateerd aan studieschuld en hypotheek
  const [aflosFase, setAflosFase] = useState(0);
  const [aanloopfase, setAanloopfase] = useState("");
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

    setAanloopfase(urlParams.get("aanloopfase") || "nee");
    setMax35(
      urlParams.get("max35") === "true"
        ? true
        : urlParams.get("max35") === "false"
        ? false
        : null
    );
    setAflosFase(urlParams.get("aflosfase") || 1);
    setInkomen(urlParams.get("inkomen") || 0);
    setLeningpm(urlParams.get("leningpm") || 0);
    setLeenduur(urlParams.get("leenduur") || 1);
    setHypotheekRente(urlParams.get("hypotheekRente") || 4.5);
    setGeleendPre2024(urlParams.get("geleendPre2024") || 0);

    // Zet de schakelstatus op "ja" als aanloopfase gelijk is aan "ja"
    if (urlParams.get("aanloopfase") === "ja") {
      setToggleChecked(true);
    }
  }, []);

  // Effect voor het observeren van de hoogte van de slider en het bijwerken van de staat
  useEffect(() => {
    // Maak een nieuwe ResizeObserver aan met een callback-functie
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === sliderRef.current) {
          // Update de hoogte van de slider in de staat
          setSliderHeight(entry.contentRect.height);
        }
      }
    });

    // Voeg het slider-element toe aan de ResizeObserver om wijzigingen in grootte te detecteren
    if (sliderRef.current) {
      resizeObserver.observe(sliderRef.current);
    }

    // Cleanup-functie om de observer te verwijderen bij het opruimen van het component
    return () => {
      if (sliderRef.current) {
        resizeObserver.unobserve(sliderRef.current);
      }
    };
  }, []);

  // Effect om touchstart en touchend gebeurtenissen aan de slider toe te voegen
  useEffect(() => {
    // Functie die wordt uitgevoerd bij het beginnen van een aanraking (touchstart)
    const handleTouchStart = () => {
      // Pas de achtergrondkleur van de slider aan tijdens aanraking
      sliderRef.current.style.backgroundColor = "rgba(241, 194, 230, 0.6)";
    };

    // Functie die wordt uitgevoerd bij het beëindigen van een aanraking (touchend)
    const handleTouchEnd = () => {
      // Herstel de oorspronkelijke achtergrondkleur van de slider na aanraking
      sliderRef.current.style.backgroundColor = "rgba(241, 194, 230, 1)";
    };

    // Voeg event listeners toe voor touchstart en touchend aan de slider
    sliderRef.current.addEventListener("touchstart", handleTouchStart);
    sliderRef.current.addEventListener("touchend", handleTouchEnd);

    // Cleanup-functie om event listeners te verwijderen bij het opruimen van het component
    return () => {
      sliderRef.current.removeEventListener("touchstart", handleTouchStart);
      sliderRef.current.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Functie om een getal op te maken naar een lokale string met 2 decimalen
  const formatToLocaleString = (value) => {
    return parseFloat(value).toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Functie om leenbedrag te verwerken en door te geven aan de bovenliggende component
  const handleLeningpm = (e) => {
    const updatedValue = parseInt(e.target.value);
    setLeningpm(updatedValue);
    onChange1(updatedValue);
  };

  // Functie om leenduur te verwerken en door te geven aan de bovenliggende component
  const handleLeenduur = (e) => {
    const updatedValue = parseInt(e.target.value);
    setLeenduur(updatedValue);
    onChange2(updatedValue);

    // Pas geleendPre2024 aan op basis van leenduur
    setGeleendPre2024(
      geleendPre2024 > updatedValue ? updatedValue : geleendPre2024
    );
    onChange7(geleendPre2024 > updatedValue ? updatedValue : geleendPre2024);
  };

  // Functie om aflosfase te verwerken en door te geven aan de bovenliggende component
  const handleAflosFase = (e) => {
    const updatedValue = parseInt(e.target.value);
    setAflosFase(updatedValue);
    onChange3(updatedValue);
  };

  // Functie om aanloopfase te verwerken en door te geven aan de bovenliggende component
  const handleAanloopfase = (e) => {
    setToggleChecked(e.target.checked);

    // Bepaal de waarde van aanloopfase op basis van checkbox status
    if (toggleChecked === false) {
      setAanloopfase("ja");
      onChange4("ja");
    } else if (toggleChecked === true) {
      setAanloopfase("nee");
      onChange4("nee");
    }
  };

  // Functie om inkomen te verwerken en door te geven aan de bovenliggende component
  const handleInkomen = (e) => {
    const inputValue = e.target.value;

    // Controleer en verwerk geldige getalinvoer voor inkomen
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === "") {
      setInkomen(inputValue);
      onChange5(inputValue);
    }
  };

  // Functie om hypotheekrente te verwerken en door te geven aan de bovenliggende component
  const handleHypotheekrente = (e) => {
    const inputValue = e.target.value;

    // Controleer en verwerk geldige getalinvoer voor hypotheekrente
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === "") {
      setHypotheekRente(inputValue);
      onChange6(inputValue);
    }
  };

  // Functie om geleendPre2024 te verwerken en door te geven aan de bovenliggende component
  const handlePre2024 = (e) => {
    const updatedValue = parseFloat(e.target.value);
    setGeleendPre2024(updatedValue);
    onChange7(updatedValue);
  };

  // Functie om regeling (max35) te verwerken en door te geven aan de bovenliggende component
  const handleRegeling = (e) => {
    const value = e.target.value;
    setMax35(value === "true");
    onChange8(value);
  };

  return (
    <>
      {/* Sectie met schuifpaneel, verwijzend naar een ref en ingesteld met dynamische stijlen */}
      <section
        ref={sliderRef} // Ref om toegang te krijgen tot de sectie in de code
        className="slider-panel" // CSS-klasse voor de stijling van het schuifpaneel
        style={{
          bottom: hidePanel ? `-${sliderHeight}px` : "0", // Dynamische positie op basis van de hoogte van het schuifpaneel
          transition: "bottom 0.4s ease, height 0.4s ease", // Overgangseffect op de positie en hoogte
        }}
      >
        {/* Knop voor het tonen/verbergen van het schuifpaneel */}
        <button
          onClick={() => setHidePanel(!hidePanel)} // Wissel de status van het paneel bij elke klik
          style={{
            animation: hidePanel
              ? "button-animation 1.5s ease-in-out infinite both" // Animatie wanneer het paneel verborgen is
              : "none",
          }}
        >
          Klik voor het {hidePanel ? "verbergen" : "bewerken"} van je verzamelde
          gegevens
        </button>
        {/* Sectie met slider-inhoud voor lening per maand */}
        <section>
          {/* Toon het leenbedrag en voeg een slider toe voor bijwerken */}
          <label>Lening per maand: €{formatToLocaleString(leningpm)}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={leningpm}
            onChange={handleLeningpm}
            step="10"
          />
        </section>
        {/* Sectie met slider-inhoud voor totale leenduur */}
        <section>
          {/* Toon de totale leenduur en voeg een slider toe voor bijwerken */}
          <label>Totale leenduur: {leenduur} jaar</label>
          <input
            type="range"
            min="1"
            max="10"
            value={leenduur}
            onChange={handleLeenduur}
            step="1"
          />
        </section>
        {/* Sectie met slider-inhoud voor geleend voor 2024 */}
        <section>
          {/* Toon het aantal jaren geleend voor 2024 en voeg een slider toe voor bijwerken */}
          <label>Geleend voor 2024: {geleendPre2024} jaar</label>
          <input
            type="range"
            min="0"
            max={parseInt(leenduur)}
            value={geleendPre2024}
            onChange={handlePre2024}
            step="1"
          />
        </section>
        {/* Sectie met radio-buttons voor het kiezen van de regeling (max35) */}
        <section style={{ marginBottom: ".5em" }}>
          {/* Radiobutton voor SF35 */}
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

          {/* Radiobutton voor SF15 */}
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
        </section>
        {/* Dynamische weergave van aflosfase slider op basis van geselecteerde regeling (max35) */}
        {max35 === true ? (
          // Sectie voor SF35 regeling
          <section>
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
          </section>
        ) : max35 === false ? (
          // Sectie voor SF15 regeling
          <section>
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
          </section>
        ) : null}
        {/* Sectie voor het tonen van aanloopfase met toggle siwtch */}
        <section>
          <label>Aanloopfase: {aanloopfase}</label>
          <input
            type="checkbox"
            id="switch"
            checked={toggleChecked}
            onChange={handleAanloopfase}
          />
          <label className="label-aanloopfase" htmlFor="switch">
            Toggle
          </label>
        </section>
        {/* Sectie voor het invoeren van hypotheekrente */}
        <section>
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
        </section>
        {/* Sectie voor het tonen van inkomen met slider */}
        <section>
          <label>Inkomen: € {formatToLocaleString(inkomen)}</label>
          <input
            type="range"
            min="1500"
            max="10000"
            value={inkomen}
            onChange={handleInkomen}
            step="50"
          />
        </section>
      </section>
    </>
  );
};

export default SliderPanel;
