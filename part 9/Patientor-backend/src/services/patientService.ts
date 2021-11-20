import patientEntries from '../../data/patients';
import { Patient , PatientEntry } from '../types';



const getEntries = (): PatientEntry[] => {
    return patientEntries;
};

const getPatientEntries = (): Patient[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry,
    getPatientEntries
}