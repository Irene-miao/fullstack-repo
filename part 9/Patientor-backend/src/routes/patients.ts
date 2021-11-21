import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';


const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getPatientEntries());
});

patientRouter.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

patientRouter.post('/', (req, res) => {
   try {
       const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);
    console.log(addedEntry);
    res.json(addedEntry);
} catch (error: unknown) {
    let errorMessage = 'Something happened'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
}
});

export default patientRouter;