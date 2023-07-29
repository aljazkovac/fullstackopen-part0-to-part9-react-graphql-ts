interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: RatingRank;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

type RatingRank = 1 | 2 | 3;

type RatingDescription =
  | 'Excellent!'
  | 'Not bad, but make next week better.'
  | 'Not really your week, was it?';

type RatingResult = {
  ratingRank: RatingRank;
  ratingDescription: RatingDescription;
};

const calculateNumberOfTrainingDays = (exerciseArray: number[]): number => {
  let periodLength = 0;
  exerciseArray.forEach((day) => {
    if (day > 0) {
      periodLength++;
    }
  });
  return periodLength;
};

const calculateAverageHoursPerDay = (exerciseArray: number[]): number => {
  const sumTotalHours = exerciseArray.reduce(
    (sum, currentDay) => sum + currentDay,
  );
  const averageHoursPerDay = sumTotalHours / exerciseArray.length;
  return averageHoursPerDay;
};

const determineIfSuccess = (
  exerciseArray: number[],
  averageDailyTarget: number,
): boolean => {
  const averageHoursPerDay = calculateAverageHoursPerDay(exerciseArray);
  const success = averageHoursPerDay >= averageDailyTarget;
  return success;
};

const calculateRating = (
  exerciseArray: number[],
  averageDailyTarget: number,
): RatingResult => {
  const averageHoursPerDay = calculateAverageHoursPerDay(exerciseArray);
  const differenceBtwHoursAndTarget = averageHoursPerDay - averageDailyTarget;
  let ratingRank: RatingRank;
  let ratingDescription: RatingDescription;

  if (differenceBtwHoursAndTarget > 0) {
    ratingRank = 1;
    ratingDescription = 'Excellent!';
  } else if (differenceBtwHoursAndTarget > -2) {
    ratingRank = 2;
    ratingDescription = 'Not bad, but make next week better.';
  } else {
    ratingRank = 3;
    ratingDescription = 'Not really your week, was it?';
  }

  const ratingResult: RatingResult = {
    ratingRank: ratingRank,
    ratingDescription: ratingDescription,
  };

  return ratingResult;
};

export const calculateExercises = (
  exerciseArray: number[],
  averageDailyTarget: number,
): Result => {
  const result: Result = {
    periodLength: exerciseArray.length,
    trainingDays: calculateNumberOfTrainingDays(exerciseArray),
    success: determineIfSuccess(exerciseArray, averageDailyTarget),
    rating: calculateRating(exerciseArray, averageDailyTarget).ratingRank,
    ratingDescription: calculateRating(exerciseArray, averageDailyTarget)
      .ratingDescription,
    target: averageDailyTarget,
    average: calculateAverageHoursPerDay(exerciseArray),
  };
  return result;
};

const result1 = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(
  `Your HARDCODED results are the following: 
    periodLength: ${result1.periodLength};
    trainingDays: ${result1.trainingDays};
    success: ${result1.success};
    rating: ${result1.rating};
    ratingDesc: ${result1.ratingDescription};
    target: ${result1.target};
    average: ${result1.average}.`,
);

const target = Number(process.argv[2]);
const daysArray = process.argv.slice(3).map(Number);
const result2 = calculateExercises(daysArray, target);
console.log(
  `Your GIVEN results are the following: 
    periodLength: ${result2.periodLength};
    trainingDays: ${result2.trainingDays};
    success: ${result2.success};
    rating: ${result2.rating};
    ratingDesc: ${result2.ratingDescription};
    target: ${result2.target};
    average: ${result2.average}.`,
);

export default calculateExercises;
