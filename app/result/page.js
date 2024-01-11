"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "../../styles/Global.css";
import AflosSVG from "../components/aflossvg";
import Character from "../components/character";
import HypotheekSVG from "../components/hypotheeksvg";
import KoopkrachtSVG from "../components/koopkrachtsvg";
import Logo from "../components/logo";
import Progressbar from "../components/progressbar";
import RenteBetaaldSVG from "../components/rentebetaaldsvg";
import SliderPanel from "../components/slider";
import StudieschuldSVG from "../components/studieschuld";

const Result = () => {
  // State hooks voor schermoriëntatie en paginainstellingen
  const [orientation, setOrientation] = useState("");
  const progressWidth = "100%";
  const currentPage = 10;

  // State hooks voor weergave van extra informatie en berekende resultaten
  const [introOpen, setIntroOpen] = useState(true);
  const [extraInfoSchuld, setExtraInfoSchuld] = useState(false);
  const [extraInfoAflos, setExtraInfoAflos] = useState(false);
  const [extraInfoRente, setExtraInfoRente] = useState(false);
  const [extraInfoHypo, setExtraInfoHypo] = useState(false);
  const [extraInfoKoopkracht, setExtraInfoKoopkracht] = useState(false);

  // State hooks voor verschillende berekende resultaten en inputparameters
  const [studieSchuld, setStudieSchuld] = useState(0);
  const [hypotheek, setHypotheek] = useState(0);
  const [afloskosten, setAfloskosten] = useState(0);
  const [rentebetaald, setRentebetaald] = useState(0);
  const [koopkracht, setKoopkracht] = useState(0);
  const [jarenPre2024, setJarenPre2024] = useState({});

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
    setMax35(urlParams.get("max35") === "true" || null);
    setAflosFase(urlParams.get("aflosfase") || 1);
    setRentepercentage(
      urlParams.get("max35") === "true"
        ? 2.56
        : urlParams.get("max35") === "false"
        ? 2.95
        : null
    );
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

  // Functie om een getal naar een opgemaakte string in Nederlandse stijl te formatteren
  const formatToLocaleString = (value) => {
    return parseFloat(value).toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Effect om de studieschuld te berekenen op basis van leningparameters
  useEffect(() => {
    // Array met rentepercentages voor leningen vóór 2024
    const rentePre2024 = [0.46, 0.0, 0.0, 0.0, 0.1, 0.1, 0.1, 0.0, 0.12, 0.81];
    // Rentepercentage omzetten naar decimale waarde
    const rente = rentepercentage / 100;
    // Aantal maanden berekenen op basis van leenduur
    const months = leenduur * 12;
    // Totaalbedrag initialiseren
    let totalAmount = 0;
    // Array voor persoonlijke rentepercentages opbouwen op basis van geleendPre2024
    const rentePersoonlijk = [];

    // Loop voor het opbouwen van persoonlijke rentepercentages
    for (let i = 0; i < months; i++) {
      if (i < geleendPre2024 * 12) {
        // Voor leningen vóór 2024
        rentePersoonlijk.push(
          rentePre2024[Math.floor((geleendPre2024 * 12 - i - 1) / 12)] /
            100 /
            12
        );
      } else {
        // Voor leningen vanaf 2024
        rentePersoonlijk.push(rente / 12);
      }
    }

    // Loop voor het berekenen van het totaalbedrag op basis van lening per maand en rentepercentages
    for (let i = 0; i < months; i++) {
      totalAmount += leningpm * Math.pow(1 + rentePersoonlijk[i], i + 1);
    }

    // Als er een aanloopfase is, voeg extra renteberekening toe voor de eerste 24 maanden
    if (aanloopfase === "ja") {
      for (let i = 0; i < 24; i++) {
        totalAmount = totalAmount * (1 + rente / 12);
      }
    }

    // Zet de berekende studieschuld in de state
    setStudieSchuld(totalAmount);
  }, [leningpm, leenduur, rentepercentage, aanloopfase, geleendPre2024]);

  // Effect om maandelijkse afloskosten te berekenen op basis van studieschuld, aflosfase en rentepercentage
  useEffect(() => {
    // Rentepercentage per maand berekenen
    const maandelijkseRente = rentepercentage / 12 / 100;
    // Totaal aantal betalingen berekenen op basis van aflosfase
    const totaleBetalingen = aflosFase * 12;
    // Maandelijkse aflossing berekenen met de annuïteitsformule
    const maandelijkseBetaling =
      (maandelijkseRente * studieSchuld) /
      (1 - Math.pow(1 + maandelijkseRente, -totaleBetalingen));

    // Maandelijkse afloskosten instellen in de state, afgerond op 2 decimalen
    setAfloskosten(maandelijkseBetaling.toFixed(2));
  }, [studieSchuld, aflosFase, rentepercentage]);

  // Effect om het maximale hypotheekbedrag te berekenen op basis van afloskosten en hypotheekrente
  useEffect(() => {
    // Bereken de maandelijkse rente
    const monthlyRate = hypotheekRente / 100 / 12;
    // Looptijd van de lening in maanden (30 jaar)
    const loanTermMonths = 30 * 12;
    // Bereken het maximale leenbedrag op basis van afloskosten en maandelijkse rente
    const maxLoanAmount =
      (afloskosten / monthlyRate) *
      (1 - Math.pow(1 + monthlyRate, -loanTermMonths));

    // Zet het maximale hypotheekbedrag in de state met twee decimalen
    setHypotheek(maxLoanAmount.toFixed(2));
  }, [afloskosten, hypotheekRente]);

  // Effect om het totaal betaalde rentebedrag te berekenen op basis van afloskosten, aflosfase en studieschuld
  useEffect(() => {
    // Bereken het totale bedrag aan aflossingen over de gehele aflosperiode
    const totaleBetalingen = afloskosten * aflosFase * 12;
    // Bereken het totaal betaalde rentebedrag door het verschil tussen totale betalingen en studieschuld
    const totaalBetaaldeRente = totaleBetalingen - studieSchuld;
    // Zet het totaal betaalde rentebedrag in de state met twee decimalen
    setRentebetaald(totaalBetaaldeRente.toFixed(2));
  }, [afloskosten, aflosFase, studieSchuld]);

  // Effect om de koopkracht te berekenen op basis van inkomen en afloskosten
  useEffect(() => {
    // Bereken de koopkracht door het inkomen te verminderen met de afloskosten
    const koopkrachtBerekenen = inkomen - afloskosten;
    // Zet de berekende koopkracht in de state
    setKoopkracht(koopkrachtBerekenen);
  }, [inkomen, afloskosten]);

  // Effect om rentepercentages per jaar te genereren op basis van het startjaar van lenen
  useEffect(() => {
    // Functie om rentepercentages per jaar te genereren
    const generateRentePerJaar = (startJaar) => {
      // Lijst met rentepercentages per jaar
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

      // Object om rentepercentages per jaar op te slaan
      const jarenMetRente = {};

      // Loop door de jaren en vul het object met rentepercentages
      for (let i = startJaar; i >= 1; i--) {
        jarenMetRente[2024 - i] = rentepercentages[i - 1]?.rente || 0;
      }

      return jarenMetRente;
    };

    // Genereer rentepercentages per jaar en zet ze in de state
    const renteVoorJaren = generateRentePerJaar(geleendPre2024);
    setJarenPre2024(renteVoorJaren);
  }, [geleendPre2024]);

  // Functies om de waarden van sliders bij te werken bij verandering
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
          <section className="result">
            <Progressbar
              progressWidth={progressWidth}
              currentPage={currentPage}
            ></Progressbar>
            <Link href={`/`}>
              <Logo />
            </Link>
            {/* Voorwaardelijke weergave van extra informatie over de studieschuld */}
            {extraInfoSchuld && (
              <section className="open">
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoSchuld(extraInfoSchuld === false ? true : false)
                  }
                >
                  X
                </span>
                <p>
                  Dit is dus de studieschuld die je na {leenduur} jaar lenen
                  hebt opgebouwd, {aanloopfase === "ja" ? "met" : "zonder"} de
                  rente van de aanloopfase meegerekend. Deze schuld is opgebouwd
                  met de volgende rentepercentages:
                </p>
                <ul>
                  {/* Weergeef de rentepercentages voor elk jaar */}
                  {Object.entries(jarenPre2024).map(([jaar, rente]) => (
                    <li key={jaar}>
                      Jaar {jaar}:{" "}
                      <span style={{ color: "var(--red)" }}>
                        {parseFloat(rente).toLocaleString("nl-NL", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) + "% "}
                      </span>
                      rente{"."}
                    </li>
                  ))}
                  {/* Toon rentepercentage vanaf jaar 2024 als de leenduur niet gelijk is aan geleendPre2024 */}
                  {leenduur !== geleendPre2024 ? (
                    <li>
                      Vanaf jaar 2024:{" "}
                      <span style={{ color: "var(--red)" }}>
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
                {/* Toon de totale studieschuld en visualisaties */}
                <h1>€{formatToLocaleString(studieSchuld)}</h1>
                <StudieschuldSVG leningpm={leningpm}></StudieschuldSVG>
                <Character />
              </section>
            )}
            {/* Voorwaardelijke weergave van extra informatie over de afloskosten */}
            {extraInfoAflos && (
              <section className="open">
                {/* Sluitknop voor de extra informatie */}
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoAflos(extraInfoAflos === false ? true : false)
                  }
                >
                  X
                </span>
                <p>
                  Dit zijn de kosten die je maandelijks moet aflossen na je
                  studie. Let op: DUO berekent op basis van je inkomen hoeveel
                  je per maand kunt terugbetalen. Dit wordt elk kalenderjaar
                  opnieuw berekend. Als je draagkracht lager is dan het
                  wettelijke termijnbedrag, betaal je dit lagere bedrag.
                </p>
                {/* Toon de maandelijkse afloskosten en visualisaties */}
                <h1>€{formatToLocaleString(afloskosten)}</h1>
                <AflosSVG aflosFase={aflosFase}></AflosSVG>
                <Character />
              </section>
            )}
            {/* Voorwaardelijke weergave van extra informatie over de betaalde rente */}
            {extraInfoRente && (
              <section className="open">
                {/* Sluitknop voor de extra informatie */}
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoRente(extraInfoRente === false ? true : false)
                  }
                >
                  X
                </span>
                <p>
                  Dit is het bedrag dat je gaat betalen aan rente, met een
                  rentepercentage van{" "}
                  <span style={{ color: "var(--red)" }}>
                    {rentepercentage}%{" "}
                  </span>
                  als je {aflosFase} jaar doet over het aflossen van je
                  studieschuld. Vergeet niet dat dit het percentage van 2024 is
                  en dat het rentepercentage jaarlijks kan veranderen. Je hebt
                  natuurlijk wel rentevasteperiodes van 5 jaar die je kan
                  inzetten.
                </p>
                {/* Toon het bedrag aan betaalde rente, visualisaties en karakter */}
                <h1>€{formatToLocaleString(rentebetaald)}</h1>
                <RenteBetaaldSVG aflosFase={aflosFase}></RenteBetaaldSVG>
                <Character />
              </section>
            )}
            {/* Voorwaardelijke weergave van extra informatie over de hypotheek */}
            {extraInfoHypo && (
              <section className="open">
                {/* Sluitknop voor de extra informatie */}
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoHypo(extraInfoHypo === false ? true : false)
                  }
                >
                  X
                </span>
                <p>
                  Dit bedrag geeft aan hoeveel minder je kunt lenen aan
                  hypotheek, op basis van je maandelijkse afloskosten, zo wordt
                  er namelijk sinds 2024 niet meer gerekend met je
                  oorspronkelijke studieschuld. Het is zo dat verschillende
                  factoren de definitieve hypotheek beïnvloeden. Het is daarom
                  aan te raden om dit met een hypotheekadviseur te bespreken.
                </p>
                {/* Toon het bedrag aan hypotheek, visualisaties en karakter */}
                <h1>€{formatToLocaleString(hypotheek)}</h1>
                <HypotheekSVG leningpm={leningpm}></HypotheekSVG>
                <Character />
              </section>
            )}
            {/* Voorwaardelijke weergave van extra informatie over de koopkracht */}
            {extraInfoKoopkracht && (
              <section className="open">
                {/* Sluitknop voor de extra informatie */}
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoKoopkracht(
                      extraInfoKoopkracht === false ? true : false
                    )
                  }
                >
                  X
                </span>
                <p>
                  Dit bedrag vertegenwoordigt je koopkracht na je maandelijkse
                  aflossing. Zo kun je bepalen hoeveel je wilt aflossen,
                  gebaseerd op je inkomen. Let op: dit is een bruto-inkomen, dus
                  je daadwerkelijke koopkracht zal iets lager zijn. Na je studie
                  zal je inkomen waarschijnlijk snel stijgen.
                </p>
                {/* Toon het bedrag aan koopkracht, visualisaties en karakter */}
                <h1>€{formatToLocaleString(koopkracht)}</h1>
                <KoopkrachtSVG inkomen={inkomen}></KoopkrachtSVG>
                <Character />
              </section>
            )}
            <section className="result-grid">
              {/* Informatie over studieschuld */}
              <section>
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoSchuld(extraInfoSchuld === false ? true : false)
                  }
                >
                  i
                </span>
                <p>
                  Je studieschuld na de studie,{" "}
                  {aanloopfase === "ja" ? "met" : "zonder"} aanloopfase.
                </p>
                <h1>€{formatToLocaleString(studieSchuld)}</h1>
                {/* Visualisatie voor studieschuld */}
                <StudieschuldSVG leningpm={leningpm}></StudieschuldSVG>
              </section>

              {/* Informatie over maandelijkse afloskosten */}
              <section>
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoAflos(extraInfoAflos === false ? true : false)
                  }
                >
                  i
                </span>
                <p>Maandelijkse afloskosten</p>
                <h1>€{formatToLocaleString(afloskosten)}</h1>
                {/* Visualisatie voor afloskosten */}
                <AflosSVG aflosFase={aflosFase}></AflosSVG>
              </section>

              {/* Informatie over rentebetaling na bepaald aantal jaar */}
              <section>
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoRente(extraInfoRente === false ? true : false)
                  }
                >
                  i
                </span>
                <p>Bedrag betaald aan rente na {aflosFase} jaar aflossen</p>
                <h1>€{formatToLocaleString(rentebetaald)}</h1>
                {/* Visualisatie voor rentebetaling */}
                <RenteBetaaldSVG aflosFase={aflosFase}></RenteBetaaldSVG>
              </section>

              {/* Informatie over verminderd hypotheekbedrag */}
              <section>
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoHypo(extraInfoHypo === false ? true : false)
                  }
                >
                  i
                </span>
                <p>Vermindering maximale hypotheekbedrag</p>
                <h1>€{formatToLocaleString(hypotheek)}</h1>
                {/* Visualisatie voor verminderd hypotheekbedrag */}
                <HypotheekSVG leningpm={leningpm}></HypotheekSVG>
              </section>

              {/* Informatie over koopkracht na aflossing */}
              <section>
                <span
                  className="info-icon"
                  onClick={() =>
                    setExtraInfoKoopkracht(
                      extraInfoKoopkracht === false ? true : false
                    )
                  }
                >
                  i
                </span>
                <p>Je koopkracht na je maandelijkse aflossing</p>
                <h1>€{formatToLocaleString(koopkracht)}</h1>
                {/* Visualisatie voor koopkracht */}
                <KoopkrachtSVG inkomen={inkomen}></KoopkrachtSVG>
              </section>
            </section>
            {/*
              Introductie en knop voor het bekijken van resultaten.
              Als introOpen waar is, wat initieel zo is, wordt de introductie getoond samen met de knop om de resultaten te bekijken.
              Wanneer de knop wordt ingedrukt, wordt setIntroOpen aangeroepen om de waarde om op false te zetten en het resultatenvenster te openen.
            */}
            {introOpen && (
              <>
                <header
                  style={{
                    animation: "appear-left .5s ease-in",
                  }}
                >
                  {/* Hier wordt de introductietekst weergegeven */}
                  Fantastisch! Je hebt alle 10 stappen voltooid. Gedurende deze
                  stappen, heb ik alle nodige informatie verzameld om je een
                  duidelijk beeld te geven van de gevolgen van je studielening.
                  De onderstaande resultaten zijn op basis van deze informatie.
                  Als je nog gegevens wilt aanpassen, is dat mogelijk. Klik op
                  de onderstaande knop om het controlepaneel te openen en je
                  gegevens te bewerken.
                </header>
                <section className="result-intro">
                  <button
                    onClick={() =>
                      setIntroOpen(introOpen === false ? true : false)
                    }
                  >
                    {/* De knop om de resultaten te bekijken */}
                    Bekijk mijn resultaten!
                  </button>
                  <Character />
                </section>
              </>
            )}

            {/* De SliderPanel wordt weergegeven met de functies voor het bijwerken van waarden bij het verplaatsen van sliders */}
            <SliderPanel
              onChange1={handleSliderChange1}
              onChange2={handleSliderChange2}
              onChange3={handleSliderChange3}
              onChange4={handleSliderChange4}
              onChange5={handleSliderChange5}
              onChange6={handleSliderChange6}
              onChange7={handleSliderChange7}
              onChange8={handleSliderChange8}
            />
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
