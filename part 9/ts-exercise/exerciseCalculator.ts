interface Result {
    numberOfDays: number;
    numberOfTrainingDays: number;
    originalTargetValue: number;
    calculatedAverageTime: number;
    isTargetMet: boolean;
    rating: number;
    ratingDescription: string;
}

const calculateExercises = (hours: Array<number>, rating: number): Result => {
    const trainingDays = hours.filter(h => h !== 0).length;
    const sum = hours.reduce((a, b) => a+b);
    const target = sum / trainingDays;

        switch (rating) {
            case 1:
            return {
                numberOfDays: 7,
                numberOfTrainingDays: trainingDays,
                originalTargetValue: 2,
                calculatedAverageTime: target,
                isTargetMet: target === 2,
                rating: rating,
                ratingDescription: 'Work harder'
                    };
            case 2:
                return {
                    numberOfDays: 7,
                    numberOfTrainingDays: trainingDays,
                    originalTargetValue: 2,
                    calculatedAverageTime: sum / trainingDays,
                    isTargetMet: (sum / trainingDays) === 2,
                    rating: rating,
                    ratingDescription: 'Almost there'
                        };
            case 3: 
            return   {
                numberOfDays: 7,
                numberOfTrainingDays: trainingDays,
                originalTargetValue: 2,
                calculatedAverageTime: sum / trainingDays,
                isTargetMet: (sum / trainingDays) === 2,
                rating: rating,
                ratingDescription: 'Hit target'
                    };  
            default:
                throw new Error('Rating from 1 to 3 only');
            } 
    }

try {
        console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
    let errorMessage = 'Something happened'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
