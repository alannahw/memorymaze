import React from "react";

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
export function LightenDarkenColor(col, amt) {
  let usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

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
  main2: LightenDarkenColor("#e07762", 15),
  main3: LightenDarkenColor("#e07762", 30),
  second: "#fbb664",
  third: "#7b73b5",
  bg: "#30302f",
  bg2: LightenDarkenColor("#30302f", 15),
  bg3: LightenDarkenColor("#30302f", 30),
  light: "#fff"
};
export const THEME_OCEAN = {
  id: "themeOcean",
  name: "Ocean",
  main: "#3b7aa9",
  main2: LightenDarkenColor("#3b7aa9", 15),
  main3: LightenDarkenColor("#3b7aa9", 30),
  second: "#52c1c9",
  third: "#e5696b",
  bg: "#2c2c3a",
  bg2: LightenDarkenColor("#2c2c3a", 15),
  bg3: LightenDarkenColor("#2c2c3a", 30),
  light: "#fff"
};
export const ALL_THEMES = [THEME_INDIA, THEME_OCEAN];

export function translateTheme(newTheme) {
  return ALL_THEMES.find(e => e.id === newTheme);
}
