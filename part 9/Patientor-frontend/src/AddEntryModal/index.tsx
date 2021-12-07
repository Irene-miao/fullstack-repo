
import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthForm, { HealthFormValues } from './AddHealthForm';
import AddHospitalForm, { HospitalFormValues } from './AddHospitalForm';
import AddOccupationalForm, { OccupationalFormValues } from './AddOccupationalForm';
  
export type Value = 
| HealthFormValues
| HospitalFormValues
| OccupationalFormValues;

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Value) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
     <h3>Health Entry</h3>
     <AddHealthForm onSubmit={onSubmit} onCancel={onClose}/> 
     <br />
     <h3>Hospital Entry</h3>
     <AddHospitalForm onSubmit={onSubmit} onCancel={onClose}/>
     <br />
     <h3>Occupational Entry</h3>
     <AddOccupationalForm onSubmit={onSubmit} onCancel={onClose}/>
    </Modal.Content>
  </Modal>

);

export default AddEntryModal;


