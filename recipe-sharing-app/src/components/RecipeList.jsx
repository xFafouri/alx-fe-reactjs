import { useMemo } from 'react';
import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const ingredientFilter = useRecipeStore(state => state.ingredientFilter);
  const maxPrepTime = useRecipeStore(state => state.maxPrepTime);

  const filtered = useMemo(() => {
    const term = (searchTerm || '').trim().toLowerCase();
    const tokens = term ? term.split(/\s+/) : [];
    return recipes.filter(recipe => {
      const hay = `${recipe.title || ''} ${recipe.description || ''}`.toLowerCase();
      if (!tokens.every(t => hay.includes(t))) return false;

      if (ingredientFilter) {
        const ing = ingredientFilter.trim().toLowerCase();
        const ingredients = (recipe.ingredients || []).map(i => i.toLowerCase());
        if (!ingredients.some(i => i.includes(ing))) return false;
      }

      if (typeof maxPrepTime === 'number' && maxPrepTime > 0) {
        const rt = typeof recipe.prepTime === 'number' ? recipe.prepTime : Number(recipe.prepTime || 0);
        if (isNaN(rt) || rt > maxPrepTime) return false;
      }

      return true;
    });
  }, [recipes, searchTerm, ingredientFilter, maxPrepTime]);

  if (!filtered.length) return <p>No recipes match your filters.</p>;

  return (
    <div>
      {filtered.map(recipe => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}><h3>{recipe.title}</h3></Link>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
