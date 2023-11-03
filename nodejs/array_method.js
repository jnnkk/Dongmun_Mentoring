const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(arr.map((item) => item * 2));
console.log(arr.filter((item) => item % 2 === 0));
console.log(arr.forEach((item) => {console.log(item * 2)}));
console.log(arr.every((item) => item > 0));
console.log(arr.some((item) => item > 10));