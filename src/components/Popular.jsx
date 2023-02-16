import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Popular() {
  const [popularRecipes, setPopularRecipes] = useState([])

  useEffect(() => {
    axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => setPopularRecipes(res.data.recipes))
  }, [])

  return (
    <div>
      {popularRecipes.map(recipe => {
        return (
          <div key={recipe.id}>
            <p>{recipe.title}</p>
          </div>
        )
      })}      
    </div>
  )
}

export default Popular