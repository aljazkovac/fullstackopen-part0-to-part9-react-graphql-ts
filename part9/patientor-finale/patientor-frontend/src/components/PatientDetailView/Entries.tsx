import { ReactElement, useState } from "react";
import patientService from "../../services/patients";
import { Box, Button } from "@mui/material";
import { Diagnosis, Entry, EntryFormValues, Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

interface Props {
  patient: Patient | null;
  entries: Entry[] | undefined;
  diagnoses: Diagnosis[];
}

const determineEntryIcon = (entry: Entry): ReactElement => {
  switch (entry.type) {
    case "HealthCheck":
      return <MonitorHeartOutlinedIcon></MonitorHeartOutlinedIcon>;
    case "Hospital":
      return <LocalHospitalOutlinedIcon></LocalHospitalOutlinedIcon>;
    case "OccupationalHealthcare":
      return <AssuredWorkloadOutlinedIcon></AssuredWorkloadOutlinedIcon>;
    default:
      return assertNever(entry);
  }
};

function assertNever(value: never): never {
  throw new Error("Unhandled discriminated union member");
}

const Entries: React.FC<Props> = ({ patient, entries, diagnoses }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (patient) {
      const entry = await patientService.createEntry(patient.id, values);
      console.log("entry", entry);

      try {
        entries?.push(entry);
        setModalOpen(false);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    } else {
      throw new Error("Patient is null.");
    }
  };

  return (
    <div>
      <h3>Entries</h3>
      {entries?.map((entry) => {
        return (
          <Box
            key={entry.id}
            sx={{ border: "1px solid", padding: "8px", marginBottom: "8px" }}
          >
            <div>{determineEntryIcon(entry)}</div>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                return (
                  <Box key={code}>
                    <li key={code}>
                      {code}: {diagnoses.find((d) => d.code === code)?.name}
                    </li>
                  </Box>
                );
              })}
            </ul>
            <EntryDetails entry={entry} />
          </Box>
        );
      })}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default Entries;
