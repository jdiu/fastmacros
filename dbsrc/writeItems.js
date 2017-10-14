const { Pool, Client } = require('pg');
const pool = Pool();
var mcdjson = require('./mcds_categorized.json');

var categoryMapping = {
    Entree: 1,
    Side: 2,
    Drink: 3,
    Dessert: 4,
    Condiment: 5
};

function writeItems() {
    pool.connect((err, client, done) => {
        if (err) throw err;
        const text = 'INSERT INTO "FoodItems"(restaurant, name, category, calories, protein, carbs, fats) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
        for(var idx = 0; idx < mcdjson.length; ++idx) {
            client.query(text, [mcdjson[idx].Restaurant, mcdjson[idx].Name, mcdjson[idx].Category, mcdjson[idx].Info.Calories, mcdjson[idx].Info.Protein, mcdjson[idx].Info.Carbs, mcdjson[idx].Info.Fats], (err, res) => {
                if (err) {
                    console.log(err);
                    pool.end();
                    throw err;
                }
                else console.log(res.rows[0]);
            });
        };
        pool.end();
    });
};

writeItems();