const studentMarks = [75, 88, 92, 67, 80]; 
let total = 0;
let highest = studentMarks[0];
let lowest = studentMarks[0];

for (let i = 0; i < studentMarks.length; i++) {
    const mark = studentMarks[i];
    total += mark;

    if (mark > highest) highest = mark;
    if (mark < lowest) lowest = mark;
}

const average = total / studentMarks.length;

console.log("Student Marks:", studentMarks);
console.log("Total Marks:", total);
console.log("Average Marks:", average.toFixed(2));
console.log("Highest Marks:", highest);
console.log("Lowest Marks:", lowest);
