// const path = "day4/test.txt"; // path relative to project root
const path = "day4/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

const parseLine = (line: string) => {
  const card = {
    id: 0,
    winningNumbers: [],
    myNumbers: []
  };
  const [id, numbers] = line.split(":");
  card.id = parseInt(id.replace("Card ", ""));
  const [winningNumbers, myNumbers] = numbers.split("|");
  card.winningNumbers = winningNumbers
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => !isNaN(n));
  card.myNumbers = myNumbers
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => !isNaN(n));
  return card;
};
const cards = input.map(parseLine);

// find the winning numbers we have (numbers that are in both winningNumbers and myNumbers), and add them to the card object as a new property "winners"
const cardsWithWinners = cards.map((card) => {
  const winners = card.winningNumbers.filter((n) => card.myNumbers.includes(n));
  return { ...card, winners };
});

// compute score
// score is : 2 ** (number of winners - 1)
const cardsWithScore = cardsWithWinners.map((card) => {
  const score = Math.floor(2 ** (card.winners.length - 1));
  return { ...card, score };
});
// Part 1
// line example: Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// we need to parse the line into a card object
// card object example: { id: 1, winningNumbers: [41, 48, 83, 86, 17], myNumbers: [83, 86, 6, 31, 17, 9, 48, 53] }
const part1 = () => {
  const totalScore = cardsWithScore.reduce((acc, card) => {
    return acc + card.score;
  }, 0);

  console.log(totalScore);
  return totalScore;
};

// part1(); // 32609

// Part 2
const part2 = () => {
  // in part2, instead of giving a score, a winning card give a copy of the next card, up to the the number of winners
  // if there are 3 winners, the card will give 1 copy of the next 3 cards
  // it does compound, so we need to parse the cards in order
  // let's add a property "cardAmount" to the card object to keep track of how many copy of this card we have
  const cardsWithAmount = cardsWithScore.map((card) => {
    const cardAmount = 1;
    return { ...card, cardAmount };
  });

  for (const card of cardsWithAmount) {
    for (let i = 0; i < card.winners.length; i++) {
      cardsWithAmount[card.id + i].cardAmount += card.cardAmount;
    }
  }

  console.log(cardsWithAmount);

  // the total score is the number of total cards we have
  const totalScore = cardsWithAmount.reduce((acc, card) => {
    return acc + card.cardAmount;
  }, 0);
  console.log(totalScore);
  return totalScore;
};

part2(); // 14624680
