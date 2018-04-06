import React from "react";

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
export function LightenDarkenColor(col, amtstr) {
  let usePound = false;
  const amt = parseInt(amtstr);

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
  if (searchValue) {
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
  } else return folders;
}
export function filterItems(searchVal, listItems) {
  if (searchVal) {
    const val = searchVal.toLowerCase();
    let listMatches = listItems.filter(i => {
      return (
        i.side1.toLowerCase().includes(val) ||
        i.side2.toLowerCase().includes(val)
      );
    });
    return listMatches;
  } else return listItems;
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
export function findListInFolders(folderArray, listId) {
  if (folderArray) {
    let list = {};
    folderArray.forEach(f => {
      const match = f.lists.find(l => l.id === listId);
      if (match) {
        list = match;
      }
    });
    if (list) {
      return list;
    } else return {};
  } else return {};
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

export function getRandomId() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
}

export function getDefaultUser() {
  return {
    id: "u_" + getRandomId(),
    name: "New User",
    email: "",
    password: "",
    folders: [getDefaultFolder()]
  };
}

export function getDefaultFolder() {
  return {
    id: "f_" + getRandomId(),
    name: "New Folder",
    lists: [getDefaultList()]
  };
}

export function getDefaultList() {
  return {
    id: "l_" + getRandomId(),
    name: "New List",
    "date-created": new Date(),
    theme: "themeIndia",
    currentGame: { attemptCount: 0, successCount: 0 },
    scores: null,
    items: [getDefaultItem()]
  };
}
export function getDefaultItem() {
  return {
    id: "i_" + getRandomId(),
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
    const newCurrent = {
      ...current,
      //.splice(source.index, 1);
      lists: current.lists.filter((el, i) => i !== source.index)
    };

    // insert into next
    //next.lists.splice(destination.index, 0, target);
    const newNext = {
      ...next,
      lists: [
        ...next.lists.slice(0, destination.index),
        target,
        ...next.lists.slice(destination.index)
      ]
    };

    // map changed lists into whole array
    let result = array.map(i => {
      if (i.id === newCurrent.id) {
        return {
          ...i,
          lists: newCurrent.lists
        };
      } else if (i.id === newNext.id) {
        return {
          ...i,
          lists: newNext.lists
        };
      } else {
        return i;
      }
    });
    return result;
  }
}

export function retentionFn(s, t) {
  return Math.pow(Math.E, -t / s);
}
export function retentionFnFindTime(s, r) {
  return Math.log(r) * -s;
}

export function getCurveData(startDay, strength, xAxisStart, xAxisEnd) {
  const daySeries = [];
  for (let i = 0; i <= xAxisEnd; i++) {
    daySeries.push(i);
  }
  const data = [];
  daySeries.forEach((t, i) => {
    if (i >= startDay) {
      data.push({
        x: t,
        y: retentionFn(strength * 3, i - startDay)
      });
    }
  });
  const sliceNo = xAxisStart - startDay;
  const sliceIndex = sliceNo < 0 ? 0 : sliceNo;
  return data.slice(sliceIndex);
}

export function getScoreStats(list) {
  const { scores } = list;
  if (scores) {
    const earliest = scores.reduce((a, b) => (a.date < b.date ? a : b)).date;
    const strength = scores.length;
    const latest = scores.reduce((a, b) => (a.date > b.date ? a : b)).date;
    const today = new Date().setHours(0, 0, 0, 0);
    const totalDays = (today - earliest) / 86400000;
    const currCurveDay = (latest - earliest) / 86400000;
    const nextRevisionDay = Math.round(retentionFnFindTime(strength * 3, 0.5));
    return {
      scores: scores,
      earliest: earliest,
      strength: strength,
      latest: latest,
      today: today,
      totalDays: totalDays,
      currCurveDay: currCurveDay,
      nextRevisionDay: nextRevisionDay
    };
  }
}

export function getNextRevisionDate(list) {
  if (list.scores) {
    const stats = getScoreStats(list);
    const daysTill = Math.round(
      stats.nextRevisionDay - (stats.totalDays - stats.currCurveDay)
    );
    return daysTill;
  }
}

export function removeEmptyItems(list) {
  let content = [];
  if (list.items) {
    content = list.items.filter(i => i.side1.length > 0 || i.side2.length > 0);
  }
  return content;
}
