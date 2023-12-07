// const path = "day7/test.txt"; // path relative to project root
const path = "day7/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

const CARDS = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10
};

const CARDS2 = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1, // updated for part 2
  T: 10
};

type HandType =
  | "5kind"
  | "4kind"
  | "fullhouse"
  | "3kind"
  | "2pair"
  | "pair"
  | "highcard";

interface Hand {
  originalCards: string;
  cards: number[];
  bid: number;
  type?: HandType;
  winnings?: number;
}

const HandTypeValue = {
  "5kind": 7,
  "4kind": 6,
  fullhouse: 5,
  "3kind": 4,
  "2pair": 3,
  pair: 2,
  highcard: 1
};

const hands: Hand[] = input.map((line) => {
  const [cards, bid] = line.split(" ");
  return {
    originalCards: cards,
    cards: cards.split("").map((card) => CARDS[card] || parseInt(card)),
    bid: parseInt(bid)
  };
});

const getHandType = (hand: Hand): HandType => {
  const cardCounts = hand.cards.reduce((acc, card) => {
    acc[card] = acc[card] ? acc[card] + 1 : 1;
    return acc;
  }, {} as Record<number, number>);

  const cardCountValues = Object.values(cardCounts);

  if (cardCountValues.includes(5)) {
    return "5kind";
  }

  if (cardCountValues.includes(4)) {
    return "4kind";
  }

  if (cardCountValues.includes(3) && cardCountValues.includes(2)) {
    return "fullhouse";
  }

  if (cardCountValues.includes(3)) {
    return "3kind";
  }

  if (cardCountValues.includes(2) && cardCountValues.length === 3) {
    return "2pair";
  }

  if (cardCountValues.includes(2)) {
    return "pair";
  }

  return "highcard";
};

const isHand1BetterThanHand2 = (hand1: Hand, hand2: Hand): boolean => {
  if (!hand1.type || !hand2.type) {
    throw new Error("Hand must have a type");
  }

  if (hand1.type === hand2.type) {
    for (let i = 0; i < hand1.cards.length; i++) {
      if (hand1.cards[i] > hand2.cards[i]) {
        return true;
      }

      if (hand1.cards[i] < hand2.cards[i]) {
        return false;
      }
    }
  }
  return HandTypeValue[hand1.type] > HandTypeValue[hand2.type];
};

const part1 = () => {
  const handsWithTypes = hands.map((hand) => {
    const type = getHandType(hand);
    return {
      ...hand,
      type
    };
  });

  const orderedHands = handsWithTypes.sort((hand1, hand2) => {
    if (isHand1BetterThanHand2(hand1, hand2)) {
      return 1;
    }

    if (isHand1BetterThanHand2(hand2, hand1)) {
      return -1;
    }

    return 0;
  });

  const handsWithWinnings = orderedHands.map((hand, index) => {
    const winnings = hand.bid * (index + 1);
    return {
      ...hand,
      winnings
    };
  });
  console.log(handsWithWinnings);

  const totalWinnings = handsWithWinnings.reduce((acc, hand) => {
    return acc + hand.winnings;
  }, 0);

  console.log(totalWinnings);

  return totalWinnings;
};

// part1(); // 251545216

const hands2: Hand[] = input.map((line) => {
  const [cards, bid] = line.split(" ");
  return {
    originalCards: cards,
    cards: cards.split("").map((card) => CARDS2[card] || parseInt(card)),
    bid: parseInt(bid)
  };
});

const getHandType2 = (hand: Hand): HandType => {
  // now jokers counts as joker and as all any other card
  const cardCounts = hand.cards.reduce((acc, card) => {
    acc[card] = acc[card] ? acc[card] + 1 : 1;
    if (card === 1) {
      // joker
      for (let i = 2; i <= 14; i++) {
        // ignore the 11 they are joker dupes
        acc[i] = acc[i] ? acc[i] + 1 : 1;
      }
    }
    return acc;
  }, {} as Record<number, number>);

  const cardCountValues = Object.values(cardCounts);

  if (cardCountValues.includes(5)) {
    return "5kind";
  }

  if (cardCountValues.includes(4)) {
    return "4kind";
  }

  if (cardCountValues.includes(3) && cardCountValues.includes(2)) {
    return "fullhouse";
  }

  if (cardCountValues.includes(3)) {
    return "3kind";
  }

  if (cardCountValues.includes(2) && cardCountValues.length === 3) {
    return "2pair";
  }

  if (cardCountValues.includes(2)) {
    return "pair";
  }

  return "highcard";
};

const part2 = () => {
  const handsWithTypes = hands2.map((hand) => {
    const type = getHandType2(hand);
    return {
      ...hand,
      type
    };
  });

  const orderedHands = handsWithTypes.sort((hand1, hand2) => {
    if (isHand1BetterThanHand2(hand1, hand2)) {
      return 1;
    }

    if (isHand1BetterThanHand2(hand2, hand1)) {
      return -1;
    }

    return 0;
  });

  const handsWithWinnings = orderedHands.map((hand, index) => {
    const winnings = hand.bid * (index + 1);
    return {
      ...hand,
      winnings
    };
  });
  console.log(handsWithWinnings);

  const totalWinnings = handsWithWinnings.reduce((acc, hand) => {
    return acc + hand.winnings;
  }, 0);

  console.log(totalWinnings);

  return totalWinnings;
};

part2(); // 251042416 WRONG ???
