import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";

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

  return <div>More about the patient {patient?.name}!</div>;
};

export default PatientDetailView;
