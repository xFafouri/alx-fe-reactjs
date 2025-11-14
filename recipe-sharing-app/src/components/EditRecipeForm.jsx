import { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const setRecipes = useRecipeStore(state => state.setRecipes);
  const recipes = useRecipeStore(state => state.recipes);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipes = recipes.map(r =>
      r.id === recipe.id ? { ...r, title, description } : r
    );
    setRecipes(updatedRecipes);
    alert('Recipe updated!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <h3>Edit Recipe</h3>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;
