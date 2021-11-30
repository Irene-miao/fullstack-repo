import React from 'react';
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import { Icon} from "semantic-ui-react";


const PatientDetails = () => {
    const [{ patients, diagnoses}] = useStateValue();

    const {id} = useParams();
   
    console.log(diagnoses);

    return (
        <div>
            {Object.values(patients).map((patient: Patient) => (
                patient.id === id ? 
               ( <div key={patient.id}> 
                    <h1>{patient.name}  {patient.gender === "male" ? <Icon fitted name='mars'/> : <Icon fitted name='venus' />}</h1>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                  
                    <h3>entries</h3>
                            <p>{patient.entries[0]?.date} {patient.entries[0]?.description}</p>
                            <ul>
                                {patient.entries[0]?.diagnosisCodes?.map(code => <li key={code}>{code}   {Object.values(diagnoses).map((diagnosis: Diagnosis) => {
                                   if (diagnosis.code === code ) {
                                       return <div>{diagnosis.name}</div>;
                                   }
                                })}</li>)}
                            </ul>
                </div>) : null
            ))}
        </div>
    );
};

export default PatientDetails;
