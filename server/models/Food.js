//schema

const mongoose = require('mongoose')

//pershrkimi i dokumenteve ne koleksjon
const FoodSchema = new mongoose.Schema({
        //fushat e skemes
    foodName:{
        type: String,
        required: true
    },
    daySinceIEat:{
        type: Number,
        required: true,
    },
});

//krijimi i modelit
const Food = mongoose.model("FoodData", FoodSchema)
//eksportimi i modelit 
module.exports = Food 