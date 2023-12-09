// const path = "day9/test.txt"; // path relative to project root
const path = "day9/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

const sequences = input.map((line) =>
  line.split(" ").map((n) => parseInt(n, 10))
);

const getSequenceDifferences = (sequence: number[]) => {
  const differences = [];
  for (let i = 1; i < sequence.length; i++) {
    differences.push(sequence[i] - sequence[i - 1]);
  }
  return differences;
};

const allEqual = (arr: number[]) => arr.every((v) => v === arr[0]);

const getNextNumber = (sequence: number[], differences: number[]) => {
  //   if (sequence.length !== differences.length + 1)
  //     throw new Error("Sequence or differences are invalid");
  // ex: seq = [1, 2, 3, 4, 5], diff = [1, 1, 1, 1]
  // next = 5 + 1 = 6
  const lastNumber = sequence[sequence.length - 1];
  const lastDifference = differences[differences.length - 1];
  return lastNumber + lastDifference;
};

const displaySequenceAndDifferences = (steps: number[][]) => {
  steps.forEach((step, i) => {
    console.log(" ".repeat(i) + step.join(" "));
  });
};
const computeNextNumber = (sequence: number[]) => {
  const steps: number[][] = [sequence];
  while (!allEqual(steps[steps.length - 1])) {
    const nextStep = getSequenceDifferences(steps[steps.length - 1]);
    steps.push(nextStep);
  }
  steps[steps.length - 1].push(steps[steps.length - 1][0]);

  for (let i = steps.length - 2; i >= 0; i--) {
    const diff = steps[i + 1];
    const seq = steps[i];
    const nextNumber = getNextNumber(seq, diff);
    steps[i].push(nextNumber);
  }
  displaySequenceAndDifferences(steps);
  return steps[0][steps[0].length - 1];
};

const part1 = () => {
  let res = 0;
  for (const sequence of sequences) {
    res += computeNextNumber(sequence);
  }
  console.log(res);
  return res;
};

// part1(); // 2075724761

const part2 = () => {
  let res = 0;
  for (const sequence of sequences) {
    res += computeNextNumber(sequence.reverse());
  }
  console.log(res);
  return res;
};

part2(); // 1072
