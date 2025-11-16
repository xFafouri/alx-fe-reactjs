import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const favorites = useRecipeStore(s => s.favorites);
  const recipes = useRecipeStore(s => s.recipes);

  const favoriteRecipes = favorites
    .map(id => recipes.find(r => r.id === id))
    .filter(Boolean);

  return (
    <div>
      <h2>My Favorite Recipes</h2>

      {favoriteRecipes.length === 0 && <p>No favorites yet.</p>}

      {favoriteRecipes.map(recipe => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
