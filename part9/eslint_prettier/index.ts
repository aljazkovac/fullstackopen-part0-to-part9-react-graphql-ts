import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const [bmi, category] = calculateBmi(height, weight);
  return res.json({
    weight: weight,
    height: height,
    bmi: bmi,
    category: category,
  });
});

const validateArray = (exerciseArray: number[]): boolean => {
  return exerciseArray.every((element) => !isNaN(element));
};

app.post('/calculate', (req: Request, res: Response) => {
  const { value1, value2 } = req.body as { value1: number[]; value2: number };

  // The order matters: first check if value1 exists, then check its length.
  if (!value1 || value1.length === 0 || !value2) {
    return res.status(400).send({ error: 'Missing arguments.' });
  }
  if (!validateArray(value1) || isNaN(value2)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(value1, value2);
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
