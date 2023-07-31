import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getPatientsNoSsn();
  res.json(patients);
});

router.post("/", (_req, res) => {
  res.send("Saving a patient!");
});

export default router;
