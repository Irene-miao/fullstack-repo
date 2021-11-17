import express from 'express';
const app = express();

import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    console.log(req.query);
    const height = req.query.height;
    const weight = req.query.weight;
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
       return res.json({
            'height': Number(height),
            'weight': Number(weight),
            'bmi': calculateBmi(Number(height), Number(weight))
        });
    } else {
        return res.status(401).json({ error: "malformatted parameters"});
    }  
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    console.log(daily_exercises, target);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const exercises = [Number(daily_exercises[0]),Number(daily_exercises[1]),Number(daily_exercises[2]),Number(daily_exercises[3]),Number(daily_exercises[4]),Number(daily_exercises[5]),Number(daily_exercises[6])];
    console.log(exercises);
    if (exercises && !isNaN(Number(target))) {

                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const result = calculateExercises(exercises, Number(target));
                console.log(result);
                res.json({result});

    } else {
        return res.status(401).json({ error: "malformatted parameters"});
    }
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});