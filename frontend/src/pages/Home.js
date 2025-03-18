import { use, useState } from 'react';
import { Link } from 'react-router-dom'; //allows navigation between components without refreshing

function Home() {
    const [recipes, setRecipes ] = useState([]); //recipes stores recipes , setRecipes updates the recipes state
    const [ recipeName, setRecipeName ] = useState(''); // recipeName stores name of recipe, setRecipeName updates the recipeName state

    const addRecipe = (e) => {
        e.preventDefault(); //prevents refresh of page on form submission
        if (!recipeName.trim()) return; //prevent empty recipe name
    
        // Create new recipe object
        const newRecipe = {
          id: recipes.length + 1, // temporary ID - will be repalced with DB
          name: recipeName,
        };
    
        setRecipes([...recipes, newRecipe]); // Update state with new recipe
        setRecipeName(""); 
      };

      return (
        <div className='home-page-container'>
            <h1>Recipes</h1>

            {/* Form to add new recipe */}
            <form onSubmit={addRecipe}>
                <input
                    type='text'
                    placeholder='Enter recipe name'
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
                <button type='submit'>Add Recipe</button>
            </form>

            {/* Display recipes */}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
      );

}


export default Home; 