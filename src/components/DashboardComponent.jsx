import { useState, useEffect } from "react";
import { retrievePublishedRecipeApi, buyRecipeApi } from "./api/RecipeService";
// import { useNavigate } from "react-router-dom";

export default function DashboardComponent() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => refreshPublisedRecipe(), [])

    // const navigate = useNavigate()

    function refreshPublisedRecipe() {
        retrievePublishedRecipeApi()
            .then((response) => {
                setRecipes(response.data.data)
            })
            .catch((error) => console.log(error));
    }

    function buyRecipe(id) {
        buyRecipeApi(id)
            .then(response => { refreshPublisedRecipe() })
            .catch(error => console.log(error))
    }
    
    return (
        <div className="container">
            <h1>Get Interesting Recipe here!</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Groceries</th>
                            <th>Steps</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recipes.map(
                                recipe => (
                                    <tr key={recipe.recipeId}>
                                        <td>{recipe.recipeType}</td>
                                        <td>{recipe.groceries.map(
                                            grocery => (
                                                <p>  {grocery.groceryName} </p>
                                            )
                                        )}</td>
                                        <td>{recipe.steps}</td>
                                        <td><button className="btn btn-warning"
                                             onClick={() => buyRecipe(recipe.recipeId)}>Buy</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}