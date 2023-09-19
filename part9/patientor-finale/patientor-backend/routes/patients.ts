import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getPatientsNoSsn();
  res.json(patients);
});

router.get("/:id", (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    if (addedEntry) {
      res.json(addedEntry);
    } else {
      res.status(404).send("Patient not added");
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    console.log("req.body: ", req.body);
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(req.params.id, newEntry);
    if (addedEntry) {
      res.json(addedEntry);
    } else {
      res.status(404).send("Entry not added");
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
