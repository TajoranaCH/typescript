interface ExercisesStats {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExercisesHours: number[], targetAmount: number): ExercisesStats => {
  const periodLength = dailyExercisesHours.length;
  const trainingDays = dailyExercisesHours.filter(dh => dh !== 0).length;
  const totalHours = dailyExercisesHours.reduce((t, h) => t + h, 0);
  const targetHours = targetAmount * periodLength;
  const success = targetHours <= totalHours
  
  const rating = (() => {
    if (success) {
      if (totalHours - targetHours > 10) return 5
      if (totalHours - targetHours > 5) return 4
      return 3
    }
    if (targetHours - totalHours < 5) return 2
    return 1
  })();
  console.log(rating)
  let ratingDescription;

  switch (rating) {
    case 1:
      ratingDescription = 'You are way far from target, could do way better!';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better.';
      break;
    case 3:
      ratingDescription = 'target reached, good job!';
      break;
    case 4:
      ratingDescription = 'Nice, you reached the target and went beyond!'
      break;
    case 5:
      ratingDescription = 'Kudos! You made the target and worked very hard, continue like this and sky is the limit!'
  }

  const average = totalHours / periodLength;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average
  }
}

let excPerDays = [ ...process.argv ]

excPerDays.shift()
excPerDays.shift()

const target = excPerDays.shift()
console.log(calculateExercises(excPerDays.map(n => parseInt(n, 10)), Number(target)))
