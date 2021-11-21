"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatientEntries());
});
patientRouter.get('/:id', (req, res) => {
    const patient = patientService_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
patientRouter.post('/', (req, res) => {
    const { ssn, name, dateOfBirth, gender, occupation } = req.body;
    const newPatientEntry = patientService_1.default.addPatient({
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
    });
    console.log(newPatientEntry);
    res.json(newPatientEntry);
});
exports.default = patientRouter;
