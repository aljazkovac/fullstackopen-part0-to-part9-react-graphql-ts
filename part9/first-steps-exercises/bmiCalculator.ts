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

const [bmi1, category1] = calculateBmi(193, 96);
console.log(`HARDCODED ARGS: Your BMI is ${bmi1} and you are ${category1}.`);

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
const [bmi2, category2] = calculateBmi(height, weight);
console.log(`GIVEN ARGS: Your BMI is ${bmi2} and you are ${category2}.`);

export default calculateBmi;
