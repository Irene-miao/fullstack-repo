

const calculateBmi = (height: number, weight: number) => {
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
    console.log(calculateBmi(180, 74))
} catch (error: unknown) {
    let errorMessage = "Something happened"
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage);
}