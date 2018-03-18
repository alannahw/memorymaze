import React from "react";

export const GRADIENT_INDIA = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="150"
  >
    <stop offset="30%" stopColor="gold" />
    <stop offset="70%" stopColor="IndianRed" />
    <stop offset="95%" stopColor="DarkSlateBlue" />
  </radialGradient>
);
export const GRADIENT_OCEAN = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="150"
  >
    <stop offset="30%" stopColor="Aqua" />
    <stop offset="70%" stopColor="SteelBlue" />
    <stop offset="95%" stopColor="LightCoral" />
  </radialGradient>
);
export const GRADIENT_DARKNESS = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="150"
  >
    <stop offset="30%" stopColor="MediumTurquoise" />
    <stop offset="70%" stopColor="MidnightBlue" />
    <stop offset="95%" stopColor="Black" />
  </radialGradient>
);
export const GRADIENT_FOREST = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="150"
  >
    <stop offset="30%" stopColor="PaleGreen" />
    <stop offset="70%" stopColor="Teal" />
    <stop offset="95%" stopColor="Purple" />
  </radialGradient>
);
export const GRADIENT_MARSHMALLOW = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="150"
  >
    <stop offset="30%" stopColor="LemonChiffon" />
    <stop offset="70%" stopColor="LightPink" />
    <stop offset="95%" stopColor="PowderBlue" />
  </radialGradient>
);

export const ALL_GRADIENTS = [
  { id: "btnIndia", name: "India", grad: GRADIENT_INDIA },
  { id: "btnOcean", name: "Ocean", grad: GRADIENT_OCEAN },
  { id: "btnDarkness", name: "Darkness", grad: GRADIENT_DARKNESS },
  { id: "btnForest", name: "Forest", grad: GRADIENT_FOREST },
  { id: "btnMarshmallow", name: "Marshmallow", grad: GRADIENT_MARSHMALLOW }
];

export const THEME_INDIA = {
  id: "themeIndia",
  name: "India",
  main: "#e07762",
  second: "#fbb664",
  third: "#7b73b5",
  bg: "#30302f",
  light: "#fff"
};
export const THEME_OCEAN = {
  id: "themeOcean",
  name: "Ocean",
  main: "#3b7aa9",
  second: "#52c1c9",
  third: "#e5696b",
  bg: "#2c2c3a",
  light: "#fff"
};
export const THEME_PINEAPPLE = {
  id: "themePineapple",
  name: "Pineapple",
  main: "#fec555",
  second: "#16b688",
  third: "#f48044",
  bg: "#06323a",
  light: "#fff"
};
export const ALL_THEMES = [THEME_INDIA, THEME_OCEAN, THEME_PINEAPPLE];

export function translateTheme(newTheme) {
  return ALL_THEMES.find(e => e.id === newTheme);
}
