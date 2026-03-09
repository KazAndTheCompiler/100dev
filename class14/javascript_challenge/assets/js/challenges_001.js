// Challenges 1-12 (JS)

function evenNumbers(max = 10) {
  const out = [];
  for (let i = 0; i <= max; i += 2) out.push(i);
  return out;
}

function multiplicationTable(n = 10) {
  return Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => (r + 1) * (c + 1))
  );
}

function kmToMiles(km) {
  return km * 0.621371;
}

function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function sumRow(table, rowIndex) {
  return (table[rowIndex] || []).reduce((a, b) => a + b, 0);
}

function sumColumn(table, colIndex) {
  return table.reduce((sum, row) => sum + (row[colIndex] ?? 0), 0);
}

function reverseArray(arr) {
  return [...arr].reverse();
}

function sortAscending(arr) {
  return [...arr].sort((a, b) => a - b);
}

function filterNegatives(arr) {
  return arr.filter((n) => n >= 0);
}

function removeSpaces(str) {
  return str.replace(/\s+/g, "");
}

function isDivisibleBy10(n) {
  return n % 10 === 0;
}

function countVowels(str) {
  const m = str.match(/[aeiou]/gi);
  return m ? m.length : 0;
}

function maxInArray(arr) {
  return Math.max(...arr);
}

function isPalindrome(str) {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized === [...normalized].reverse().join("");
}

// demo export for browser
window.challengeDemo = {
  evenNumbers,
  multiplicationTable,
  kmToMiles,
  sumArray,
  sumRow,
  sumColumn,
  reverseArray,
  sortAscending,
  filterNegatives,
  removeSpaces,
  isDivisibleBy10,
  countVowels,
  maxInArray,
  isPalindrome,
};
