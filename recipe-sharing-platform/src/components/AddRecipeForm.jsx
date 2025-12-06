import { useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      const list = ingredients.split("\n").filter((i) => i.trim() !== "");
      if (list.length < 2) {
        newErrors.ingredients = "Please include at least 2 ingredients";
      }
    }

    if (!steps.trim()) newErrors.steps = "Preparation steps are required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const recipeData = {
      title,
      ingredients: ingredients.split("\n").map((s) => s.trim()).filter(Boolean),
      steps: steps.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    console.log("Submitted Recipe:", recipeData);

    // show a quick confirmation (replace with toast in the future)
    alert("Recipe submitted successfully!");

    // Clear the form after submission:
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full bg-white p-6 rounded-xl shadow
                   grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 col-span-1 md:col-span-2 text-center">
          Add a New Recipe
        </h1>

        {/* Title (spans full width on md) */}
        <label className="block col-span-1 md:col-span-2">
          <span className="font-semibold">Recipe Title</span>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Chocolate Cake"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
          )}
        </label>

        {/* Ingredients (left column on md) */}
        <label className="block col-span-1">
          <span className="font-semibold">Ingredients</span>
          <textarea
            rows="6"
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-36 md:h-48 resize-vertical"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Write each ingredient on a new line"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Tip: put each ingredient on its own line. (At least 2 ingredients required)
          </p>
        </label>

        {/* Steps (right column on md) */}
        <label className="block col-span-1">
          <span className="font-semibold">Preparation Steps</span>
          <textarea
            rows="6"
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-36 md:h-48 resize-vertical"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Write each step on a new line"
          ></textarea>
          {errors.steps && (
            <p className="text-red-600 text-sm mt-1">{errors.steps}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Tip: number each step on a new line for clarity.
          </p>
        </label>

        {/* Submit button (spans full width on md) */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipeForm;
