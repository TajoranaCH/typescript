import express from 'express';
import calculateBmi from './calculateBmi';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) return res.status(400).json({
    error: "malformatted parameters"
  });
  return res.json({
    height: Number(req.query.height),
    weight: Number(req.query.weight),
    bmi: calculateBmi(Number(Number(req.query.height)), Number(req.query.weight)) as string
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});