type BmiCategory =
  | "Underweight"
  | "Normal (healthy weight)"
  | "Overweight"
  | "Obese";

type BmiResult = [number, BmiCategory];

const calculateBmi = (height: number, weight: number): BmiResult => {
  const bmi = weight / Math.pow(height / 100, 2);
  let category: BmiCategory;

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal (healthy weight)";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  return [bmi, category];
};

const [bmi, category] = calculateBmi(193, 96);
console.log(`Your BMI is ${bmi} and you are ${category}.`);
