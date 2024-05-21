import { useState, useEffect } from "react";
import { retrieveAllRecipeApi, deleteRecipeByIdApi, publishRecipeByIdApi } from "./api/RecipeService";
import { useNavigate } from "react-router-dom";

export default function RecipeComponent() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => refreshRecipe(), [])

    const navigate = useNavigate()

    function refreshRecipe() {
        retrieveAllRecipeApi()
            .then((response) => {
                setRecipes(response.data.data)
            })
            .catch((error) => console.log(error));
    }

    function deleteRecipeById(id) {
        deleteRecipeByIdApi(id)
            .then(response => { refreshRecipe() })
            .catch(error => console.log(error))
    }

    function publishRecipeById(id) {
        publishRecipeByIdApi(id)
            .then(response => { refreshRecipe() })
            .catch(error => console.log(error))
    }


    function addNewRecipe() {
        navigate('/addrecipe')
    }

    return (
        <div className="container">
            <h1>List of Recipe</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Type</th>
                            <th>Groceries</th>
                            <th>Steps</th>
                            <th>Status</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recipes.map(
                                recipe => (
                                    <tr key={recipe.recipeId}>
                                        <td>{recipe.recipeId}</td>
                                        <td>{recipe.recipeType}</td>
                                        <td>{recipe.groceries.map(
                                            grocery => (
                                                <p>  {grocery.groceryName} </p>
                                            )
                                        )}</td>
                                        <td>{recipe.steps}</td>
                                        <td>{recipe.published === true ? "Published" : "Draft"}</td>
                                        <td><button className="btn btn-warning"
                                            onClick={() => deleteRecipeById(recipe.recipeId)}>Delete</button></td>
                                        <td><button className="btn btn-success"
                                            onClick={() => publishRecipeById(recipe.recipeId)}>Publish</button></td>

                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>

            </div>

            <div className="btn btn-success m-5" onClick={addNewRecipe}>Add New Recipe</div>
        </div>
    )
}