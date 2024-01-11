"use client";

import { useState, useEffect } from "react";
import "../../styles/Global.css";
import Link from "next/link";

const Onboarding2 = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [orientation, setOrientation] = useState("");
  const [antwoord, setAntwoord] = useState(false);

  useEffect(() => {
    const headerText = `Om dat te doen, neem ik je mee op een reis door de tijd, tijdens 
    en na je studie. Deze reis bestaat uit 10 stappen en geeft je een duidelijk beeld van de impact van je studieschuld!`;

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

  return (
    <>
      {orientation === "Landscape" ? (
        <>
          <header className="onboarding">{displayedText}</header>
          <section className="vorige-volgende onboarding">
            <Link href={`/step1`}>Neem me mee!</Link>
            <Link href="/onboarding2">Vorige</Link>
          </section>
          <svg
            id="Laag_1"
            data-name="Laag 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2040.936 163.218"
            className="logo onboarding"
          >
            <path
              d="M74.271,115.515h10.467v1.006l15.699,15.9v30.998H16.907l-15.901-15.7H0v-40.86h10.063v-17.309h5.837v-13.889h5.637v-10.668h6.037v-6.844h-10.667L1.006,42.249H0V10.044h84.738v1.006l15.699,15.902v48.709h-8.654v17.512h-8.857v17.511h-8.654v4.831ZM75.68,138.661v-14.09H31.802v-3.422h8.655v-17.712h9.057v-17.511h8.655v-17.512h8.856v-17.512h8.654v-31.802H9.057v14.089h43.879v12.279h-8.855v17.712h-8.856v17.511h-8.655v17.512h-8.855v17.713h-8.656v22.744h66.623Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M99.027,147.517h-1.209V1.188h41.062v1.006l15.7,15.9v145.123h-39.854l-15.699-15.7ZM129.822,50.702V10.245h-22.945v40.457h22.945ZM129.822,138.46V62.98h-22.945v75.479h22.945Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M207.717,116.118h27.977v1.006l15.7,15.7v26.972h-70.851l-4.629-4.63h-8.051l-15.901-15.7h-1.007V54.526h8.656v-8.855h76.082v1.207l15.7,15.699v31.199h-43.677v22.342ZM226.637,139.265v-14.09h-43.879v-56.156h43.879v-14.291h-57.969v8.856h-8.654v66.825h8.654v8.855h57.969Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M304.329,53.923h19.323v1.006l24.354,24.557v83.732h-39.853l-3.824-3.824v3.824h-39.853l-15.902-15.7h-1.006V1.188h40.859v1.006l15.901,15.9v35.828ZM279.371,138.46v-61.391h21.134v61.391h22.745v-66.824h-8.656v-8.655h-35.223V10.245h-22.745v128.215h22.745Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M409.598,115.313h1.811v1.006l15.699,15.9v30.998h-57.564l-15.701-15.7h-1.207v-62.598l-7.648-7.649h-1.006v-32.204h8.654V1.188h41.061v1.006l15.902,15.9v26.972h10.465v1.007l15.701,15.699v31.198h-26.166v22.343ZM402.352,138.46v-14.09h-17.713v-56.156h26.367v-14.09h-26.367V10.245h-22.945v43.879h-8.656v14.09h8.656v70.246h40.658Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M431.133,147.719h-1.207V10.044h41.061v1.006l15.699,15.902v136.467h-39.854l-15.699-15.7ZM461.928,138.661V19.101h-22.945v119.56h22.945Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M482.057,148.323h-1.008V45.671h76.084v1.207l24.355,24.557v92.588h-39.854l-3.824-4.025v4.025h-39.854l-15.9-15.699ZM512.852,139.265v-70.246h21.135v70.246h22.744V63.584h-8.654v-8.856h-57.969v84.537h22.744Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M571.422,147.719h-1.008v-32.204h35.225V10.044h40.859v1.006l15.699,15.902v136.467h-74.875l-15.9-15.7ZM637.441,138.661V19.101h-22.746v105.47h-35.223v14.09h57.969Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M661.594,139.466h-1.008V54.526h8.656v-8.855h76.082v1.207l15.701,15.699v66.221h-3.824l3.824,4.026v31.198h-66.221l-9.26-8.856h-8.051l-15.9-15.7ZM736.268,139.265v-14.09h-43.879v-12.479h35.225v-8.655h8.654v-49.313h-57.969v8.856h-8.654v66.825h8.654v8.855h57.969ZM692.389,98.808v-29.789h21.135v29.789h-21.135Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M813.959,62.779h19.322v1.007l24.355,24.757v74.876h-83.531l-15.9-15.7h-1.006v-32.204h43.879v-7.648h-14.291v-6.039h-12.682l-15.9-15.699h-1.006V10.044h84.738v1.006l15.699,15.902v31.197h-43.678v4.63ZM832.879,138.661v-57.969h-8.654v-8.855h-35.225v-38.646h43.879v-14.089h-66.623v57.968h8.656v8.857h35.223v38.645h-43.879v14.09h66.623Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M921.24,115.313h1.811v1.006l15.699,15.9v30.998h-57.564l-15.701-15.7h-1.207v-62.598l-7.648-7.649h-1.006v-32.204h8.654V1.188h41.061v1.006l15.902,15.9v26.972h10.465v1.007l15.701,15.699v31.198h-26.166v22.343ZM913.994,138.46v-14.09h-17.713v-56.156h26.367v-14.09h-26.367V10.245h-22.945v43.879h-8.656v14.09h8.656v70.246h40.658Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M943.379,139.466h-1.006V45.671h41.061v1.207l7.85,7.648h36.029v1.208l15.699,15.7v52.533l8.857,8.856v26.972h-79.707l-4.629-4.63h-8.254l-15.9-15.7ZM1027.111,139.265v-14.09h-8.857v-61.591h-22.744v61.591h-21.133V54.727h-22.947v75.682h8.857v8.855h66.824Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1042.004,138.862h-1.008V62.577h8.656v-8.654h35.223V1.188h40.859v1.006l15.701,15.9v145.123h-74.877l-24.555-24.355ZM1116.678,138.46V10.245h-22.744v52.735h-35.225v8.655h-8.654v58.169h8.654v8.655h57.969ZM1072.799,124.37v-47.301h21.135v47.301h-21.135Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1138.012,147.517h-1.207V1.188h41.061v1.006l15.701,15.9v145.123h-39.854l-15.701-15.7ZM1168.809,50.702V10.245h-22.945v40.457h22.945ZM1168.809,138.46V62.98h-22.945v75.479h22.945Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1190.947,139.466h-1.006V54.526h8.654v-8.855h76.084v1.207l15.699,15.699v66.221h-3.824l3.824,4.026v31.198h-66.221l-9.258-8.856h-8.053l-15.9-15.7ZM1265.621,139.265v-14.09h-43.879v-12.479h35.225v-8.655h8.654v-49.313h-57.967v8.856h-8.656v66.825h8.656v8.855h57.967ZM1221.742,98.808v-29.789h21.135v29.789h-21.135Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1287.561,148.323h-1.006v-32.205h12.881l-11.875-11.875h-1.006v-49.717h8.654v-8.855h76.084v1.207l15.699,15.699v31.199h-12.68l12.68,12.881v48.509h-8.654v8.856h-74.877l-15.9-15.699ZM1353.58,139.265v-8.855h8.654v-31.602h-8.654v-8.855h-35.225v-20.934h43.879v-14.291h-57.967v8.856h-8.656v31.601h8.656v8.856h35.223v21.134h-43.879v14.09h57.969Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1441.939,116.118h27.977v1.006l15.701,15.7v26.972h-70.852l-4.629-4.63h-8.051l-15.9-15.7h-1.008V54.526h8.656v-8.855h76.082v1.207l15.701,15.699v31.199h-43.678v22.342ZM1460.859,139.265v-14.09h-43.879v-56.156h43.879v-14.291h-57.969v8.856h-8.654v66.825h8.654v8.855h57.969Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1538.553,53.923h19.322v1.006l24.355,24.557v83.732h-39.854l-3.824-3.824v3.824h-39.854l-15.9-15.7h-1.008V1.188h40.859v1.006l15.902,15.9v35.828ZM1513.594,138.46v-61.391h21.135v61.391h22.744v-66.824h-8.654v-8.655h-35.225V10.245h-22.744v128.215h22.744Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1579.41,139.466h-1.006V45.671h41.061v1.207l7.85,7.648h36.029v1.208l15.699,15.7v52.533l8.857,8.856v26.972h-79.707l-4.629-4.63h-8.254l-15.9-15.7ZM1663.143,139.265v-14.09h-8.857v-61.591h-22.744v61.591h-21.133V54.727h-22.947v75.682h8.857v8.855h66.824Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1677.432,147.517h-1.207V1.188h41.061v1.006l15.699,15.9v145.123h-39.854l-15.699-15.7ZM1708.227,138.46V10.245h-22.945v128.215h22.945Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1732.379,138.862h-1.008V62.577h8.656v-8.654h35.223V1.188h40.859v1.006l15.701,15.9v145.123h-74.877l-24.555-24.355ZM1807.053,138.46V10.245h-22.744v52.735h-35.225v8.655h-8.654v58.169h8.654v8.655h57.969ZM1763.174,124.37v-47.301h21.135v47.301h-21.135Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1831.406,148.927h-1.207v-49.516h41.061v1.007l15.699,15.7v48.709h-39.852l-15.701-15.9ZM1862.203,139.868v-31.398h-22.947v31.398h22.947Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1887.361,148.323h-1.008V45.671h76.084v1.207l24.355,24.557v92.588h-39.854l-3.824-4.025v4.025h-39.854l-15.9-15.699ZM1918.156,139.265v-70.246h21.135v70.246h22.744V63.584h-8.654v-8.856h-57.969v84.537h22.744Z"
              style={{ stroke: "#000" }}
            />
            <path
              d="M1985.381,147.517h-1.207V1.188h41.061v1.006l15.701,15.9v145.123h-39.854l-15.701-15.7ZM2016.178,138.46V10.245h-22.945v128.215h22.945Z"
              style={{ stroke: "#000" }}
            />
          </svg>
          <svg
            id="Laag_1"
            data-name="Laag 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 506.78 775.059"
            className="character onboarding"
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
                  strokeWidth: 0,
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

export default Onboarding2;
