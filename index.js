// ! Helper functions
const roundToTwoDecimal = (number) => {
  return Number(Number.parseFloat(number).toFixed(2));
};

// ? All heights in cm
// ? All weights in kg
// ! *********************************************************************************************
// ! BMR calculator (gender,age,height,weight) (Harris-Benedict equation)
const BMR = (gender, age, height, weight) => {
  try {
    // ! handling missing params
    if (!gender) throw "gender not provided";
    if (!age || typeof age != "number") throw "age (integer) not provided";
    if (!height || typeof height != "number")
      throw "height (integer) not provided";
    if (!weight || typeof weight != "number")
      throw "weight (integer) not provided";
    // ! handling wrong genders
    if (gender.toLowerCase() != "male" && gender.toLowerCase() != "female")
      throw "gender can be male or female";
    // ! actual calculation
    if (gender.toLowerCase() == "male") {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else if (gender.toLowerCase() == "female") {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
  } catch (error) {
    return error;
  }
};
// ! *********************************************************************************************
// ! BMI calculator
const BMI = (height, weight) => {
  try {
    // ! handling missing params
    if (!height || typeof height != "number")
      throw "height (integer) not provided";
    if (!weight || typeof height != "number")
      throw "weight (integer) not provided";

    // ! Rounded to two digits after decimal
    return roundToTwoDecimal(weight / (height / 100) ** 2);
  } catch (error) {
    return error;
  }
};
// ! *********************************************************************************************
// ? neck and waist in cm
// ! Body fat percentage calculator (gender,height,weight,neck,waist,hip==>for females)
const BFP = (gender, height, weight, neck, waist, hip) => {
  try {
    // ! handling missing params
    if (!gender) throw "gender not provided";
    if (!height || typeof height != "number")
      throw "height (integer) not provided";
    if (!weight || typeof height != "number")
      throw "weight (integer) not provided";
    if (!neck || typeof neck != "number") throw "neck (integer) not provided";
    if (!waist || typeof waist != "number")
      throw "waist (integer) not provided";

    // ! handling wrong genders
    if (gender.toLowerCase() != "male" && gender.toLowerCase() != "female")
      throw "gender can be male or female";
    // ! actual calculation
    if (gender.toLowerCase() == "male") {
      return roundToTwoDecimal(
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
          450
      );
    } else if (gender.toLowerCase() == "female") {
      if (!hip || typeof hip != "number") throw "hip (integer) not provided";
      return roundToTwoDecimal(
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(height)) -
          450
      );
    }
  } catch (error) {
    return error;
  }
};
// ! *********************************************************************************************
// ! Ideal body weight calculator
const idealBodyWeight = (gender, height) => {
  try {
    //   ! handling missing params
    if (!height || typeof height != "number")
      throw "height (integer) not provided";
    if (!gender) throw "gender not provided";
    // ! handling wrong genders
    if (gender.toLowerCase() != "male" && gender.toLowerCase() != "female")
      throw "gender can be male or female";
    if (gender.toLowerCase() == "male") {
      return 50 + 0.91 * (height - 152.4);
    } else if (gender.toLowerCase() == "female") {
      return 45.5 + 0.91 * (height - 152.4);
    }
  } catch (error) {
    return error;
  }
};
// ! *********************************************************************************************
// ! Calorie needs (BMR * activity factor) (mifflin St Jeor formula)
const calorieNeeds = (gender, age, height, weight, activity) => {
  try {
    const bmr = BMR(gender, age, height, weight);
    if (
      activity.toLowerCase() != "sedentary" &&
      activity.toLowerCase() != "light" &&
      activity.toLowerCase() != "moderate" &&
      activity.toLowerCase() != "active" &&
      activity.toLowerCase() != "extreme"
    )
      throw "invalid activity provided";
    switch (activity.toLowerCase()) {
      case "sedentary":
        return {
          balance: roundToTwoDecimal(bmr * 1.2),
          mildWeightLoss: roundToTwoDecimal((bmr - 0.1 * bmr) * 1.2),
          mildWeightGain: roundToTwoDecimal((bmr + 0.1 * bmr) * 1.2),
          heavyWeightLoss: roundToTwoDecimal((bmr - 0.2 * bmr) * 1.2),
          heavyWeightGain: roundToTwoDecimal((bmr + 0.2 * bmr) * 1.2),
        };
        break;
      case "light":
        return {
          balance: roundToTwoDecimal(bmr * 1.365),
          mildWeightLoss: roundToTwoDecimal((bmr - 0.1 * bmr) * 1.365),
          mildWeightGain: roundToTwoDecimal((bmr + 0.1 * bmr) * 1.365),
          heavyWeightLoss: roundToTwoDecimal((bmr - 0.2 * bmr) * 1.365),
          heavyWeightGain: roundToTwoDecimal((bmr + 0.2 * bmr) * 1.365),
        };
        break;
      case "moderate":
        return {
          balance: roundToTwoDecimal(bmr * 1.45),
          mildWeightLoss: roundToTwoDecimal((bmr - 0.1 * bmr) * 1.45),
          mildWeightGain: roundToTwoDecimal((bmr + 0.1 * bmr) * 1.45),
          heavyWeightLoss: roundToTwoDecimal((bmr - 0.2 * bmr) * 1.45),
          heavyWeightGain: roundToTwoDecimal((bmr + 0.2 * bmr) * 1.45),
        };
        break;
      case "active":
        return {
          balance: roundToTwoDecimal(bmr * 1.715),
          mildWeightLoss: roundToTwoDecimal((bmr - 0.1 * bmr) * 1.715),
          mildWeightGain: roundToTwoDecimal((bmr + 0.1 * bmr) * 1.715),
          heavyWeightLoss: roundToTwoDecimal((bmr - 0.2 * bmr) * 1.715),
          heavyWeightGain: roundToTwoDecimal((bmr + 0.2 * bmr) * 1.715),
        };
        break;
      case "extreme":
        return {
          balance: roundToTwoDecimal(bmr * 1.8),
          mildWeightLoss: roundToTwoDecimal((bmr - 0.1 * bmr) * 1.8),
          mildWeightGain: roundToTwoDecimal((bmr + 0.1 * bmr) * 1.8),
          heavyWeightLoss: roundToTwoDecimal((bmr - 0.2 * bmr) * 1.8),
          heavyWeightGain: roundToTwoDecimal((bmr + 0.2 * bmr) * 1.8),
        };
        break;
      default:
        break;
    }
  } catch (error) {
    return error;
  }
};

// console.log(calorieNeeds("male", 22, 176, 73, "active"));
// ! *********************************************************************************************
// ! TDEE calculator
const TDEE = (gender, age, height, weight, activity) => {
  return calorieNeeds(gender, age, height, weight, activity).balance;
};
// ! *********************************************************************************************
// ! Macros calculator all in grams
const macros = (gender, age, height, weight, activity, goal) => {
  // ! get calorie needs
  const calories = calorieNeeds(gender, age, height, weight, activity);
  // console.log(calories[goal]);
  // ! as per the goal, give 5 diet plans ==> balanced, low-carb, high-carb, high-protein, low-fat
  const balancedDietPlan = {
    carb: roundToTwoDecimal((0.4 * calories[goal]) / 4),
    protein: roundToTwoDecimal((0.3 * calories[goal]) / 4),
    fat: roundToTwoDecimal((0.3 * calories[goal]) / 9),
    sugar: roundToTwoDecimal((0.1 * calories[goal]) / 4),
  };
  const lowCarbDietPlan = {
    carb: roundToTwoDecimal((0.3 * calories[goal]) / 4),
    protein: roundToTwoDecimal((0.4 * calories[goal]) / 4),
    fat: roundToTwoDecimal((0.3 * calories[goal]) / 9),
    sugar: roundToTwoDecimal((0.1 * calories[goal]) / 4),
  };
  const highCarbDietPlan = {
    carb: roundToTwoDecimal((0.5 * calories[goal]) / 4),
    protein: roundToTwoDecimal((0.3 * calories[goal]) / 4),
    fat: roundToTwoDecimal((0.2 * calories[goal]) / 9),
    sugar: roundToTwoDecimal((0.1 * calories[goal]) / 4),
  };
  const highProteinDietPlan = {
    carb: roundToTwoDecimal((0.35 * calories[goal]) / 4),
    protein: roundToTwoDecimal((0.45 * calories[goal]) / 4),
    fat: roundToTwoDecimal((0.2 * calories[goal]) / 9),
    sugar: roundToTwoDecimal((0.1 * calories[goal]) / 4),
  };
  const lowFatDietPlan = {
    carb: roundToTwoDecimal((0.45 * calories[goal]) / 4),
    protein: roundToTwoDecimal((0.4 * calories[goal]) / 4),
    fat: roundToTwoDecimal((0.15 * calories[goal]) / 9),
    sugar: roundToTwoDecimal((0.1 * calories[goal]) / 4),
  };
  const lowSugarDietPlan = {
    carb: roundToTwoDecimal((0.4 * calories[goal]) / 4),
    protein: roundToTwoDecimal((0.4 * calories[goal]) / 4),
    fat: roundToTwoDecimal((0.2 * calories[goal]) / 9),
    sugar: roundToTwoDecimal((0.05 * calories[goal]) / 4),
  };
  return {
    balancedDietPlan,
    lowCarbDietPlan,
    highCarbDietPlan,
    highProteinDietPlan,
    lowFatDietPlan,
    lowSugarDietPlan,
  };
};
// console.log(macros("male", 22, 176, 73, "active", "mildWeightLoss"));

// ! Body alcohol content calculator (weight,time,{beer:amount,wine:amount,liquor:amount,other:[amount,strength]})
const BAC = (gender, weight, timeSinceLastDrink, consumptionData) => {
  console.log(consumptionData);
  const strength = {
    beer: 5,
    wine: 12,
    liquor: 40,
    other: consumptionData.other[1],
  };
  try {
    // ! handling missing params
    if (!gender) throw "gender not provided";
    if (!weight || typeof weight != "number")
      throw "weight (integer) not provided";
    if (!timeSinceLastDrink || typeof timeSinceLastDrink != "number")
      throw "timeSinceLastDrink (integer) not provided";
    if (!consumptionData || typeof consumptionData != "object")
      throw "consumptionData (integer) not provided";
    // ! handling wrong genders
    if (gender.toLowerCase() != "male" && gender.toLowerCase() != "female")
      throw "gender can be male or female";
    // ! total alcohol consumed
    const totalConsumption =
      consumptionData.beer * (strength.beer / 100) +
      consumptionData.wine * (strength.wine / 100) +
      consumptionData.liquor * (strength.liquor / 100) +
      consumptionData.other[0] * (strength.other / 100);
    // ! returning output in percent
    if (gender.toLowerCase() == "male") {
      return roundToTwoDecimal(
        (totalConsumption / (weight * 1000 * 0.68)) * 100 -
          timeSinceLastDrink * 0.015
      );
    } else if (gender.toLowerCase() == "female") {
      return roundToTwoDecimal(
        (totalConsumption / (weight * 1000 * 0.55)) * 100 -
          timeSinceLastDrink * 0.015
      );
    }
  } catch (error) {
    return error;
  }
};

// ! *********************************************************************************************
// ! PENDING
// ! *********************************************************************************************
// ! Period calculator
// ? use macros calculator for this
// ! Protein calculator
// ! Carbs calculator
// ! Fat calculator
module.exports = {
  BMR,
  BMI,
  BFP,
  idealBodyWeight,
  calorieNeeds,
  TDEE,
  macros,
  BAC,
};
