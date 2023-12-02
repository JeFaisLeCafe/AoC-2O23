// load input from input.txt
// const path = "day2/test.txt"; // path relative to project root
const path = "day2/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

// each line is a game
// we need to filter out the games with number of reds, greens and blues > to the max number of reds, greens and blues
// line example: "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
// Part 1
const part1 = () => {
  // for each line, map the line to an object {game: number, red: number, green: number, blue: number} with the max number of reds, greens and blues
  const games = input.map((line, i) => {
    const game = i + 1;
    const reds = [...line.matchAll(/(\d+) red/g)];
    const greens = [...line.matchAll(/(\d+) green/g)];
    const blues = [...line.matchAll(/(\d+) blue/g)];
    const maxRed = Math.max(...reds.map((red) => Number(red[1])));
    const maxGreen = Math.max(...greens.map((green) => Number(green[1])));
    const maxBlue = Math.max(...blues.map((blue) => Number(blue[1])));

    return { game, maxRed, maxGreen, maxBlue };
  });
  // filter out the games with number of reds, greens and blues > to the max number of reds, greens and blues
  console.log(games);
  const filteredGames = games.filter((game) => {
    return (
      game.maxRed <= MAX_RED &&
      game.maxGreen <= MAX_GREEN &&
      game.maxBlue <= MAX_BLUE
    );
  });
  // sum the valid game numbers
  const sum = filteredGames.reduce((acc, game) => acc + game.game, 0);
  console.log("Part 1: ", sum);
  return sum;
};

// part1(); // 2439

// Part 2
const part2 = () => {
  // for each line, map the line to an object {game: number, red: number, green: number, blue: number} with the max number of reds, greens and blues
  const games = input.map((line, i) => {
    const game = i + 1;
    const reds = [...line.matchAll(/(\d+) red/g)];
    const greens = [...line.matchAll(/(\d+) green/g)];
    const blues = [...line.matchAll(/(\d+) blue/g)];
    const maxRed = Math.max(...reds.map((red) => Number(red[1])));
    const maxGreen = Math.max(...greens.map((green) => Number(green[1])));
    const maxBlue = Math.max(...blues.map((blue) => Number(blue[1])));

    return { game, maxRed, maxGreen, maxBlue };
  });
  // find the "power" of each game, which is: maxRed * maxGreen * maxBlue
  const gamesWithPower = games.map((game) => {
    const power = game.maxRed * game.maxGreen * game.maxBlue;
    return { ...game, power };
  });
  // sum the valid game numbers
  const sum = gamesWithPower.reduce((acc, game) => acc + game.power, 0);
  console.log("Part 2: ", sum);
  return sum;
};

part2(); // 63711
