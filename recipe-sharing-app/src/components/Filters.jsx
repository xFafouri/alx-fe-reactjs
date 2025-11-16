// src/components/Filters.jsx
import useRecipeStore from './recipeStore';

const Filters = () => {
  const setIngredientFilter = useRecipeStore(s => s.setIngredientFilter);
  const setMaxPrepTime = useRecipeStore(s => s.setMaxPrepTime);

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <input type="text" placeholder="Ingredient (eg. chicken)" onChange={e => setIngredientFilter(e.target.value)} />
      <input type="number" placeholder="Max prep time (min)" onChange={e => setMaxPrepTime(e.target.value)} />
    </div>
  );
};

export default Filters;
