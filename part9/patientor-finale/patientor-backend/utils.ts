import {
  //Entry,
  Gender,
  NewPatientEntry,
  Entry,
  //HealthCheckEntry,
  //OccupationalHealthcareEntry,
  //HospitalEntry,
  //HealthCheckRating,
} from "./types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "type" in object &&
    object.type === "HealthCheck" &&
    "description" in object &&
    "date" in object &&
    "specialist" in object
  ) {
    const newEntry: Entry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    }
  }
  else if (
    "type" in object &&
    object.type === "Hospital" &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "healthCheckRating" in object
  ) {
    const newEntry: Entry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    }
  }
  else if (
    "type" in object &&
    object.type === "OccupationalHealthcare" &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "employerName" in object
  ) {
    const newEntry: Entry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      employerName: parseEmployerName(object.employerName),
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name!");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// The pattern is just simply 6 characters, then a hyphen,
// followed by three or four letters or digits.
const isSsn = (ssn: string): boolean => {
  const pattern = /^(\d{2})(\d{2})(\d{2})-([0-9A-Z]{3,4})$/;
  return pattern.test(ssn);
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

//const isValidHealthCheckEntry = (entry: unknown): entry is HealthCheckEntry => {
//// Use a temporary type assertion to be able to check the type of the entry
//const e = entry as HealthCheckEntry;
//return (
//e?.type === "HealthCheck" &&
//Object.values(HealthCheckRating).includes(e.healthCheckRating)
//);
//};

//const isValidHospitalEntry = (entry: unknown): entry is HospitalEntry => {
//// Use a temporary type assertion to be able to check the type of the entry
//const e = entry as HospitalEntry;
//return e?.type === "Hospital" && isValidDischarge(e.discharge);
//};

//const isValidOccupationalHealthcareEntry = (
//entry: unknown
//): entry is OccupationalHealthcareEntry => {
//// Use a temporary type assertion to be able to check the type of the entry
//const e = entry as OccupationalHealthcareEntry;
//return (
//e?.type === "OccupationalHealthcare" && typeof e.employerName === "string"
//);
//};

//const isValidDischarge = (
//discharge: unknown
//): discharge is { date: string; criteria: string } => {
//const d = discharge as { date: string; criteria: string };
//return typeof d?.date === "string" && typeof d?.criteria === "string";
//};

//const parseEntries = (entries: unknown[]): Entry[] => {
//let parsedEntries: Entry[] = [];
//for (let entry of entries) {
//if (isValidHealthCheckEntry(entry)) {
//parsedEntries.push(entry);
//} else if (isValidHospitalEntry(entry)) {
//parsedEntries.push(entry);
//} else if (isValidOccupationalHealthcareEntry(entry)) {
//parsedEntries.push(entry);
//} else {
//throw new Error("Invalid entry type: " + JSON.stringify(entry));
//}
//}
//return parsedEntries;
//};
