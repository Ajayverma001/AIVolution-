const numbers = [10, 25, 5, 60, 45];
let highest = numbers[0];

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > highest) {
        highest = numbers[i];
    }
}

console.log("Highest value is:", highest);