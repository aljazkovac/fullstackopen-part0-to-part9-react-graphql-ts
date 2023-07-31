import patientsData from "../data/patients";
import { PatientEntry } from "../types";

const patients: PatientEntry[] = patientsData;

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getPatientsNoSsn = (): Omit<PatientEntry, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getPatientsNoSsn,
  addPatient,
};
