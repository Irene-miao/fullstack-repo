export interface Result {
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
    givenTarget: number;
}

 const Arguments = (args: Array<string>): Training => {
    if (args.length < 4) throw new Error('Period too short');
    if (args.length > 32) throw new Error('There are only 31 days in a month');

   
        if (args) {
            return {
                hours: [Number(args[0]),Number(args[1]), Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]), Number(args[6])],
                givenTarget: Number(args[7])
            };
        } else {
            throw new Error('parameters missing');
        }
    };
    



 export const calculateExercises = (hours: Array<number>, givenTarget: number): Result => {
    const trainingDays = hours.filter(h => h !== 0).length;
    const sum = hours.reduce((a, b) => a+b);
    const result = sum / trainingDays;

        if (givenTarget < 3) {
            return {
                numberOfDays: hours.length,
                numberOfTrainingDays: trainingDays,
                originalTargetValue: givenTarget,
                calculatedAverageTime: result,
                isTargetMet: result > givenTarget,
                rating: 3,
                ratingDescription: 'You hit traget'
                    };
                   } else if (givenTarget < 2) {
                return {
                    numberOfDays: hours.length,
                    numberOfTrainingDays: trainingDays,
                    originalTargetValue: givenTarget,
                    calculatedAverageTime: result,
                    isTargetMet: result > givenTarget,
                    rating: 2,
                    ratingDescription: 'Almost there'
                        };
                    } else if ( givenTarget < 1 ) {
            return   {
                numberOfDays: hours.length,
                numberOfTrainingDays: trainingDays,
                originalTargetValue: givenTarget,
                calculatedAverageTime: result,
                isTargetMet: result < givenTarget,
                rating: 1,
                ratingDescription: 'Work harder'
                    };

                } else  {
                throw new Error('Target from 1 to 3 only or missing');
            } 
    };


try {
        const { hours, givenTarget } = Arguments(process.argv);
        console.log(calculateExercises(hours, givenTarget));
} catch (error: unknown) {
    let errorMessage = 'Something happened';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
