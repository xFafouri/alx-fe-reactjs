import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import { Routes, Route } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
  <Routes>
      {/* Home page → list of recipes */}
      <Route path="/" element={<RecipeList />} />
    
      {/* Add new recipe page */}
      <Route path="/add" element={<AddRecipeForm />} />

      {/* Recipe details page */}
      <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
    </Routes>
  )
}

export default App