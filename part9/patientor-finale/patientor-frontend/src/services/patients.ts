import axios from "axios";
import { Entry, EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string | undefined) => {
  if (id === undefined) throw new Error("id is undefined");
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  console.log("data: ", data);

  return data;
};

const create = async (object: PatientFormValues) => {
  console.log("object: ", object);

  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (id: string, object: EntryFormValues) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );

    console.log("data: ", data);
    return data;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
      throw new Error(error.response.data);
    } else {
      console.error("Error", error.message);
      throw new Error(error.message);
    }
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getOne,
  create,
  createEntry,
};
