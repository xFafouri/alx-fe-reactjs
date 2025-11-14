import useRecipeStore from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const setRecipes = useRecipeStore(state => state.setRecipes);
  const recipes = useRecipeStore(state => state.recipes);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const updatedRecipes = recipes.filter(r => r.id !== recipeId);
      setRecipes(updatedRecipes);
      alert('Recipe deleted!');
      navigate('/'); // go back to home page
    }
  };

  return (
    <button onClick={handleDelete} style={{ marginTop: '1rem', color: 'red' }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
