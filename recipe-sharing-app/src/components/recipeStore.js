// src/components/recipeStore.js
import create from 'zustand';

const useRecipeStore = create(set => ({
  // core data
  recipes: [],

  // filters
  searchTerm: '',
  ingredientFilter: '',      // text (matches ingredient names)
  maxPrepTime: null,         // number in minutes, or null for no limit
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIngredientFilter: (ingredient) => set({ ingredientFilter: ingredient }),
  setMaxPrepTime: (minutes) => set({ maxPrepTime: minutes === '' ? null : Number(minutes) }),

  // CRUD helpers (keep these)
  addRecipe: (newRecipe) =>
    set(state => ({ recipes: [...state.recipes, { ...newRecipe, id: Date.now().toString() }] })),
  updateRecipe: (updatedRecipe) =>
    set(state => ({ recipes: state.recipes.map(r => r.id === updatedRecipe.id ? { ...r, ...updatedRecipe } : r) })),
  deleteRecipe: (id) =>
    set(state => ({ recipes: state.recipes.filter(r => r.id !== id) })),

  // derived selector: you can call useRecipeStore(state => state.getFilteredRecipes()) in components
  getFilteredRecipes: () => ( // note: not stored, just computed on demand
    (get) => {
      const { recipes, searchTerm, ingredientFilter, maxPrepTime } = get();
      const term = (searchTerm || '').trim().toLowerCase();

      // tokens from search input for multi-term search
      const tokens = term ? term.split(/\s+/) : [];

      return recipes.filter(recipe => {
        // 1) search by title & description (all tokens must match either title or description)
        const hay = `${recipe.title || ''} ${recipe.description || ''}`.toLowerCase();
        const tokensOk = tokens.every(t => hay.includes(t));

        if (!tokensOk) return false;

        // 2) ingredient filter: check recipe.ingredients if exists (array of strings)
        if (ingredientFilter) {
          const ing = ingredientFilter.trim().toLowerCase();
          const ingredients = (recipe.ingredients || []).map(i => i.toLowerCase());
          if (!ingredients.some(i => i.includes(ing))) return false;
        }

        // 3) maxPrepTime filter (assumes recipe.prepTime is a number in minutes)
        if (typeof maxPrepTime === 'number' && maxPrepTime > 0) {
          const rt = typeof recipe.prepTime === 'number' ? recipe.prepTime : Number(recipe.prepTime || 0);
          if (isNaN(rt) || rt > maxPrepTime) return false;
        }

        return true;
      });
    }
  ),
  // FAVORITES + RECOMMENDATIONS
favorites: [],

addFavorite: (recipeId) =>
  set(state => ({
    favorites: state.favorites.includes(recipeId)
      ? state.favorites   // avoid duplicates
      : [...state.favorites, recipeId]
  })),

removeFavorite: (recipeId) =>
  set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

// easy UX helper
toggleFavorite: (recipeId) =>
  set(state => ({
    favorites: state.favorites.includes(recipeId)
      ? state.favorites.filter(id => id !== recipeId)
      : [...state.favorites, recipeId]
  })),

// SIMPLE RECOMMENDER
recommendations: [],

generateRecommendations: () =>
  set(state => {
    if (!state.favorites.length) return { recommendations: [] }; // no favorites = no recs

    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) ||
      // recommend similar recipes (if they share ingredients)
      state.favorites.some(favId => {
        const favRecipe = state.recipes.find(r => r.id === favId);
        if (!favRecipe) return false;
        if (!favRecipe.ingredients || !recipe.ingredients) return false;

        // overlap of ingredients = recommended
        return recipe.ingredients.some(i =>
          favRecipe.ingredients.includes(i)
        );
      })
    );

    return { recommendations: recommended };
  }),
}));

export default useRecipeStore;
