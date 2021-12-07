import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";

export type HospitalFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}


export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses}] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        type: "Hospital",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.discharge.date) {
          errors.date = requiredError;
        }
        if (!values.discharge.criteria) {
          errors.criteria = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
             <Field
           label="Type"
           placeholder="Type"
           name="type"
           component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
              
            />
             <Field
              label="Discharge.date"
              placeholder="Discharge.date"
              name="discharge.date"
              component={TextField}
            />
              <Field
              label="Discharge.criteria"
              placeholder="Discharge.criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
