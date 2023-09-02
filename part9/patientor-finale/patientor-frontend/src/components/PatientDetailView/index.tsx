import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Box } from "@mui/material";

interface Props {}

const PatientDetailView: React.FC<Props> = () => {
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
    </div>
  );
};

export default PatientDetailView;
