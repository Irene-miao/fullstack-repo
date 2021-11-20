import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getPatientEntries());
});

patientRouter.post('/', (_req, res) => {
    res.send('Saving patient data');
});

export default patientRouter;