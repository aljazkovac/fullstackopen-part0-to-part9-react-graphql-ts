import patientsData from "../data/patients";
import { PatientEntry, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

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

const addPatient = (entry: NewPatientEntry) => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatientsNoSsn,
  addPatient,
};
