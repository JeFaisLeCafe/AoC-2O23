// const path = "day5/test.txt"; // path relative to project root
const path = "day5/input.txt"; // path relative to project root
const file = Bun.file(path);
const text = await file.text();
const input = text.split("\n");
