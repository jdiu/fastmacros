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
        const text = 'INSERT INTO "FoodItems"(restaurant, name, category, info) VALUES($1, $2, $3, $4) RETURNING *'
        for(var idx = 0; idx < mcdjson.length; ++idx) {
            console.log(mcdjson[idx].Restaurant);
            client.query(text, [mcdjson[idx].Restaurant, mcdjson[idx].Name, mcdjson[idx].Category, mcdjson[idx].Info], (err, res) => {
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