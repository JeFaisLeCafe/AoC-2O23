// const path = "day8/test.txt"; // path relative to project root
const path = "day8/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

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

const part2 = () => {
  const startingNodesId = Object.keys(nodes).filter((n) => n[2] === "A");
  const endingNodesId = Object.keys(nodes).filter((n) => n[2] === "Z");
  let hasArrived = false;
  let currentNodes = startingNodesId.map((id) => nodes[id]);
  let steps = 0;

  while (!hasArrived) {
    for (const instruction of instructions) {
      console.log("STEP N°", steps);
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

      hasArrived = currentNodes.every((n) => endingNodesId.includes(n.id));
      if (hasArrived) {
        break;
      }
    }
  }
  console.log("steps", steps);
};

part2();
