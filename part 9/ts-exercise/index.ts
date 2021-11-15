import express from 'express';
const app = express();
import {calculateBmi} from './bmiCalculator';


app.get('/hello', (_req, res) => {
res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    console.log(req.query)
    let height = req.query.height;
    let weight = req.query.weight;
    if (height && weight) {
       return res.json({
            'height': height,
            'weight': weight,
            'bmi': calculateBmi(Number(height), Number(weight))
        });
    } else {
        return res.status(401).json({ error: "malformatted parameters"});
    }  
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})