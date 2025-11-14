import useRecipeStore from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe); 
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId); // ✅ call deleteRecipe
      alert('Recipe deleted!');
      navigate('/'); // redirect to home page
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{ marginTop: '1rem', color: 'red' }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
