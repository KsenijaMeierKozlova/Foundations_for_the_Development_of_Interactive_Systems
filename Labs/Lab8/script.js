/*
// Grade Calculator

const grade = prompt("Enter the grade:");

if (grade >= 90) {
    console.log("A");
} else if (90 > grade && grade >= 80) {
    console.log("B");
} else if (80 > grade && grade >= 70) {
    console.log("C");
} else if (70 > grade && grade >= 60) {
    console.log("D");
} else {
    console.log("E");
}
*/

let grades = [50, 89, 75, 84, 99];
let sum = 0;

for (let i = 0; i < 5; i++) {
    sum += grades[i];
}

console.log(sum);

let result = sum / 5;
console.log(result);