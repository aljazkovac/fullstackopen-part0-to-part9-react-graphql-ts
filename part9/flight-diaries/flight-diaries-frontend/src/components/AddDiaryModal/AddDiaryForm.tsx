/**
 * This file contains the form for adding a new diary entry. Can be found in the AddDiaryModal component.
 */

/// --- Imports --- ///

import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { NewDiaryEntry, Weather, Visibility } from "../../types";

import {
  TextField,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
} from "@mui/material";

/// --- Interfaces and constants --- ///

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewDiaryEntry) => void;
}

enum RadioGroupName {
  Weather = "weather",
  Visibility = "visibility",
}

const dateFormat = "YYYY-MM-DD";

/// --- Components --- ///

const getEnumValues = <T extends object>(anEnum: T): string[] =>
  Object.values(anEnum) as string[];

const AddDiaryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState(dayjs());
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");

  const addDiary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedDate = date.format(dateFormat);
    onSubmit({
      date: formattedDate,
      weather,
      visibility,
      comment,
    });
  };

  return (
    <div>
      <form onSubmit={addDiary}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newDate: dayjs.Dayjs | null) =>
              newDate && setDate(newDate)
            }
            maxDate={dayjs()}
          />
        </LocalizationProvider>

        <Grid container direction="row" alignItems="center">
          <Box pr={2}>
            <div>Weather: </div>
          </Box>
          <Grid item>
            <RadioGroup
              aria-label={RadioGroupName.Weather}
              name="weather"
              value={weather}
              row
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setWeather(event.target.value as Weather)
              }
            >
              {getEnumValues(Weather).map((weatherOption) => (
                <FormControlLabel
                  key={weatherOption}
                  value={weatherOption}
                  control={<Radio />}
                  label={weatherOption}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center">
          <Box pr={1.3}>
            <div>Visibility: </div>
          </Box>
          <Grid item>
            <RadioGroup
              aria-label={RadioGroupName.Visibility}
              name="visibility"
              value={visibility}
              row
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setVisibility(event.target.value as Visibility)
              }
            >
              {getEnumValues(Visibility).map((visibilityOption) => (
                <FormControlLabel
                  key={visibilityOption}
                  value={visibilityOption}
                  control={<Radio />}
                  label={visibilityOption}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>
        <TextField
          label="Comment"
          fullWidth
          value={comment}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setComment(event.target.value)
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

export default AddDiaryForm;
