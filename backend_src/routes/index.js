var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var macroSplits = {
  balanced: {
    title: "Balanced Option",
    protein: "40",
    carbs: "30",
    fats: "30"
  },
  lean: {
    title: "Lean Option",
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
  res.json(generateEntreeCombos(macroSplits.balanced, 2000));
});

function generateEntreeCombos(macros, cals){

}



module.exports = router;
