import { NewPatientEntry, Gender, EntrywithoutId , SickLeave, Discharge, Diagnose, BaseEntry} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth:' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};


const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};


const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};


type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries?: unknown };
//@ts-ignore
export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries} : Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: [],
    };

    return newEntry;
};

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};



const parseSpecialist = (specialist: unknown): string => {
    if (!specialist|| !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};

const parseDescription = (description: unknown): string => {
    if (!description|| !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};

const parseRating = (healthCheckRating: unknown): number  => {
    if (!healthCheckRating|| !isNumber(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

const parseEmployer = (employerName: unknown): string  => {
    if (!employerName|| !isString(employerName)) {
        throw new Error('Incorrect or missing employer name: ' + employerName);
    }
    return employerName;
};

const parseLeave = (sickLeave: SickLeave): SickLeave  => {
    if (!sickLeave) {
        throw new Error('Incorrect or missing sick leave: ' + sickLeave);
    }
    return sickLeave;
};


const parseDischarge = (discharge: Discharge): Discharge => {
    if (!discharge) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;
};

const parseCode = (diagnosisCodes: Diagnose[]): Diagnose[]  => {
    if (!diagnosisCodes) {
        throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
};

export const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
};

type Input = { date: unknown, specialist: unknown, type: never , description: unknown, employerName: unknown, discharge: Discharge, sickLeave: SickLeave, healthCheckRating: unknown, diagnosisCodes: Diagnose[] };

export const toPatientEntry = ({  date, specialist, type, description, employerName, sickLeave, discharge,  healthCheckRating, diagnosisCodes}: 
    Input): EntrywithoutId => {
        
        let entry: Omit<BaseEntry, 'id'> = {
            date: parseDate(date),
            specialist: parseSpecialist(specialist),
            description: parseDescription(description),
            diagnosisCodes: parseCode(diagnosisCodes),
        };

        switch (type) {
            case 'Hospital':
                return {
                    ...entry, 
                    type: type,
                    discharge: parseDischarge(discharge)
                };
            case 'HealthCheck':
                return  {
                   ...entry,
                    type: type,
                    healthCheckRating: parseRating(healthCheckRating)
                };
            case 'OccupationalHealthcare':
                return {
                   ...entry,
                    type: type,
                    employerName: parseEmployer(employerName),
                    sickLeave: parseLeave(sickLeave)
                };
            default:
                return assertNever(type);
        }
    };
    




