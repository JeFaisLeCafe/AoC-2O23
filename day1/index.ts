// load input from input.txt
// const path = "day1/test.txt"; // path relative to project root
const path = "day1/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");

// Part 1
// line example: "1aekfj-2j3k4j3"
// we need to retrive the first and last numbers in each line and convert them to numbers
// if only one number is present, then first and last are the same
// we can use regex to find the first and last numbers
// regex: /^\d|\d(?=\D*$)/g

const part1 = () => {
  const numbers = input.map((line) => {
    let firstDigitMatch = line.match(/\d/); // Matches the first digit in the string
    let lastDigitMatch = line.match(/\d(?![^\d]*\d)/); // Matches the last digit in the string

    let firstDigit = firstDigitMatch ? firstDigitMatch[0] : 0;
    let lastDigit = lastDigitMatch ? lastDigitMatch[0] : firstDigit;

    return Number(`${firstDigit + lastDigit}`);
  });
  console.log("numbers", numbers);
  const sum = numbers.reduce((acc, nb) => acc + nb, 0);
  console.log("Part 1: ", sum);
  return sum;
};

// part1(); // 55971

// Part 2
// line example: "7pqrstsixteen" -> 7 is the first number, 6 is the second number (number between 1 and 9)
// we need to retrive the first and last numbers in each line and convert them to numbers
// here numbers can be either a digit or the word "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
// first, we'll go through the input and replace the words with their corresponding digit, just adding also the first letter and last letter of the written digit around the number -> "seven" -> "s7n"
// then we'll use the same regex as in part 1 to find the first and last numbers

const part2 = () => {
  const numbers = input.map((line) => {
    let lineWithDigits = line
      .replace(/one/g, "o1e")
      .replace(/two/g, "t2o")
      .replace(/three/g, "t3e")
      .replace(/four/g, "f4r")
      .replace(/five/g, "f5e")
      .replace(/six/g, "s6x")
      .replace(/seven/g, "s7n")
      .replace(/eight/g, "e8t")
      .replace(/nine/g, "n9e");

    let firstDigitMatch = lineWithDigits.match(/\d/); // Matches the first digit in the string
    let lastDigitMatch = lineWithDigits.match(/\d(?![^\d]*\d)/); // Matches the last digit in the string

    let firstDigit = firstDigitMatch ? firstDigitMatch[0] : 0;
    let lastDigit = lastDigitMatch ? lastDigitMatch[0] : firstDigit;

    return Number(`${firstDigit + lastDigit}`);
  });
  console.log("numbers", numbers);
  const sum = numbers.reduce((acc, nb) => acc + nb, 0);
  console.log("Part 2: ", sum);
  return sum;
};

part2(); // 54699
