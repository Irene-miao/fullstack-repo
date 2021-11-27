export type Diagnose = 'M24.2' | 'M51.2' | 'S03.5' | 'J10.1' | 'J06.9' | 'Z57.1' | 'N30.0' | 'H54.7' | 'J03.0' | 'L60.1' | 'Z74.3' | 'L20' | 'F43.2' | 'S62.5' | 'H35.29' | 'J12.82';

export interface DiagnoseEntry {
    code: Diagnose;
    name: string;
    latin?: string;
};


export enum Gender {
    Male = 'male',
    Female = 'female',
};


export interface Entry {
    
};


export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
};

export type Patient = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;

