import useRecipeStore from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore(state => state.favorites);
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);

  const isFav = favorites.includes(recipeId);

  return (
    <button onClick={() => toggleFavorite(recipeId)}>
      {isFav ? "💔 Remove Favorite" : "❤️ Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
