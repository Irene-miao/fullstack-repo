import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state";

import PatientListPage from "./PatientListPage";
import PatientDetails from "./components/PatientDetails";
import { Patient } from "./types";


const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/api/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />}>
            </Route>
            <Route path="/:id" element={<PatientDetails />}>
            </Route>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
/*function patientListFromApi(patientListFromApi: any): import("./state").Action {
  throw new Error("Function not implemented.");
}*/

