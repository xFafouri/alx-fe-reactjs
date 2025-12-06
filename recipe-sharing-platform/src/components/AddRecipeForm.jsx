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
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n"),
    };

    console.log("Submitted Recipe:", recipeData);

    alert("Recipe submitted successfully!");

    // Clear the form after submission:
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full bg-white p-6 rounded-xl shadow"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add a New Recipe
        </h1>

        {/* Title */}
        <label className="block mb-3">
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

        {/* Ingredients */}
        <label className="block mb-3">
          <span className="font-semibold">Ingredients</span>
          <textarea
            rows="5"
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Write each ingredient on a new line"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>
          )}
        </label>

        {/* Steps */}
        <label className="block mb-5">
          <span className="font-semibold">Preparation Steps</span>
          <textarea
            rows="5"
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Write each step on a new line"
          ></textarea>
          {errors.steps && (
            <p className="text-red-600 text-sm mt-1">{errors.steps}</p>
          )}
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;
