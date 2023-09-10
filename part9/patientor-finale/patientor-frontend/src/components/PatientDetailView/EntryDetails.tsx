import React, { ReactElement } from "react";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface EntryDetailsProps {
  entry: Entry;
}

const determineHealthCheckRatingIcon = (
  rating: number
): ReactElement<typeof FavoriteIcon> => {
  switch (rating) {
    case 0:
      return <FavoriteIcon style={{ color: "green" }}></FavoriteIcon>;
    case 1:
      return <FavoriteIcon style={{ color: "orange" }}></FavoriteIcon>;
    case 2:
      return <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>;
    default:
      return <FavoriteIcon style={{ color: "grey" }}></FavoriteIcon>;
  }
};

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      const healthCheckEntry = entry as HealthCheckEntry;
      return (
        <div>
          <p>diagnosed by {entry.specialist}</p>
          {determineHealthCheckRatingIcon(entry.healthCheckRating)}
        </div>
      );
    case "Hospital":
      const hospitalEntry = entry as HospitalEntry;
      return (
        <div>
          Discharge: {hospitalEntry.discharge?.date} -{" "}
          {hospitalEntry.discharge?.criteria}
          <p>diagnosed by {entry.specialist}</p>
        </div>
      );
    case "OccupationalHealthcare":
      const occupationalHealthcareEntry = entry as OccupationalHealthcareEntry;
      return (
        <div>
          Employer: {occupationalHealthcareEntry.employerName}
          <p>diagnosed by {entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

function assertNever(value: never): never {
  throw new Error("Unhandled discriminated union member");
}

export default EntryDetails;
