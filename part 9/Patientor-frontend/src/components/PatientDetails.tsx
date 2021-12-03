import React from 'react';
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import { Icon} from "semantic-ui-react";
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalEntry from './OccupationalEntry';

const PatientDetails = () => {
    const [{ patients, diagnoses}] = useStateValue();

    const {id} = useParams();
    
    console.log(patients);
    console.log(diagnoses);

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
        console.log(entry);
        
        switch (entry.type) {
            case "Hospital":
                return <Hospital   hospital={entry}/>;
            case "OccupationalHealthcare":
                return <OccupationalEntry occupational={entry}/>;
            case "HealthCheck":
                return <HealthCheck  health={entry}/>;
            default:
                return assertNever(entry);
        }
    };

    return (
        <div>
            {Object.values(patients).map((patient: Patient) => (
            patient.id === id ? 
           ( 
           <div key={patient.id}> 
                <h1>{patient.name}  {patient.gender === "male" ? <Icon fitted name='mars'/> : <Icon fitted name='venus' />}</h1>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
              
                <h3>entries</h3>
                {Object.values(patient.entries)?.map((entry: Entry) => { 
                    console.log(entry);
                    return EntryDetails({entry}
                    );})}
        </div>
            ) : null ))}
        </div> 
    );
           };

export default PatientDetails;
