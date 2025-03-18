import { useState } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("oz");
  const [customUnit, setCustomUnit] = useState("");
  const [ingredientCost, setIngredientCost] = useState(""); // New state for cost
  const [editId, setEditId] = useState(null); // Track which ingredient is being edited

  const addIngredient = (e) => {
    e.preventDefault();
    if (!ingredientName.trim() || !ingredientQuantity.trim() || !ingredientCost.trim()) return;

    const finalUnit = ingredientUnit === "other" ? customUnit : ingredientUnit;

    if (editId !== null) {
      // If we are editing an existing ingredient
      const updatedIngredients = ingredients.map((ingredient) =>
        ingredient.id === editId
          ? { ...ingredient, name: ingredientName, quantity: ingredientQuantity, unit: finalUnit, cost: ingredientCost }
          : ingredient
      );
      setIngredients(updatedIngredients);
      setEditId(null); // Reset edit mode
    } else {
      // If adding a new ingredient
      const newIngredient = {
        id: ingredients.length + 1,
        name: ingredientName,
        quantity: ingredientQuantity,
        unit: finalUnit,
        cost: ingredientCost, // Store cost
      };
      setIngredients([...ingredients, newIngredient]);
    }

    // Clear form
    setIngredientName("");
    setIngredientQuantity("");
    setCustomUnit("");
    setIngredientCost(""); // Clear cost field
  };

  const editIngredient = (ingredient) => {
    setIngredientName(ingredient.name);
    setIngredientQuantity(ingredient.quantity);
    setIngredientUnit(ingredient.unit);
    setCustomUnit(ingredient.unit === "other" ? ingredient.unit : "");
    setIngredientCost(ingredient.cost); // Pre-fill cost
    setEditId(ingredient.id); // Set the ingredient ID to track editing
  };

  const deleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  return (
    <div>
      <h1>Recipe Details (ID: {id})</h1>

      {/* Ingredient Form */}
      <form onSubmit={addIngredient}>
        <input
          type="text"
          placeholder="Enter ingredient name"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter quantity"
          value={ingredientQuantity}
          onChange={(e) => setIngredientQuantity(e.target.value)}
        />
        <select
          value={ingredientUnit}
          onChange={(e) => {
            setIngredientUnit(e.target.value);
            if (e.target.value !== "other") setCustomUnit("");
          }}
        >
          <option value="grams">Grams</option>
          <option value="oz">Ounces</option>
          <option value="lbs">Pounds</option>
          <option value="ml">Milliliters</option>
          <option value="other">Other</option>
        </select>

        {/* Custom unit input */}
        {ingredientUnit === "other" && (
          <input
            type="text"
            placeholder="Enter custom unit"
            value={customUnit}
            onChange={(e) => setCustomUnit(e.target.value)}
          />
        )}

        {/* Cost input */}
        <input
          type="number"
          placeholder="Enter cost"
          value={ingredientCost}
          onChange={(e) => setIngredientCost(e.target.value)}
        />

        <button type="submit">{editId !== null ? "Update Ingredient" : "Add Ingredient"}</button>
      </form>

      {/* Ingredient List */}
      <h2>Ingredients for Recipe</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} - {ingredient.quantity} {ingredient.unit} - ${ingredient.cost}{" "}
            <button onClick={() => editIngredient(ingredient)}>Edit</button>
            <button onClick={() => deleteIngredient(ingredient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recipe;
