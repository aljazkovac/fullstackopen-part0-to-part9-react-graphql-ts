import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Entry, EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  diagnosisCodes: string[];
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ diagnosisCodes, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
    string[]
  >([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");

  const determineEntryType = (): Entry["type"] => {
    if (healthCheckRating !== undefined) {
      return "HealthCheck";
    }
    if (dischargeDate && dischargeCriteria) {
      return "Hospital";
    }
    if (employerName) {
      return "OccupationalHealthcare";
    }
    throw new Error("Invalid entry type");
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const entryType = determineEntryType();
    let entryValues: EntryFormValues;

    if (entryType === "HealthCheck") {
      entryValues = {
        type: "HealthCheck",
        description,
        date,
        specialist,
        healthCheckRating,
        diagnosisCodes: selectedDiagnosisCodes,
      };
    } else if (entryType === "Hospital") {
      entryValues = {
        type: "Hospital",
        description,
        date,
        specialist,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
        diagnosisCodes: selectedDiagnosisCodes,
      };
    } else if (entryType === "OccupationalHealthcare") {
      entryValues = {
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        employerName,
        sickLeave: {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate,
        },
        diagnosisCodes: selectedDiagnosisCodes,
      };
    } else {
      throw new Error("Invalid entry type");
    }

    onSubmit(entryValues);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <FormControl fullWidth>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={selectedDiagnosisCodes}
            onChange={(event) =>
              setSelectedDiagnosisCodes(event.target.value as string[])
            }
          >
            {diagnosisCodes.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(newValue) => {
              if (newValue) {
                setDate(newValue.toString());
              } else {
                setDate("");
              }
            }}
          />
        </LocalizationProvider>
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="HealthCheckRating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) =>
            setHealthCheckRating(parseInt(target.value))
          }
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
