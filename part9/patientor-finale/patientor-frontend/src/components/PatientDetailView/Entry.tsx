import { Box, Button } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import EntryDetails from "./EntryDetails";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { ReactElement } from "react";

interface Props {
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

const Entries: React.FC<Props> = ({ entries, diagnoses }) => {
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
      <Button variant="contained" onClick={() => null}>
        Add New Entry
      </Button>
    </div>
  );
};

export default Entries;
