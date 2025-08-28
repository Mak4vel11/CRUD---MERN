import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'




 
function App() {
  
  const [foodName, setFoodName] = useState("")
  const [days, setDays] = useState(0)

  const [foodList, setFoodList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data)
    })
  }, [])

  const addToList = () => {
  axios.post("http://localhost:3001/insert", {
    foodName: foodName, 
    days: days
  })
  .then(() => {
    alert("data eshte insertuar me sukses")
  })
  .catch((err) => {
    console.error(err)
  })
}

  return (
    <div className="App">
     <h1>
      CRUD APP WITH MERN
     </h1>

     <label >Food Name:</label>
     <input onChange={(e) => {setFoodName(e.target.value)}} type='text'/>
     
      <label>Day since you Ate : </label>
      <input  onChange={(e) => {setDays(Number(e.target.value))}} type='number'/>
    
     <button onClick={addToList} >Add to List</button>
     <h1>Food List </h1>

      <h1>Food List : </h1>
      {foodList.map((val, key)=> {
       return (
        <div key={key}> 
          <h1>{val.foodName}</h1>
          <h1>{val.daySinceIEat}</h1>{" "}
        </div>
       )
      })}

    </div>
  );
}

export default App;
