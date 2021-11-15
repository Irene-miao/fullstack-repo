interface Result {
    numberOfDays: number;
    numberOfTrainingDays: number;
    originalTargetValue: number;
    calculatedAverageTime: number;
    isTargetMet: boolean;
    rating: number;
    ratingDescription: string;
}

interface Training {
    hours: Array<number>;
    rating: number;
}

const arguments = (args: Array<string>): Training => {
    if (args.length < 4) throw new Error('Period too short');
    if (args.length > 32) throw new Error('There are only 31 days in a month');

   

            return {
                hours: [Number(args[2]),Number(args[3]), Number(args[4]), Number(args[5]), Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9]), Number(args[10])],
                rating: Number(args[11])
            }
      
    }
    



const calculateExercises = (hours: Array<number>, rating: number): Result => {
    const trainingDays = hours.filter(h => Number(h) !== 0).length;
    const sum = hours.reduce((a, b) => a+b);
    const target = Number(sum)/ trainingDays;

        switch (rating) {
            case 1:
            return {
                numberOfDays: hours.length,
                numberOfTrainingDays: trainingDays,
                originalTargetValue: 2,
                calculatedAverageTime: target,
                isTargetMet: target === 2,
                rating: rating,
                ratingDescription: 'Work harder'
                    };
            case 2:
                return {
                    numberOfDays: hours.length,
                    numberOfTrainingDays: trainingDays,
                    originalTargetValue: 2,
                    calculatedAverageTime: target,
                    isTargetMet: target === 2,
                    rating: rating,
                    ratingDescription: 'Almost there'
                        };
            case 3: 
            return   {
                numberOfDays: hours.length,
                numberOfTrainingDays: trainingDays,
                originalTargetValue: 2,
                calculatedAverageTime: target,
                isTargetMet: target === 2,
                rating: rating,
                ratingDescription: 'Hit target'
                    };  
            default:
                throw new Error('Rating from 1 to 3 only');
            } 
    }

try {
        const { hours, rating } = arguments(process.argv);
        console.log(calculateExercises(hours, rating));
} catch (error: unknown) {
    let errorMessage = 'Something happened'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
