import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const PORT = 3001;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('Pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});