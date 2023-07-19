type BmiCategory =
  | "Underweight"
  | "Normal (healthy weight)"
  | "Overweight"
  | "Obese";

type BmiResult = [number, BmiCategory];

const calculateBmi = (height: number, weight: number): BmiResult => {
  const bmi = weight / Math.pow(height / 100, 2);
  let category: BmiCategory;

  switch (true) {
    case bmi < 18.5:
      category = "Underweight";
      break;
    case bmi < 25:
      category = "Normal (healthy weight)";
      break;
    case bmi < 30:
      category = "Overweight";
      break;
    default:
      category = "Obese";
  }

  return [bmi, category];
};

const [bmi, category] = calculateBmi(193, 96);
console.log(`Your BMI is ${bmi} and you are ${category}.`);
