// const path = "day10/test.txt"; // path relative to project root
const path = "day10/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n").map((l) => l.split(""));

type PipeSymbol = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";
type Position = {
  x: number;
  y: number;
};
interface Pipe {
  position: Position;
  symbol: PipeSymbol;
  possibleDirections?: Position[];
}

const parsePipes = () => {
  const pipes = [];
  for (let i = 0; i < input.length; i++) {
    // row index, y
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      // col index, x
      const tile = row[j] as PipeSymbol;
      const pipe = {
        position: { x: j, y: i },
        symbol: tile
      } as Pipe;
      const up = {
        // up
        x: j,
        y: Math.max(i - 1, 0)
      };
      const down = {
        // down
        x: j,
        y: Math.min(i + 1, input.length - 1)
      };
      const left = {
        // left
        x: Math.max(0, j - 1),
        y: i
      };
      const right = {
        // right
        x: Math.min(j + 1, row.length - 1),
        y: i
      };
      switch (tile) {
        case ".": {
          pipes.push(pipe);
          break;
        }
        case "-": {
          pipe.possibleDirections = [left, right];
          pipes.push(pipe);
          break;
        }
        case "|": {
          pipe.possibleDirections = [up, down];
          pipes.push(pipe);
          break;
        }
        case "7": {
          pipe.possibleDirections = [left, down];
          pipes.push(pipe);
          break;
        }
        case "F": {
          pipe.possibleDirections = [right, down];
          pipes.push(pipe);
          break;
        }
        case "J": {
          pipe.possibleDirections = [up, left];
          pipes.push(pipe);
          break;
        }
        case "L": {
          pipe.possibleDirections = [up, right];
          pipes.push(pipe);
          break;
        }
      }
    }
  }
  return pipes;
};

// - - J
const findPipe = (pipes: Pipe[], position: Position) => {
  const pipe = pipes.find(
    (p) => p.position.x === position.x && p.position.y === position.y
  );
  if (!pipe) throw "Error ! No pipe found." + JSON.stringify(position);
  return pipe;
};

const findNextPipe = (pipes: Pipe[], path: Pipe[]) => {
  const startPipe = path[path.length - 1];
  // next pipe is at coordinates path[path.length - 1].possibleDirections that is not already in path;
  const pathCoord = path.map((p) => p.position);
  if (startPipe.possibleDirections && startPipe.possibleDirections.length > 0) {
    const isNext1AlreadyWalked = !!pathCoord.find(
      (pc) =>
        pc.x === startPipe.possibleDirections[0].x &&
        pc.y === startPipe.possibleDirections[0].y
    );
    const isNext2AlreadyWalked = pathCoord.find(
      (pc) =>
        pc.x === startPipe.possibleDirections[1].x &&
        pc.y === startPipe.possibleDirections[1].y
    );

    if (!isNext1AlreadyWalked) {
      const nextPipe = findPipe(pipes, startPipe.possibleDirections[0]);
      return nextPipe;
    }
    if (!isNext2AlreadyWalked) {
      const nextPipe = findPipe(pipes, startPipe.possibleDirections[1]);
      return nextPipe;
    }
  }

  return null;
};

const walkThePath = (pipes: Pipe[], start: Position) => {
  const startPipe = findPipe(pipes, start);
  const path = [startPipe];
  let nextPipe = true;
  while (nextPipe) {
    nextPipe = findNextPipe(pipes, path);
    if (nextPipe) path.push(nextPipe);
  }
  return path;
};

const part1 = () => {
  const pipes = parsePipes();
  console.log("pipes", pipes);
  const start = { x: 89, y: 19 }; // need to input it manually
  const path = walkThePath(pipes, start);
  const steps = Math.ceil(path.length / 2);
  console.log("path", path);
  console.log("STEPS", steps);
  return steps;
};

part1(); // 6717
