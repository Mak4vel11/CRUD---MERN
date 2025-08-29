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
    const food = new FoodModel({foodName: foodName, days: days})

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

app.put('/update', async (req, res) => {
    
    const newFoodName = req.body.newFoodName
    const id = req.body.id 

    try {
        
        const updatedFood = await FoodModel.findByIdAndUpdate(
            id,
            { foodName: newFoodName },
            { new: true }
        );

        if (!updatedFood) return res.status(404).send("Food not found");
        res.send(updatedFood);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})


app.delete('/delete/:id', async(req, res) => {
  const id = req.params.id
  

  await FoodModel.findByIdAndDelete(id).exec()
  res.send('deleted')
})


app.listen(3001, () => {
    console.log('server running on port 3001')
})