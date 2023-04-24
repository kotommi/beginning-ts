interface BMIValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    let nums;
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      nums  = {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
    if (nums.height < 100 || nums.height > 250) {
      throw new Error('Provide height in centimeters');
    }
    if (nums.weight < 10 || nums.weight > 300) {
      throw new Error('Provide weight in kg');
    }
    return nums;
  }

const calculateBmi = (height: number, weight: number):String => {
    const bmi = weight / ((height / 100)**2)
    if (bmi <= 25) {
        return "Normal (healthy weight)"
    }
    if (bmi <= 29) {
        return "Overweight"
    }
    return "Obese"
}
/** 
try {
  const {height, weight} = parseArguments(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result)
} catch (error: unknown) {
  let emsg = "Something broke: ";
  if (error instanceof Error) {
    emsg += error.message;
  }
  console.log(emsg)
}
*/
export {calculateBmi};