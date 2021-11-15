interface Values {
    height: number;
    weight: number;
}

 const parseArguments = (args: Array<string>): Values => {
    if (args.length < 2) throw new Error('Lack of arguments');
    if (args.length > 3) throw new Error('Too much arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values are not numbers!');
    }
}

export const calculateBmi = (height: number, weight: number) => {
    const heightM = height / 100
    const bmi = weight / (heightM * heightM)
   if (bmi >= 25) {
    return `Overweight (${Math.round(bmi)})`;
   }
    else if (bmi >= 18.5 ) {
       return `Normal (${Math.round(bmi)})`;
   } else if ( bmi < 18.5) {
       return `Underweight (${Math.round(bmi)})`;
   } 
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = "Something happened"
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage);
}