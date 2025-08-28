const express = require('express')
const mongoose = require('mongoose')
const app = express();


const FoodModel = require("./models/Food")

//middileware
//recive info in json format 
app.use(express.json())

mongoose.connect("mongodb+srv://corleoned811_db_user:valmir122@crud.enug3ns.mongodb.net/food?retryWrites=true&w=majority&appName=CRUD", {
    //menyre per te lexuar stringun e lidhjes 
    useNewUrlParser: true,
})

//gjithmon funksjoni kur eshte async duhet te kete await
app.get('/', async (req, res) => {
   const food = new FoodModel({foodName: "Apple", daySinceIEat: 3})

   try {
    await food.save();
    res.send('Inserted Data')
   } catch(err){
    console.log(err)
   }
})

app.listen(3001, () => {
    console.log('server running on port 3001')
})