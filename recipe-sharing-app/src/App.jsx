import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Home</Link> | <Link to="/add">Add Recipe</Link>
      </nav>
      <div>      
        <SearchBar />
        <Filters />
        <RecipeList />
      </div>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipeForm />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </Router>

  );
}

export default App;
