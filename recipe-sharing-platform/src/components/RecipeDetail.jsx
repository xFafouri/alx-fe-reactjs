import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.id === Number(id));
        setRecipe(found);
      })
      .catch((err) => console.error("Error loading recipe:", err));
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading recipe...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        
        {/* Back Button */}
        <Link
          to="/"
          className="text-blue-600 underline mb-4 inline-block hover:text-blue-800 transition"
        >
          ← Back to Home
        </Link>

        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-60 object-cover rounded-xl mb-6"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

        {/* Summary */}
        <p className="text-gray-700 mb-6">{recipe.summary}</p>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
