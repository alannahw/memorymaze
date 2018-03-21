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

const india_red = "#e07762";
const india_yelow = "#fbb664";
const india_purple = "#7b73b5";
const india_darkgrey = "#30302f";

export const THEME_INDIA = {
  id: "themeIndia",
  name: "India",
  main: india_red,
  second: india_yelow,
  third: india_purple,
  bg: india_darkgrey,
  light: "#fff",
  mainSubtle: india_purple,
  mainVibrant: india_yelow,
  mainMiddle: india_red
};

const ocean_blue = "#3b7aa9";
const ocean_teal = "#52c1c9";
const ocean_pink = "#e5696b";
const ocean_darkblue = "#2c2c3a";

export const THEME_OCEAN = {
  id: "themeOcean",
  name: "Ocean",
  main: ocean_blue,
  second: ocean_teal,
  third: ocean_pink,
  bg: ocean_darkblue,
  light: "#fff",
  mainSubtle: ocean_blue,
  mainVibrant: ocean_teal,
  mainMiddle: ocean_pink
};
const pine_yellow = "#fec555";
const pine_green = "#16b688";
const pine_orange = "#f48044";
const pine_darkteal = "#06323a";

export const THEME_PINEAPPLE = {
  id: "themePineapple",
  name: "Pineapple",
  main: pine_yellow,
  second: pine_green,
  third: pine_orange,
  bg: pine_darkteal,
  light: "#fff",
  mainSubtle: pine_green,
  mainVibrant: pine_yellow,
  mainMiddle: pine_orange
};
export const ALL_THEMES = [THEME_INDIA, THEME_OCEAN, THEME_PINEAPPLE];

export function translateTheme(newTheme) {
  return ALL_THEMES.find(e => e.id === newTheme);
}
