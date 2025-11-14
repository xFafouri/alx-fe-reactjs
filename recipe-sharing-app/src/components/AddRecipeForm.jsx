import { useState } from 'react';
import useRecipeStore from './recipeStore';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipe({ title, description }); // id is added automatically in store
    setTitle('');
    setDescription('');
    navigate('/'); // go back to home page
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Recipe</h2>
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
      <button type="submit">Add</button>
    </form>
  );
};

export default AddRecipeForm;
