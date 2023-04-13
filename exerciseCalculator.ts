interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
    console.log(process.argv);
    const periodLength = hours.length;
    const trainingDays = hours.filter(n => n > 0).length;
    const average = hours.reduce((acc, n) => acc + n, 0) / periodLength;
    const ratio = average / target;
    let rating = 1;
    if (ratio > 1) {
        rating = 3;
    }
    if (ratio < 1 && ratio > .5) {
        rating = 2;
    }
    const descs = ["Apply yourself","P good", "Good job"];
    const ratingDescription = descs[rating - 1];
    const success = average > target;


    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
}

const arr = [3, 0, 2, 4.5, 0, 3, 1]
const target = 2

console.log(calculateExercises(arr, target))