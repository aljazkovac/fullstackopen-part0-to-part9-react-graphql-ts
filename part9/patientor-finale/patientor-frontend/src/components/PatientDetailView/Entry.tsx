import { Diagnosis, Entry } from "../../types";

interface Props {
  entries: Entry[] | undefined;
  diagnoses: Diagnosis[];
}

const Entries: React.FC<Props> = ({ entries, diagnoses }) => {
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
                return (
                  <li key={code}>
                    {code}: {diagnoses.find((d) => d.code === code)?.name}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Entries;
