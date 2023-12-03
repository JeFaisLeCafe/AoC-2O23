// load input from input.txt

import _ from "lodash";

// const path = "day3/test.txt"; // path relative to project root
const path = "day3/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

interface Part {
  gearPosition?: Position;
  x: number;
  y: number;
  value: number;
  isValid: boolean;
  neighbors: Position[]; // list of positions of the neighbors; will then have to check if, in the neighbors, there is a symbol
}

interface Position {
  x: number;
  y: number;
  symbol: string;
}
// Part 1
const part1 = () => {
  // 2 possible approach:
  // - look for symbols, and compute the numbers around them
  // - look for numbers and check if there is a symbol around them
  // I think the second approach is easier

  // first we need to find if one of the digit is adjacent to a symbol
  // a symbol is anything not a digit and not a dot (.)
  // adjacent means that a symbol is on the left, right, top, bottom or diagonal
  // we can use a regex to find the symbols
  const symbolsRegex = /[^\d.]/;

  // we need to build an array of Parts
  // a Part is an object with :
  // - an array of valid neighbors
  // - a value
  // let's build this array of Parts
  const partialParts: Part[] = [];
  // we need to loop through the input
  for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      // if the char is a digit, we need to check if there is a symbol around it
      if (/\d/.test(char)) {
        const part: Part = {
          x,
          y,
          value: parseInt(char),
          isValid: false,
          neighbors: []
        };
        // add all the neighbors to the list of neighbors
        const neighbors: Position[] = [];
        for (let i = -1; i <= 1; i++) {
          const y2 = y + i;
          if (y2 < 0 || y2 >= input.length) continue;
          const line2 = input[y2];
          for (let j = -1; j <= 1; j++) {
            const x2 = x + j;
            if (x2 < 0 || x2 >= line2.length) continue;
            const char2 = line2[x2];
            const neighbor = { x: x2, y: y2, symbol: char2 };
            if (symbolsRegex.test(char2)) {
              part.isValid = true;
            }
            neighbors.push(neighbor);
          }
        }
        part.neighbors = neighbors;
        partialParts.push(part);
      }
    }
  }

  // we now have an array of parts
  // we need to "merge" the parts that are adjacent on the same line

  function mergePartialParts(part1: Part, part2: Part): Part {
    // merge
    const newPart = {
      x: part2.x,
      y: part1.y,
      value: part1.value * 10 + part2.value,
      isValid: part1.isValid || part2.isValid,
      neighbors: _.uniqBy([...part1.neighbors, ...part2.neighbors], (n) => {
        return n.x + "_" + n.y;
      })
    };
    return newPart;
  }

  const parts = [];
  // loop through the partial parts
  for (let i = 0; i < partialParts.length; i++) {
    const part = partialParts[i];
    // if the part is already in the parts, we need to merge it
    const lastPart = parts[parts.length - 1];
    if (lastPart && lastPart.y === part.y && lastPart.x === part.x - 1) {
      // we need to merge
      const newPart = mergePartialParts(lastPart, part);
      parts[parts.length - 1] = newPart;
    } else {
      // we need to add the part to the parts
      parts.push(part);
    }
  }

  const sum = parts.reduce((acc, part) => {
    if (part.isValid) {
      return acc + part.value;
    }
    return acc;
  }, 0);

  console.log("part1", sum);
};

part1(); // 553079

// Part 2
const part2 = () => {
  // 2 possible approach:
  // - look for symbols, and compute the numbers around them
  // - look for numbers and check if there is a symbol around them
  // I think the second approach is easier

  // first we need to find if one of the digit is adjacent to a symbol
  // a symbol is anything not a digit and not a dot (.)
  // adjacent means that a symbol is on the left, right, top, bottom or diagonal
  // we can use a regex to find the symbols

  // in part 2 we only care about the symbol *
  const symbolsRegex = /\*/;

  // we need to build an array of Parts
  // a Part is an object with :
  // - an array of valid neighbors
  // - a value
  // let's build this array of Parts
  const partialParts: Part[] = [];
  // we need to loop through the input
  for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      // if the char is a digit, we need to check if there is a symbol around it
      if (/\d/.test(char)) {
        const part: Part = {
          x,
          y,
          value: parseInt(char),
          isValid: false,
          neighbors: []
        };
        // add all the neighbors to the list of neighbors
        const neighbors: Position[] = [];
        for (let i = -1; i <= 1; i++) {
          const y2 = y + i;
          if (y2 < 0 || y2 >= input.length) continue;
          const line2 = input[y2];
          for (let j = -1; j <= 1; j++) {
            const x2 = x + j;
            if (x2 < 0 || x2 >= line2.length) continue;
            const char2 = line2[x2];
            const neighbor = { x: x2, y: y2, symbol: char2 };
            if (symbolsRegex.test(char2)) {
              part.gearPosition = { x: x2, y: y2, symbol: char2 };
              part.isValid = true;
            }
            neighbors.push(neighbor);
          }
        }
        part.neighbors = neighbors;
        partialParts.push(part);
      }
    }
  }

  // we now have an array of parts
  // we need to "merge" the parts that are adjacent on the same line

  function mergePartialParts(part1: Part, part2: Part): Part {
    // merge
    const newPart = {
      gearPosition: part1.isValid
        ? part1.gearPosition
        : part2.gearPosition
        ? part2.gearPosition
        : undefined,
      x: part2.x,
      y: part1.y,
      value: part1.value * 10 + part2.value,
      isValid: part1.isValid || part2.isValid,
      neighbors: _.uniqBy([...part1.neighbors, ...part2.neighbors], (n) => {
        return n.x + "_" + n.y;
      })
    };
    return newPart;
  }

  const parts = [];
  // loop through the partial parts
  for (let i = 0; i < partialParts.length; i++) {
    const part = partialParts[i];
    // if the part is already in the parts, we need to merge it
    const lastPart = parts[parts.length - 1];
    if (lastPart && lastPart.y === part.y && lastPart.x === part.x - 1) {
      // we need to merge
      const newPart = mergePartialParts(lastPart, part);
      parts[parts.length - 1] = newPart;
    } else {
      // we need to add the part to the parts
      parts.push(part);
    }
  }

  // we need to compute the "gear ratios" => for part having the same gear position, we need to compute the gear ration = value part 1 * value part 2
  // a gear ratio exists only if there are 2 parts with the same gear position

  const gearRatios = [];
  for (let i = 0; i < parts.length; i++) {
    const part1 = parts[i];
    if (!part1.gearPosition) continue;
    for (let j = i + 1; j < parts.length; j++) {
      const part2 = parts[j];
      if (!part2.gearPosition) continue;
      if (
        part1.gearPosition.x === part2.gearPosition.x &&
        part1.gearPosition.y === part2.gearPosition.y
      ) {
        const gearRatio = part1.value * part2.value;
        gearRatios.push(gearRatio);
      }
    }
  }

  const sum = gearRatios.reduce((acc, gr) => acc + gr, 0);

  console.log("part2", sum);
};

part2(); // 84363105
