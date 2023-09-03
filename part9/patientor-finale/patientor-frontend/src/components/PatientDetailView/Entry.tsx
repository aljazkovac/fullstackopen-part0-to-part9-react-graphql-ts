import React, { useState, useEffect } from "react";
import { Entry } from "../../types";

interface Props {
  entries: Entry[] | undefined;
}

const Entries: React.FC<Props> = ({ entries }) => {
  return (
    <div>
      <h3>entries</h3>
      {entries?.map((entry) => {
        return (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                return <li key={code}>{code}</li>;
              })}
            </ul>
            {entry.type === "OccupationalHealthcare" && entry.employerName}
          </div>
        );
      })}
    </div>
  );
};

export default Entries;
