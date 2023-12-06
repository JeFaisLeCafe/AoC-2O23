// const path = "day6/test.txt"; // path relative to project root
const path = "day6/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

// Part 1
/*
input example: 
Time:      7  15   30
Distance:  9  40  200
*/

interface Race {
  time: number;
  distance: number;
}

function getRacesToBeat() {
  const racesToBeat: Race[] = [];
  // get all numbers of line 1
  const times = input[0]
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => !isNaN(n));

  // get all numbers of line 2
  const distances = input[1]
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => !isNaN(n));

  // create an array of objects with time and distance
  for (let i = 0; i < times.length; i++) {
    racesToBeat.push({ time: times[i], distance: distances[i] });
  }

  return racesToBeat;
}

interface MyRace {
  speed: number;
  distance: number;
  time: number;
}

interface Answer {
  race: Race;
  solutions: MyRace[];
}

function computeMyOptionsForARace(race: Race): MyRace[] {
  // return an array of VALID options to beat the race
  const myOptions: MyRace[] = [];
  for (let i = 1; i < race.time - 1; i++) {
    if (i > race.distance / (race.time - i)) {
      const validRace: MyRace = {
        speed: i,
        distance: i * (race.time - i),
        time: race.time
      };
      myOptions.push(validRace);
    }
  }

  return myOptions;
}

const part1 = () => {
  const racesToBeat = getRacesToBeat();
  const answers: Answer[] = racesToBeat.map((r) => ({
    race: r,
    solutions: []
  }));
  for (const race of answers) {
    const options = computeMyOptionsForARace(race.race);
    race.solutions = options;
  }

  const res = answers.reduce((acc, race) => (acc *= race.solutions.length), 1);
  console.log(res);
  return res;
};

// part1(); // 138915

// Part 2
function getRaceToBeat() {
  const races = getRacesToBeat();
  const time = parseInt(races.map((r) => r.time).join(""));
  const distance = parseInt(races.map((r) => r.distance).join(""));
  return { time, distance };
}
const part2 = () => {
  const raceToBeat = getRaceToBeat();
  console.log(raceToBeat);

  const options = computeMyOptionsForARace(raceToBeat);
  console.log(options.length);
  return options.length;
};

part2(); // 27340847

// t : temps total
// t0: temps d'attente
// t1: temps de course

// d = v*t1
// t1 = t-t0;
// v = t0;
// v = t-t1

// si t = 7 et d = 9;

// 9 = v * (7 - v)
// 9 = 7v - v^2
// v^2 - 7v + 9 = 0
// v = 7 +- sqrt(49 - 36)
// v = 7 +- sqrt(13)
// v = 7 + sqrt(13) ou v = 7 - sqrt(13)
// v = 10.6 ou v = 3.4

// or 0 < v < t
// donc v = 3.4 // optimum

// on ne cherche pas l'optimum mais à partir de quel moment on peut battre le record

// v * t1 >= d;
// v * (t-t0) >= d;
// v * t - v * t0 >= d;
// v * t >= d + v * t0;
// v >= (d + v * t0) / t;
// v >= d/t + v * t0/t;
// v - v * t0/t >= d/t;
// v * (1 - t0/t) >= d/t;
// v >= d/t / (1 - t0/t);
// v >= d/t / ((t-t0)/t);
// v >= d/(t-t0);

// (t-t0) * v >= d;
// or v = t0;
// t*t0 - t0*t0 >= d;
// t*t0 >= d + t0*t0;
// t0 >= (d + t0*t0) / t;
// t0 >= d/t + t0*t0/t;
// t0 - t0*t0/t >= d/t;
// t0 * (1 - t0/t) >= d/t;
// t0 >= d/t / (1 - t0/t);
// t0 >= d/t / ((t-t0)/t);
// t0 >= d/(t-t0); ----------------->>> SOLUTION

// for t0 = 1: 1 >= 9/6 = 1.5 ? false
// for t0 = 2: 2 >= 9/5 = 1.8 ? true
// for t0 = 3: 3 >= 9/4 = 2.25 ? true
// for t0 = 4: 4 >= 9/3 = 3 ? true
// for t0 = 5: 5 >= 9/2 = 4.5 ? true
// for t0 = 6: 6 >= 9/1 = 9 ? false
