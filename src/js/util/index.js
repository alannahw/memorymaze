import React from "react";

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
export function LightenDarkenColor(col, amt) {
  let usePound = false;

  if (col[0] === "#") {
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

export function filterLists(searchValue, folders) {
  let filtered = [];
  folders.forEach(f => {
    let listMatches = f.lists.filter(l => {
      let itemMatches = [];
      l.items.forEach(i => {
        if (i.side1.includes(searchValue) || i.side2.includes(searchValue)) {
          itemMatches.push([i]);
        }
      });
      return itemMatches[0] ? true : false;
    });
    if (listMatches[0]) {
      filtered.push({ ...f, lists: listMatches });
    }
  });
  return filtered;
}

export function editItemPropertyInArray(array, id, property, value) {
  const newArray = array.map(i => {
    if (i.id === id) {
      return {
        ...i,
        [property]: value
      };
    } else {
      return i;
    }
  });
  return newArray;
}
export function findListInFolder(folderArray, listId) {
  let list = {};
  folderArray.forEach(f => {
    const match = f.lists.find(l => l.id === listId);
    if (match) {
      list = match;
    }
  });
  return list;
}
export function editListInFolder(folderArray, listId, property, value) {
  let folders = [];
  folderArray.forEach(f => {
    const lists = f.lists.map(l => {
      if (l.id === listId) {
        return {
          ...l,
          [property]: value
        };
      } else {
        return l;
      }
    });
    folders.push({ ...f, lists });
  });
  return folders;
}
export function deleteItemFromArray(array, itemId) {
  const copy = array.slice();
  const item = copy.find(i => i.id === itemId);
  if (item) {
    const index = copy.indexOf(item);
    copy.splice(index, 1);
  }
  return copy;
}

export const DEFAULT_LIST = {
  id: "l_" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
  name: "New List",
  "date-created": new Date(),
  theme: "themeIndia",
  scores: [],
  items: [
    {
      id:
        "i_" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      side1: "",
      side2: "",
      level: 0
    }
  ]
};
export const DEFAULT_ITEM = {
  id: "i_" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
  side1: "",
  side2: "",
  level: 0
};

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
export const THEME_PINEAPPLE = {
  id: "themePineapple",
  name: "Pineapple",
  main: "#fec555",
  main2: LightenDarkenColor("#fec555", 15),
  main3: LightenDarkenColor("#fec555", 30),
  second: "#16b688",
  third: "#f48044",
  bg: "#06323a",
  bg2: LightenDarkenColor("#06323a", 15),
  bg3: LightenDarkenColor("#06323a", 30),
  light: "#fff"
};
export const ALL_THEMES = [THEME_INDIA, THEME_OCEAN, THEME_PINEAPPLE];

export function translateTheme(newTheme) {
  return ALL_THEMES.find(e => e.id === newTheme);
}
