import diagnosesData from "../data/diagnoses";
import { DiagnosisEntry } from "../types";

const diagnoses: DiagnosisEntry[] = diagnosesData;

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
