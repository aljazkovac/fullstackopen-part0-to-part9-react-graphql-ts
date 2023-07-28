import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const [bmi, category] = calculateBmi(height, weight);
  return res.json({
    weight: weight,
    height: height,
    bmi: bmi,
    category: category,
  });
});

app.post("/calculate", (req, res) => {
  const { value1, value2 } = req.body;

  const result = calculateExercises(value1, value2);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
