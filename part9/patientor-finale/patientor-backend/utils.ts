//          ***** Utility functions for parsing data *****
//          ***** and type guards for validating data ****

//          ***** Imports ****
import {
  Gender,
  NewPatientEntry,
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckRating,
  DiagnosisEntry,
} from "./types";

//          ***** Main utility functions *****

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  console.log("object:", object);
  if (
    !object ||
    typeof object !== "object" ||
    !isValidNewPatientEntry(object)
  ) {
    throw new Error("Object does not match the type NewPatientEntry");
  }
  return {
    name: parseStringProperty(object.name, "name"),
    dateOfBirth: parseDateProperty(object.dateOfBirth, "dateOfBirth"),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseStringProperty(object.occupation, "occupation"),
    entries: object.entries.map((entry: unknown) => toNewEntry(entry)),
  };
};

export const toNewEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const entry = object as { type: string };

  switch (entry.type) {
    case "HealthCheck":
      if (isValidHealthCheckEntry(object)) {
        return parseHealthCheckEntry(object);
      }
      break;

    case "Hospital":
      if (isValidHospitalEntry(object)) {
        return parseHospitalEntry(object);
      }
      break;

    case "OccupationalHealthcare":
      if (isValidOccupationalHealthcareEntry(object)) {
        return parseOccupationalHealthcareEntry(object);
      }
      break;

    default:
      throw new Error("Unknown entry type: " + entry.type);
  }

  throw new Error(
    "Incorrect data: some fields are missing or invalid for type " + entry.type
  );
};

//          ***** Parsers *****

const parseStringProperty = (
  property: unknown,
  propertyName: string
): string => {
  if (!property || !isString(property)) {
    throw new Error("Incorrect or missing " + propertyName + ": " + property);
  }
  return property;
};

const parseDateProperty = (property: unknown, propertyName: string): string => {
  if (!property || !isString(property) || !isDate(property)) {
    throw new Error("Incorrect or missing " + propertyName + ": " + property);
  }
  return property;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseHealthCheckEntry = (entry: unknown): HealthCheckEntry => {
  const e = entry as HealthCheckEntry;
  const newEntry: HealthCheckEntry = {
    ...e,
    description: parseStringProperty(e.description, "description"),
    date: parseDateProperty(e.date, "date"),
    specialist: parseStringProperty(e.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(e.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(e.healthCheckRating),
  };
  return newEntry;
};

const parseHospitalEntry = (entry: unknown): HospitalEntry => {
  const e = entry as HospitalEntry;
  const newEntry: HospitalEntry = {
    ...e,
    description: parseStringProperty(e.description, "description"),
    date: parseDateProperty(e.date, "date"),
    specialist: parseStringProperty(e.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(e.diagnosisCodes),
    discharge: parseDischarge(e.discharge),
  };
  return newEntry;
};

const parseOccupationalHealthcareEntry = (
  entry: unknown
): OccupationalHealthcareEntry => {
  const e = entry as OccupationalHealthcareEntry;
  const newEntry: OccupationalHealthcareEntry = {
    ...e,
    description: parseStringProperty(e.description, "description"),
    date: parseDateProperty(e.date, "date"),
    specialist: parseStringProperty(e.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(e.diagnosisCodes),
    employerName: parseStringProperty(e.employerName, "employer name"),
    sickLeave: parseSickLeave(e.sickLeave),
  };
  return newEntry;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<DiagnosisEntry["code"]> => {
  if (!Array.isArray(diagnosisCodes)) {
    return [] as Array<DiagnosisEntry["code"]>;
  }

  for (let code of diagnosisCodes) {
    if (!isString(code)) {
      throw new Error("Incorrect diagnosis code: " + code);
    }
  }

  return diagnosisCodes as Array<DiagnosisEntry["code"]>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating !== undefined && rating !== null && isHealthCheckRating(rating)) {
    return rating;
  } else {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (typeof discharge === "object" && discharge !== null) {
    const potentialDischarge = discharge as { [key: string]: unknown };
    if (
      typeof potentialDischarge.date === "string" &&
      typeof potentialDischarge.criteria === "string" &&
      isDate(potentialDischarge.date) &&
      isString(potentialDischarge.criteria)
    ) {
      return {
        date: potentialDischarge.date,
        criteria: potentialDischarge.criteria,
      };
    } else {
      throw new Error("Incorrect discharge: " + JSON.stringify(discharge));
    }
  }
  throw new Error("Incorrect discharge: " + JSON.stringify(discharge));
};

const parseSickLeave = (
  sickLeave: unknown
): { startDate: string; endDate: string } | undefined => {
  if (typeof sickLeave === "object" && sickLeave !== null) {
    const potentialSickLeave = sickLeave as { [key: string]: unknown };
    if (
      typeof potentialSickLeave.startDate === "string" &&
      typeof potentialSickLeave.endDate === "string" &&
      isDate(potentialSickLeave.startDate) &&
      isDate(potentialSickLeave.endDate)
    ) {
      return {
        startDate: potentialSickLeave.startDate,
        endDate: potentialSickLeave.endDate,
      };
    } else {
      throw new Error("Incorrect sick leave: " + JSON.stringify(sickLeave));
    }
  }

  return undefined;
};

//          ***** Type Guards *****

const isValidNewPatientEntry = (entry: unknown): entry is NewPatientEntry => {
  // Use a temporary type assertion to be able to check the type of the entry
  const e = entry as NewPatientEntry;
  return (
    typeof e?.name === "string" &&
    typeof e?.dateOfBirth === "string" &&
    typeof e?.ssn === "string" &&
    isSsn(e.ssn) &&
    typeof e?.gender === "string" &&
    isGender(e.gender) &&
    typeof e?.occupation === "string"
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// The pattern is just simply 6 characters, then a hyphen,
// followed by three or four letters or digits.
const isSsn = (ssn: string): boolean => {
  const pattern = /^(\d{2})(\d{2})(\d{2})-([0-9A-Z]{3,4})$/;
  return pattern.test(ssn);
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const isDate = (date: unknown): boolean => {
  if (date === "") {
    return true;
  }
  return typeof date === "string" && Boolean(Date.parse(date));
};

const isValidHealthCheckEntry = (entry: unknown): entry is HealthCheckEntry => {
  const e = entry as HealthCheckEntry;
  return (
    e?.type === "HealthCheck" &&
    isString(e.description) &&
    isDate(e.date) &&
    isString(e.specialist) &&
    isHealthCheckRating(e.healthCheckRating)
  );
};

const isValidHospitalEntry = (entry: unknown): entry is HospitalEntry => {
  const e = entry as HospitalEntry;
  return (
    e?.type === "Hospital" &&
    isString(e.description) &&
    isDate(e.date) &&
    isString(e.specialist) &&
    isValidDischarge(e.discharge)
  );
};

const isValidOccupationalHealthcareEntry = (
  entry: unknown
): entry is OccupationalHealthcareEntry => {
  const e = entry as OccupationalHealthcareEntry;
  return (
    e?.type === "OccupationalHealthcare" &&
    isString(e.description) &&
    isDate(e.date) &&
    isString(e.specialist) &&
    isString(e.employerName)
  );
};

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating as HealthCheckRating);
};

const isValidDischarge = (
  discharge: unknown
): discharge is { date: string; criteria: string } => {
  const d = discharge as { date: string; criteria: string };
  return typeof d?.date === "string" && typeof d?.criteria === "string";
};
