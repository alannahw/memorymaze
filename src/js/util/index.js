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
  const val = searchValue.toLowerCase();
  let filtered = [];
  folders.forEach(f => {
    let listMatches = f.lists.filter(l => {
      let itemMatches = [];
      l.items.forEach(i => {
        if (
          i.side1.toLowerCase().includes(val) ||
          i.side2.toLowerCase().includes(val)
        ) {
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
export function editListInFolder(
  folderArray,
  listId,
  property,
  value,
  folderId
) {
  let folders = [];
  folderArray.forEach(f => {
    if (folderId === f.id) {
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
    } else {
      folders.push({ ...f });
    }
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

export function getDefaultFolder() {
  return {
    id: "f_" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
    name: "New Folder",
    lists: []
  };
}

export function getDefaultList() {
  return {
    id: "l_" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
    name: "New List",
    "date-created": new Date(),
    theme: "themeIndia",
    scores: [],
    items: [
      {
        id:
          "i_" +
          (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
        side1: "",
        side2: "",
        level: 0
      }
    ]
  };
}
export function getDefaultItem() {
  return {
    id: "i_" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
    side1: "",
    side2: "",
    level: 0
  };
}

export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

// a little function to help us with reordering the result
export function reorderMap(array, source, destination) {
  const current = array.find(i => i.id === source.droppableId);
  const next = array.find(i => i.id === destination.droppableId);
  const target = current.lists[source.index];

  if (source.droppableId === destination.droppableId) {
    const result = array.map(i => {
      if (i === current) {
        return {
          ...i,
          lists: reorder(i.lists, source.index, destination.index)
        };
      } else {
        return i;
      }
    });
    return result;
  } else {
    // remove from original
    current.lists.splice(source.index, 1);
    // insert into next
    next.lists.splice(destination.index, 0, target);
    // map changed lists into whole array
    let result = array.map(i => {
      if (i.id === current.id) {
        return {
          ...i,
          items: current.items
        };
      } else if (i.id === next.id) {
        return {
          ...i,
          items: next.items
        };
      } else {
        return i;
      }
    });
    return result;
  }
}
