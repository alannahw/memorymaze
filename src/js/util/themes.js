import React from "react";
import { LightenDarkenColor } from "./";

export const GRADIENT_DARKNESS = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="200"
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
    r="200"
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
    r="200"
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
const india_yellow = "#fbb664";
const india_purple = "#7b73b5";
const india_darkgrey = "#30302f";

export const GRADIENT_INDIA = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="200"
  >
    <stop offset="50%" stopColor={india_red} />
    <stop offset="95%" stopColor={india_yellow} />
  </radialGradient>
);

export const THEME_INDIA = {
  id: "themeIndia",
  name: "India",
  main: india_red,
  second: india_yellow,
  third: india_purple,
  bg: india_darkgrey,
  bg2: LightenDarkenColor(india_darkgrey, 15),
  toolbar: india_purple,
  btntext: "#fff",
  scheme: "+",
  mainSubtle: india_purple,
  mainVibrant: india_yellow,
  mainMiddle: india_red,
  gradient: GRADIENT_INDIA
};

const ocean_blue = "#3b7aa9";
const ocean_teal = "#52c1c9";
const ocean_pink = "#e5696b";
const ocean_darkblue = "#2c2c3a";

export const GRADIENT_OCEAN = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="200"
  >
    <stop offset="50%" stopColor={ocean_blue} />
    <stop offset="95%" stopColor={ocean_teal} />
  </radialGradient>
);

export const THEME_OCEAN = {
  id: "themeOcean",
  name: "Ocean",
  main: ocean_blue,
  second: ocean_teal,
  third: ocean_pink,
  bg: ocean_darkblue,
  bg2: LightenDarkenColor(ocean_darkblue, 15),
  toolbar: ocean_pink,
  btntext: "#fff",
  scheme: "+",
  mainSubtle: ocean_blue,
  mainVibrant: ocean_teal,
  mainMiddle: ocean_pink,
  gradient: GRADIENT_OCEAN
};
const pine_yellow = "#fec555";
const pine_green = "#16b688";
const pine_orange = "#f48044";
const pine_darkteal = "#06323a";

export const GRADIENT_TROPICAL = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="200"
  >
    <stop offset="50%" stopColor={pine_green} />
    <stop offset="95%" stopColor={pine_yellow} />
  </radialGradient>
);

export const THEME_TROPICAL = {
  id: "themeTropical",
  name: "Tropical",
  main: pine_yellow,
  second: pine_orange,
  third: pine_green,
  bg: pine_darkteal,
  bg2: LightenDarkenColor(pine_darkteal, 15),
  toolbar: pine_green,
  btntext: "#fff",
  scheme: "+",
  mainSubtle: pine_green,
  mainVibrant: pine_yellow,
  mainMiddle: pine_orange,
  gradient: GRADIENT_TROPICAL
};

const plain_white = "#f7f7f7";
const plain_lgrey = "#eaebec";
const plain_orange = "#e07762";
const plain_dgrey = "#404041";

export const GRADIENT_PLAIN = (
  <radialGradient
    id="myGradient"
    gradientUnits="userSpaceOnUse"
    cx="0"
    cy="0"
    r="200"
  >
    <stop offset="50%" stopColor={plain_orange} />
    <stop offset="95%" stopColor={plain_orange} />
  </radialGradient>
);

export const THEME_PLAIN = {
  id: "themePlain",
  name: "Plain Please",
  main: plain_white,
  second: plain_lgrey,
  third: plain_orange,
  bg: plain_dgrey,
  bg2: LightenDarkenColor(plain_lgrey, -15),
  toolbar: LightenDarkenColor(plain_lgrey, -45),
  btntext: "#fff",
  scheme: "-",
  mainSubtle: plain_dgrey,
  mainVibrant: plain_orange,
  mainMiddle: plain_orange,
  gradient: GRADIENT_PLAIN
};
export const ALL_THEMES = [
  THEME_INDIA,
  THEME_OCEAN,
  THEME_TROPICAL,
  THEME_PLAIN
];

export function translateTheme(newTheme) {
  return ALL_THEMES.find(e => e.id === newTheme);
}
