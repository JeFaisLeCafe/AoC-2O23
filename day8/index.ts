// const path = "day8/test.txt"; // path relative to project root
const path = "day8/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

const MAX_STEPS_TEST = 1_000_000;

interface Node {
  L: string;
  R: string;
  id: string;
}
interface Nodes {
  [key: string]: Node;
}

const instructions = input[0].split("");
let nodes: Nodes = {};
input.slice(2).forEach((line) => {
  // find the strings
  const strs = line.match(/(\w+)/g);
  const id = strs[0];
  const L = strs[1];
  const R = strs[2];
  nodes[id] = { id, L, R };
});

const displayPath = (path: Node[]) => {
  const path_str = path.map((p) => p.id).join(" -> ");
  console.log(path_str);
};

const displayPaths = (paths: Node[][]) => {
  paths.forEach((path) => displayPath(path));
};

const part1 = () => {
  console.log(nodes);
  const path = [nodes["AAA"]];
  let current = nodes["AAA"];
  while (current.id !== "ZZZ") {
    for (const i of instructions) {
      if (i === "L") {
        current = nodes[current.L];
      } else {
        current = nodes[current.R];
      }
      path.push(current);
      if (current.id === "ZZZ") {
        break;
      }
    }
  }

  displayPath(path);
  console.log("length ", path.length - 1);
};

// part1(); // 24253

const part2Optimised = (isTest = false) => {
  const tick = performance.now();
  const endingNodesSet = new Set(
    Object.keys(nodes).filter((n) => n.endsWith("Z"))
  );
  let currentNodes = Object.keys(nodes)
    .filter((n) => n.endsWith("A"))
    .map((id) => nodes[id]);
  let steps = 0;
  let hasArrived = false;

  while (!hasArrived || (isTest && steps < MAX_STEPS_TEST)) {
    const instruction = instructions[steps % instructions.length];
    hasArrived = true;

    for (let i = 0; i < currentNodes.length; i++) {
      const nextNodeId = currentNodes[i][instruction];
      currentNodes[i] = nodes[nextNodeId];

      if (!endingNodesSet.has(currentNodes[i].id)) {
        hasArrived = false;
      }
    }

    steps++;
  }
  const tock = performance.now();
  console.log("time", tock - tick);
  console.log("steps", steps);
  return tock - tick;
};

const part2 = (isTest = false) => {
  const tick = performance.now();
  const startingNodesId = Object.keys(nodes).filter((n) => n[2] === "A");
  let hasArrived = false;
  let currentNodes = startingNodesId.map((id) => nodes[id]);
  let steps = 0;

  while (!hasArrived || (isTest && steps < MAX_STEPS_TEST)) {
    for (const instruction of instructions) {
      steps++;
      let nextNodes = [];

      for (let i = 0; i < startingNodesId.length; i++) {
        // i is the index of the path we are on
        const node = currentNodes[i];
        const nextNodeId = node[instruction];
        const nextNode = nodes[nextNodeId];
        nextNodes.push(nextNode);
      }

      currentNodes = nextNodes;

      hasArrived = currentNodes.every((n) => n.id.endsWith("Z"));
      if (hasArrived) {
        break;
      }
    }
  }
  const tock = performance.now();
  console.log("time", tock - tick);
  console.log("steps", steps);
  return tock - tick;
};

function compareSpeeds() {
  const times = 100;
  let sumPart2 = 0;
  let sumPart2Optimised = 0;
  for (let i = 0; i < times; i++) {
    sumPart2 += part2(true);
    sumPart2Optimised += part2Optimised(true);
  }
  console.log("average part2", sumPart2 / times);
  console.log("average part2Optimised", sumPart2Optimised / times);
}

// compareSpeeds();
// average part2 104.29280498000018
// average part2FurtherOptimised 159.87224425000014

part2();
