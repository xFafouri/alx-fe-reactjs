import { useEffect } from 'react';
import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(s => s.recommendations);
  const generateRecommendations = useRecipeStore(s => s.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended For You</h2>

      {recommendations.length === 0 && (
        <p>No recommendations yet — try adding favorites!</p>
      )}

      {recommendations.map(recipe => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
