[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/manas3874/fitness-calculator/blob/master/LICENSE)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source/Yes%21/blue?icon=github)](https://github.com/manas3874/fitness-calculator)
[![Maintenance](https://img.shields.io/badge/Maintained-Yes!-green.svg)](https://github.com/manas3874/fitness-calculator/commits/master)

# Fitness calculators for all your needs
### This is a package which will help you perform calculations for your BMI, BMR, calorie needs, total daily energy expenditure, macros and much more





## **Usage**

1. Install the package using `npm i fitness-calculator`
2. Require the package in your Node application using `const fitnessCalculatorFunctions = require("fitness-calculator")`.
3. Use the methods by calling them from `fitnessCalculatorFunctions`.

## **Example**

```javascript
const fitnessCalculatorFunctions = require("fitness-calculator");
const myCalorieNeeds = fitnessCalculatorFunctions.calorieNeeds("male",22,176,73,"active");

console.log(`I will eat less than${myCalorieNeeds} to cut down my fat.`)
```
## **Functions included** *(will be updated and maintained)*
1. BMR (basal metabolic rate)
1. BMI (body mass index)
1. BFP (body fat percentage)
1. idealBodyWeight
1. calorieNeeds
1. TDEE (Total daily energy expenditure)
1. macros
1. BAC (blood alcohol content)

## **API Reference**

*All measurements are in **metric unit** (cm, kg) as of now*

1. **BMR**(gender, age, height, weight)
   1. Parameters (gender ==> `String`, age ==> `Number`, height ==> `Number`, weight ==> `Number`).
   1. All parameters **required**.
   1. Returns BMR ==> `Number`.
   1. Gender is not case sensitive.

1.  **BMI**(height, weight)

    1. Parameters (height ==> `Number`, weight ==> `Number`).
    1. All parameters **required**.
    1. Returns BMI ==> `Number`.
    1. Gender is not case sensitive.

1.  **BFP**(gender, height, weight, neck, waist, hip ==> *only required for females*)

    1. Parameters (gender ==> `String`, height ==> `Number`, weight ==> `Number`, neck ==> `Number`, waist ==> `Number`, hip ==> `Number`).
    1. All parameters **required** (exception for hip measurement).
    1. Returns BFP ==> `Number`. (percentage value)
    1. Gender is not case sensitive.

1.  **idealBodyWeight**(gender, height)

    1. Parameters (gender ==> `String`, height ==> `Number`).
    1. All parameters **required**
    1. Returns idealBodyWeight ==> `Number`.
    1. Gender is not case sensitive.

1.  **calorieNeeds**(gender, age, height, weight, activity)

    1. Parameters (gender ==> `String`, age ==> `Number`, height ==> `Number`, weight ==> `Number`, activity ==> `String`).
    1. activity is one of the following [`sedentary`, `light`, `moderate`, `active`, `extreme`].
    1. All parameters **required**.
    1. Returns calorieNeeds for several cases of **goals** from [`balance`, `mildWeightLoss`, `mildWeightGain`, `heavyWeightLoss`, `heavyWeightGain`] ==> `Object`.
    ```javascript 
        {
        balance: Number,
        mildWeightLoss: Number,
        mildWeightGain: Number,
        heavyWeightLoss: Number,
        heavyWeightGain: Number
        }
    ```
    1. Gender, activity are not case sensitive.

1.  **TDEE**(gender, age, height, weight, activity)

    1. Parameters (gender ==> `String`, age ==> `Number`, height ==> `Number`, weight ==> `Number`, activity ==> `String`).
    1. activity is one of the following [`sedentary`, `light`, `moderate`, `active`, `extreme`].
    1. All parameters **required**.
    1. Returns TDEE for balanced goal ==> `Number`.
    1. Gender, activity are not case sensitive.

1.  **macros**(gender, age, height, weight, activity, goal)

    1. Parameters (gender ==> `String`, age ==> `Number`, height ==> `Number`, weight ==> `Number`, activity ==> `String`, goal ==> `String`).
    1. **Activity** is one of the following [`sedentary`, `light`, `moderate`, `active`, `extreme`].
    1. **Goal** is one of the following [`balance`, `mildWeightLoss`, `mildWeightGain`, `heavyWeightLoss`, `heavyWeightGain`]
    1. All parameters **required**.
    1. Returns **macros** for several cases of diet-plans from [`balancedDietPlan`, `lowCarbDietPlan`, `highCarbDietPlan`, `highProteinDietPlan`, `lowFatDietPlan`, `lowSugarDietPlan`] ==> `Object`.
    ```javascript 
        {
        balancedDietPlan : {
        carb: `Number`,
        protein: `Number`,
        fat: `Number`,
        sugar: `Number`,
        },

        lowCarbDietPlan : {
        carb: `Number`,
        protein: `Number`,
        fat: `Number`,
        sugar: `Number`,
        },

        highCarbDietPlan : {
        carb: `Number`,
        protein: `Number`,
        fat: `Number`,
        sugar: `Number`,
        },

        highProteinDietPlan : {
        carb: `Number`,
        protein: `Number`,
        fat: `Number`,
        sugar: `Number`,
        },

        lowFatDietPlan : {
        carb: `Number`,
        protein: `Number`,
        fat: `Number`,
        sugar: `Number`,
        },

        lowSugarDietPlan : {
        carb: `Number`,
        protein: `Number`,
        fat: `Number`,
        sugar: `Number`,
        }
        }
    ```
    1. Gender, activity, goal are not case sensitive.

1.  **BAC**(gender, weight, timeSinceLastDrink ==> **In hours**, consumptionData)

    1. Parameters (gender ==> `String`, weight ==> `Number`, timeSinceLastDrink ==> `Number`, consumptionData ==> `Object`).
    1. **consumptionData** is required in the following format ==> `Object`
    ```javascript
        {
        beer: `Amount in ml` ==> Number,
        wine: `Amount in ml` ==> Number,
        liquor: `Amount in ml` ==> Number,
        other: [`Amount in ml` ==> Number,`strength of alcohol` ==> Number],
        }
    ```
    **example**
    ```javascript
        {
        beer: 650,
        wine: 200,
        liquor: 60,
        other: [30, 14],
        }
    ```
    1. All parameters **required**.
    1. Returns BAC (%) ==> `Number`.
    1. Gender is not case sensitive.


## Please raise github issues for improvements/ suggestions/ fixes/ feature requests/ collaboration.

## [Source code on github](https://github.com/manas3874/fitness-calculator) 
[MIT License](https://opensource.org/licenses/MIT)