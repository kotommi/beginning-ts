interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface exValues {
    target: number;
    hours: number[];
}

const parseArgs = (args: string[]): exValues => {
    if (args.length < 4) {
        throw new Error("Too few arguments");
    }
    const target = Number(args[2]);
    if (isNaN(target)) {
        throw new Error("Target hours must be a number");
    }
    if (target < 0) {
        throw new Error("Target hours cant be negative");
    }
    const hours = args.slice(3).map(Number);
    if(hours.some(isNaN)) {
        throw new Error("Training hours must be a list of numbers");
    }
    console.log(hours.find(h => isNaN(h)));
    if (hours.find(h => h < 0)) {
        throw new Error("Training hours can't be negative");
    }
    return {target, hours};
};

const calculateExercises = (target: number, hours: number[]): Result => {
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
};

export {parseArgs, calculateExercises};
/*
try {
    console.log("hi");
    const {target, hours} = parseArgs(process.argv);
    const result = calculateExercises(target, hours);
    console.log(result);
  } catch (error: unknown) {
    let emsg = "Something broke: ";
    if (error instanceof Error) {
      emsg += error.message;
    }
    console.log(emsg);
  }*/