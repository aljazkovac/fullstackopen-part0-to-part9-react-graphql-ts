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

app.post('/calculate', (req: Request, res: Response) => {
  const { value1, value2 } = req.body as { value1: number[]; value2: number };

  if (value1.length === 0 || isNaN(value2)) {
    return res.status(400).send({ error: 'Wrong arguments.' });
  }
  const result = calculateExercises(value1, value2);
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
