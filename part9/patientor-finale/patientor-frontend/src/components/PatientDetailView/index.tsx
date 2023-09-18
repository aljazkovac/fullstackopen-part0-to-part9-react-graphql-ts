import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient, Diagnosis } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Box } from "@mui/material";
import Entry from "./Entries";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailView: React.FC<Props> = ({ diagnoses }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const patientId = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getOne(patientId.id);
        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Error fetching the patient:", error);
      }
    };

    fetchPatient();
  }, [patientId.id]);

  console.log("Patient ID: ", patientId.id);
  console.log("Patient: ", patient);
  console.log("Diagnoses: ", diagnoses);

  return (
    <div>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <h2>{patient?.name}</h2>
        {patient?.gender === "male" ? (
          <MaleIcon></MaleIcon>
        ) : (
          <FemaleIcon></FemaleIcon>
        )}
      </Box>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <Entry entries={patient?.entries} diagnoses={diagnoses}></Entry>
    </div>
  );
};

export default PatientDetailView;
