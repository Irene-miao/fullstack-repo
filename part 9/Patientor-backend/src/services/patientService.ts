import {patientEntries, patients } from '../../data/patients';
import { Patient , PatientEntry, NewPatientEntry } from '../types';
import { v4 as uuidv4} from 'uuid';


const getEntries = (): PatientEntry[] => {
    return patients;
};

const getPatientEntries = (): Patient[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const findById = (id: string): PatientEntry | undefined => {
    let entry = patientEntries.find(p => p.id === id);
    if (entry?.hasOwnProperty('entries') === false) {
        entry = {
            ...entry, entries: [],
        } as PatientEntry;
  
    }
    return entry;
};


const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
       ...entry
    }
    console.log(newPatientEntry);
    patientEntries.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient,
    findById,
    getPatientEntries
}