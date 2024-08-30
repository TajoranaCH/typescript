import express from 'express';
import calculateBmi from './calculateBmi';
import exerciseCalculator from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height
    || !req.query.weight
    || isNaN(Number(req.query.height))
    || isNaN(Number(req.query.weight))) return res.status(400).json({
    error: "malformatted parameters"
  });
  return res.json({
    height: Number(req.query.height),
    weight: Number(req.query.weight),
    bmi: calculateBmi(Number(Number(req.query.height)), Number(req.query.weight)) as string
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || target == null ) return res.status(400).json({
    error: "parameters missing"
  });
  if (!Array.isArray(daily_exercises) || daily_exercises.length === 0 || isNaN(Number(target)) || Number(target) < 0) return res.status(400).json({
    error: "malformatted parameters"
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = exerciseCalculator(daily_exercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});