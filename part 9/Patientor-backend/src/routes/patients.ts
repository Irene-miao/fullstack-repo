import express from 'express';
import patientService from '../services/patientService';

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
    const {ssn, name, dateOfBirth, gender, occupation} = req.body;
    const newPatientEntry = patientService.addPatient({
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
    })
    console.log(newPatientEntry);
    res.json(newPatientEntry);
});

export default patientRouter;