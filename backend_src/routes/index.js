var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg');
const pool = Pool();

var macroSplits = {
  bodybuilding: {
    title: "Bodybuilding Option",
    protein: "30",
    carbs: "40",
    fats: "30"
  },
  maintenance: {
    title: "Maintenance Option",
    protein: "40",
    carbs: "40",
    fats: "20"
  },
  lowCarb: {
    title: "Low Carb Option",
    protein:"40",
    carbs: "20",
    fats: "40"
  }
}

/* for reference */
router.get('/', function(req, res, next) {
  res.json(generateEntreeCombos(macroSplits.bodybuilding, 2000));
});

function generateEntreeCombos(macros, cals){
  pool.connect((err, client, done) => {
    if (err) throw err;
    const text = 'select * from "FoodItems"';

    var meal = {
      calorieTotal: 0,
      proteinTotal: 0,
      carbTotal: 0,
      fatTotal: 0,
      items: []
    };

    client.query(text, (err, res) => {
        if (err) {
          console.log(err);
          pool.end();
          throw err;
        }
        else console.log(res.rows.length);

        var proteinLim = (macros.protein / 100) * cals / 4;
        var carbLim = (macros.carbs / 100) * cals / 4;
        var fatLim = (macros.fats / 100) * cals / 9;
        var delta = 0.05;

        var isValid = false;
        var rejectCount = 0;

        while(!isValid){
          var itemIdx = getRandom(0, res.rows.length);
          
          var item = res.rows[itemIdx];
          item.calories = parseInt(item.calories);
          item.protein = parseInt(item.protein);
          item.carbs = parseInt(item.carbs);
          item.fats = parseInt(item.fats);

          var isRejected = false;

          // prioritize protein, then carbs, then fats
          if(checkMacroLimit(delta, meal.proteinTotal + item.protein, proteinLim)) {
            console.log("p over: " + (meal.proteinTotal + item.protein) + " > " + proteinLim);
            if(rejectCount >= 5) {
              meal.items.sort((a, b) => {
                return b.protein - a.protein;
              });

              isRejected = true;
            } else {
              rejectCount++;
              continue;
            }
          } else if(checkMacroLimit(delta, meal.carbTotal + item.carbs, carbLim)) {
            console.log("c over: " + (meal.carbTotal + item.carbs) + " > " + carbLim);
            if(rejectCount >= 5) {
              meal.items.sort((a, b) => {
                return b.carbs - a.carbs;
              });

              isRejected = true;
            } else {
              rejectCount++;
              continue;
            }
          } else if(checkMacroLimit(delta, meal.fatTotal + item.fats, fatLim)) {
            console.log("f over: " + (meal.fatTotal + item.fats) + " > " + fatLim);
            if(rejectCount >= 5) {
              meal.items.sort((a, b) => {
                return b.fats - a.fats;
              });

              isRejected = true;
            } else {
              rejectCount++;
              continue;
            }
          }

          if(isRejected) {
            var delItem = meal.items.pop();
            meal.calorieTotal -= delItem.calories;
            meal.proteinTotal -= delItem.protein;
            meal.carbTotal -= delItem.carbs;
            meal.fatTotal -= delItem.fats;
            rejectCount = 0;
            continue;
          }

          meal.calorieTotal += item.calories;
          meal.proteinTotal += item.protein;
          meal.carbTotal += item.carbs;
          meal.fatTotal += item.fats;
          meal.items.push(item);
          console.log("item cals: " + item.calories);
          console.log("totalcals: " + meal.calorieTotal);
          if(meal.calorieTotal > cals - cals * 0.10) isValid = true;

        }
        
        console.log(meal);
        return meal;
    });
  });
}

function checkMacroLimit(delta, checkMacro, boundMacro){
  return checkMacro > (boundMacro + boundMacro * delta);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = router;
