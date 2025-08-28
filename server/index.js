const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')


const FoodModel = require("./models/Food");
const Food = require('./models/Food');

//middileware
//recive info in json format 
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://corleoned811_db_user:valmir122@crud.enug3ns.mongodb.net/food?retryWrites=true&w=majority&appName=CRUD", {
    //menyre per te lexuar stringun e lidhjes 
    useNewUrlParser: true,
})

//gjithmon funksjoni kur eshte async duhet te kete await
app.post('/insert', async (req, res) => {
    
    const foodName = req.body.foodName
    const days = req.body.days 
    const food = new FoodModel({foodName: foodName, daySinceIEat: days})

   try {
    await food.save();
    res.send('Inserted Data')
   } catch(err){
    console.log(err)
   }
})

app.get('/read', async (req, res) => {
  try {
    const result = await FoodModel.find({});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(3001, () => {
    console.log('server running on port 3001')
})