import create from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],

  // Add a new recipe
  addRecipe: (newRecipe) =>
    set(state => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now().toString() }]
    })),

  // Replace the entire recipes array
  setRecipes: (recipes) => set({ recipes }),

  // Update a single recipe by id
  updateRecipe: (updatedRecipe) =>
    set(state => ({
      recipes: state.recipes.map(r =>
        r.id === updatedRecipe.id ? { ...r, ...updatedRecipe } : r
      )
    })),

  // Delete a recipe by id
  deleteRecipe: (id) =>
    set(state => ({
      recipes: state.recipes.filter(r => r.id !== id)
    }))
}));

export default useRecipeStore;
