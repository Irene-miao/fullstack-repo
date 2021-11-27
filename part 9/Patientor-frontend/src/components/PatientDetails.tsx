import React from 'react';
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { Icon} from "semantic-ui-react";


const PatientDetails = () => {
    const [{ patients }] = useStateValue();

    const {id} = useParams();
   

    return (
        <div>
            {Object.values(patients).map((patient: Patient) => (
                patient.id === id ? 
               ( <div key={patient.id}> 
                    <h1>{patient.name}  {patient.gender === "male" ? <Icon fitted name='mars'/> : <Icon fitted name='venus' />}</h1>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                </div>) : null
            ))}
        </div>
    );
};

export default PatientDetails;
